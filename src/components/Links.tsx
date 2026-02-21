import Link from "next/link";

const LINKS = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/lawrence-jefferson-ii-46497075",
    description: "Connect and view full experience and recommendations",
    icon: "linkedin",
  },
  {
    title: "GitHub",
    href: "https://github.com/MenokoOG",
    description: "Code, side projects, and open source",
    icon: "github",
  },
  {
    title: "Personal site",
    href: "https://ljefferson-menoko-site.netlify.app/",
    description: "Portfolio and personal projects",
    icon: "globe",
  },
  {
    title: "Portfolio (coming soon)",
    href: "#",
    description: "Dedicated portfolio—case studies and project highlights",
    icon: "briefcase",
  },
];

const ICONS: Record<string, string> = {
  linkedin: "M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-1.12 0-1.58.77-1.58 1.9V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z",
  github:
    "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  globe: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  briefcase:
    "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z",
};

function Icon({ name }: { name: string }) {
  return (
    <svg
      className="h-5 w-5 text-cyan-400"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d={ICONS[name] || ICONS.globe} />
    </svg>
  );
}

export function Links() {
  return (
    <section id="links" className="relative border-t border-white/5 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Links & <span className="text-cyan-400">portfolio</span>
        </h2>
        <p className="mt-3 text-slate-400">
          Connect and explore more work. Portfolio section will grow with case studies and projects.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((item) => {
            const isPlaceholder = item.href === "#";
            const card = (
              <article
                className={`group flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-500/30 hover:bg-white/10 ${
                  isPlaceholder ? "opacity-80" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-lg border border-white/10 bg-white/5 p-2">
                    <Icon name={item.icon} />
                  </span>
                  <h3 className="font-semibold text-white">
                    {item.title}
                    {isPlaceholder && (
                      <span className="ml-2 font-mono text-xs font-normal text-slate-500">
                        (soon)
                      </span>
                    )}
                  </h3>
                </div>
                <p className="mt-3 flex-1 text-sm text-slate-400">{item.description}</p>
                {!isPlaceholder && (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-400 group-hover:underline">
                    Open
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                )}
              </article>
            );
            return (
              <div key={item.title}>
                {isPlaceholder ? (
                  <div className="block">{card}</div>
                ) : (
                  <Link href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                    {card}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-12 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
          <p className="text-sm text-slate-300">
            <strong className="text-amber-400/90">Contact:</strong>{" "}
            <a
              href="mailto:jefftkddan@gmail.com"
              className="text-cyan-400 hover:underline"
            >
              jefftkddan@gmail.com
            </a>
            {" "}· Clarkston, WA
          </p>
        </div>
      </div>
    </section>
  );
}
