const EXPERIENCE = [
  {
    role: "Co-founder · CTO · Full Stack Engineer",
    company: "OkO Forge LLC DBA Crimson Obsidian Industries and Labs",
    period: "Apr 2023 – Present",
    location: "United States",
    summary:
      "Veteran-owned AI Spec Driven Development (SDD) and research company. Specializing in AI Engineering, JS/TS, Python, and full stack development.",
  },
  {
    role: "Chief Technology Officer · Co-founder",
    company: "Gunkustom",
    period: "Oct 2024 – Jan 2026",
    location: "Clarkston, WA",
    summary:
      "Strategic technology leadership; developed and executed technology strategy. Built ~90% of back-end ecosystem after tear-down of old stack; microservice design for ETL. ForwardAssist and ArsenalEngine technology (M3n0ko0g) for GunKustom stack—MVP ~50 technology components.",
  },
  {
    role: "Back-end Developer",
    company: "Gunkustom",
    period: "Oct 2024 – Mar 2025",
    location: "Clarkston, WA",
    summary: "Back-end development for platform ecosystem.",
  },
  {
    role: "Web Developer",
    company: "Military Order of the Purple Heart of the U.S.A., Inc.",
    period: "Oct 2024 – Dec 2025",
    location: "Clarkston, WA",
    summary: "Volunteer project work for MOPH: refactoring website and increasing visitor engagement.",
  },
  {
    role: "Back-end Developer",
    company: "PowAlert",
    period: "Jan 2025 – Mar 2025",
    location: "Remote",
    summary: "Design and implementation of the PowAlert server.",
  },
  {
    role: "Teaching Assistant",
    company: "V School",
    period: "Apr 2024 – Sep 2024",
    location: "Remote",
    summary:
      "Assisted students in the MERN stack web development program; guided assignments and coding challenges; collaborated with TAs and instructors; fostered problem-solving and streamlined communication.",
  },
  {
    role: "Program Manager",
    company: "Idaho Department of Correction",
    period: "Aug 2013 – Aug 2021",
    location: "Idaho",
    summary:
      "Supervised and managed treatment services for adult male felons with drug and other addictions.",
  },
  {
    role: "Platoon Sergeant (E-7)",
    company: "U.S. Army",
    period: "1989 – 2013",
    location: "Various",
    summary:
      "Combat Engineer, Human Intelligence Collector, Food Service, Driver—wheeled and tracked. 24 years of service.",
  },
];

const EDUCATION = [
  { name: "V School", detail: "Certification, JavaScript Full Stack (MERN) Web Development", year: "2024" },
  { name: "Syracuse University", detail: "Python PCAP", year: "2022–2023" },
  { name: "Google", detail: "Cybersecurity Certificate Program", year: "2023" },
  { name: "American Military University", detail: "AS, Web Page, Digital/Multimedia and Information Resources Design", year: "2009–2012" },
];

const CERTS = [
  "V School Web Development Completion",
  "Google Cybersecurity Specialization",
  "Programming Essentials in Python (PCAP)",
  "Complete Python Developer in 2023: Zero to Mastery",
  "Crash Course on Python",
];

export function Career() {
  return (
    <section id="career" className="relative border-t border-white/5 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Career <span className="text-cyan-400">journey</span>
        </h2>
        <p className="mt-3 text-slate-400">
          From military service to leading technology and product—engineer, founder, and builder.
        </p>

        <div className="mt-14 space-y-12">
          <div>
            <h3 className="font-mono text-sm uppercase tracking-widest text-cyan-400/80 mb-6">
              Experience
            </h3>
            <ul className="space-y-0">
              {EXPERIENCE.map((job, i) => (
                <li key={`${job.company}-${job.period}`} className="group relative">
                  <div className="flex flex-col gap-1 border-l-2 border-white/10 pl-6 pb-10 last:pb-0 group-hover:border-cyan-500/50 transition-colors">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-semibold text-white">{job.role}</span>
                      <span className="font-mono text-xs text-slate-500">{job.period}</span>
                    </div>
                    <p className="text-amber-400/90 font-medium">{job.company}</p>
                    <p className="text-xs text-slate-500">{job.location}</p>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">{job.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-sm uppercase tracking-widest text-cyan-400/80 mb-4">
                Education
              </h3>
              <ul className="space-y-4">
                {EDUCATION.map((ed) => (
                  <li key={ed.name} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="font-medium text-white">{ed.name}</p>
                    <p className="text-sm text-slate-400">{ed.detail}</p>
                    <p className="font-mono text-xs text-slate-500 mt-1">{ed.year}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-sm uppercase tracking-widest text-cyan-400/80 mb-4">
                Certifications
              </h3>
              <ul className="flex flex-wrap gap-2">
                {CERTS.map((c) => (
                  <li
                    key={c}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
