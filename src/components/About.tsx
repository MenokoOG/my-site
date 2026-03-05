export function About() {
  return (
    <section id="about" className="relative border-t border-white/5 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          About <span className="text-cyan-400">me</span>
        </h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <div className="space-y-6 text-slate-400 leading-relaxed">
            <p>
              Senior full stack engineer and cybersecurity enthusiast, currently back in school
              upskilling in <strong className="text-slate-300">AI engineering</strong> and focused
              on bringing these skills to the table to help solve real-world problems.
            </p>
            <p>
              Currently serving as CTO at Welcoin while also running a side-hustle at OkO Forge LLC
              DBA <strong className="text-amber-400/90">Crimson Obsidian Industries and Labs</strong>.
              Continuing education, mentorship, and hands-on AI engineering work are core to how I
              grow, experiment, and deliver value.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400/80 mb-3">
                Top skills
              </h3>
              <ul className="flex flex-wrap gap-2">
                {["Technology Leadership", "AI Solutions", "Blockchain"].map(
                  (skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300"
                    >
                      {skill}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400/80 mb-3">
                Location
              </h3>
              <p className="text-slate-400">Clarkston, Washington, United States</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
