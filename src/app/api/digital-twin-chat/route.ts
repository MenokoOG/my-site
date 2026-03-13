import { NextResponse } from "next/server";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL_NAME = "mistralai/mistral-small-3.1-24b-instruct:free";
const FALLBACK_MODEL_NAME = "openai/gpt-oss-120b:free";
const CHAT_MODELS = [MODEL_NAME, FALLBACK_MODEL_NAME];
const MAX_HISTORY_MESSAGES = 12;
const OPENROUTER_TIMEOUT_MS = 30_000;

const CAREER_KNOWLEDGE = `
Identity:
- Name: Lawrence Jefferson II
- Location: Clarkston, Washington, United States
- Current headline: CTO @ Welcoin · Sr. SWE · Founder · U.S. Army Veteran

About:
- Senior full stack engineer and cybersecurity enthusiast.
- Currently upskilling in AI engineering and focused on solving real-world problems.
- CTO at Welcoin and co-founder at OkO Forge LLC DBA Crimson Obsidian Industries and Labs.
- Veteran-owned and operated focus on AI Spec Driven Development (SDD), JavaScript/TypeScript, Python, and full stack development.

Top Skills:
- Technology Leadership
- AI Solutions
- Blockchain

Experience:
- Chief Technology Officer, Welcoin (Feb 2026 - Present), Clarkston, WA.
- Co-founder / CTO / Full Stack Engineer, OkO Forge LLC DBA Crimson Obsidian Industries and Labs (Apr 2023 - Present), United States.
- Chief Technology Officer / Co-founder, Gunkustom (Oct 2024 - Jan 2026), Clarkston, WA.
- Back-end Developer, Gunkustom (Oct 2024 - Mar 2025), Clarkston, WA.
- Web Developer (Volunteer), Military Order of the Purple Heart of the U.S.A., Inc. (Oct 2024 - Dec 2025), Clarkston, WA.
- Back-end Developer, PowAlert (Jan 2025 - Mar 2025), Remote.
- Teaching Assistant, V School (Apr 2024 - Sep 2024), Remote.
- Program Manager, Idaho Department of Correction (Aug 2013 - Aug 2021), Idaho.
- Platoon Sergeant (E-7), U.S. Army (1989 - 2013), various locations, 24 years service.

Education:
- V School: Certification, JavaScript Full Stack (MERN) Web Development (2024).
- Syracuse University: Python PCAP (2022 - 2023).
- Google: Cybersecurity Certificate Program (2023).
- American Military University: AS, Web Page/Digital-Multimedia and Information Resources Design (2009 - 2012).

Certifications:
- V School Web Development Completion
- Google Cybersecurity Specialization
- Programming Essentials in Python (PCAP)
- Complete Python Developer in 2023: Zero to Mastery
- Crash Course on Python

Links:
- LinkedIn: https://www.linkedin.com/in/lawrence-jefferson-ii-46497075
- GitHub: https://github.com/MenokoOG
- Personal site: https://ljefferson-menoko-site.netlify.app/
`;

function normalizeHistory(messages: unknown): ChatMessage[] {
    if (!Array.isArray(messages)) {
        return [];
    }

    return messages
        .filter((message): message is ChatMessage => {
            if (!message || typeof message !== "object") {
                return false;
            }

            const role = (message as ChatMessage).role;
            const content = (message as ChatMessage).content;

            return (
                (role === "user" || role === "assistant") &&
                typeof content === "string" &&
                content.trim().length > 0
            );
        })
        .slice(-MAX_HISTORY_MESSAGES);
}

export async function POST(req: Request) {
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();

    if (!apiKey) {
        return NextResponse.json(
            { error: "OPENROUTER_API_KEY is not set on the server." },
            { status: 500 }
        );
    }

    let body: { message?: string; messages?: unknown };

    try {
        body = (await req.json()) as { message?: string; messages?: unknown };
    } catch {
        return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const message = body.message?.trim();
    if (!message) {
        return NextResponse.json({ error: "A message is required." }, { status: 400 });
    }

    const history = normalizeHistory(body.messages);
    const requestOrigin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const systemPrompt =
        "You are Lawrence Jefferson II's digital twin for his personal website. " +
        "Answer questions about his career, experience, education, certifications, skills, and professional background. " +
        "Be concise, professional, and accurate. If a question cannot be answered from the provided profile, say so clearly and suggest checking LinkedIn for more detail. " +
        "Never claim unknown facts as true.";

    try {
        const makeRequest = async (model: string) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), OPENROUTER_TIMEOUT_MS);

            try {
                return await fetch(OPENROUTER_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiKey}`,
                        "HTTP-Referer": requestOrigin,
                        "X-Title": "Lawrence Jefferson II Digital Twin",
                    },
                    body: JSON.stringify({
                        model,
                        temperature: 0.3,
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "system", content: `Profile:\n${CAREER_KNOWLEDGE}` },
                            ...history,
                            { role: "user", content: message },
                        ],
                    }),
                    signal: controller.signal,
                });
            } finally {
                clearTimeout(timeoutId);
            }
        };
        let lastErrorDetails = "Provider returned an unknown error.";
        let sawRateLimit = false;

        for (const model of CHAT_MODELS) {
            // Retry once per model for transient provider failures.
            let response = await makeRequest(model);
            if (response.status >= 500 || response.status === 429) {
                response = await makeRequest(model);
            }

            if (!response.ok) {
                const text = await response.text();
                let details = text;

                try {
                    const parsed = JSON.parse(text) as {
                        error?: { message?: string };
                        message?: string;
                    };
                    details = parsed.error?.message ?? parsed.message ?? text;
                } catch {
                    // Fall back to raw text when upstream body is not JSON.
                }

                const normalizedDetails = details.toLowerCase();
                lastErrorDetails = details;

                if (response.status === 429 || normalizedDetails.includes("rate limit exceeded")) {
                    sawRateLimit = true;
                    continue;
                }

                if (response.status >= 500 || normalizedDetails.includes("provider returned error")) {
                    continue;
                }

                return NextResponse.json(
                    {
                        error: "OpenRouter request failed.",
                        details: details.slice(0, 500),
                    },
                    { status: 502 }
                );
            }

            const data = (await response.json()) as {
                choices?: Array<{ message?: { content?: string } }>;
            };

            const reply = data.choices?.[0]?.message?.content?.trim();

            if (reply) {
                return NextResponse.json({ reply, model });
            }
        }

        if (sawRateLimit) {
            return NextResponse.json({
                reply:
                    "I am currently rate-limited on free models for a short time. Please try again in about a minute.",
                rateLimited: true,
            });
        }

        return NextResponse.json({
            reply:
                "I am having trouble reaching the model provider right now. Please retry in a few seconds.",
            temporaryIssue: true,
            details: lastErrorDetails.slice(0, 500),
        });
    } catch (error) {
        const isTimeout =
            typeof error === "object" &&
            error !== null &&
            "name" in error &&
            (error as { name?: string }).name === "AbortError";

        return NextResponse.json(
            {
                error: isTimeout
                    ? "OpenRouter request timed out."
                    : "Unable to reach OpenRouter.",
            },
            { status: 502 }
        );
    }
}
