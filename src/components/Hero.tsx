"use client";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-amber-500/5 pointer-events-none" />
      <div className="mx-auto max-w-6xl w-full relative">
        <div className="max-w-3xl">
          <p
            className="mb-4 font-mono text-sm uppercase tracking-widest text-cyan-400 opacity-90 animate-fade-in"
            style={{ animationDelay: "0s" }}
          >
            Sr. Software Engineer · Founder · U.S. Army Veteran
          </p>
          <h1
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl animate-slide-up opacity-0"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            Lawrence{" "}
            <span className="text-cyan-400">Jefferson</span> II
          </h1>
          <p
            className="mt-6 text-lg text-slate-400 leading-relaxed animate-slide-up opacity-0"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            Full stack engineer & cybersecurity enthusiast. Co-founder at{" "}
            <span className="text-amber-400/90">Crimson Obsidian Industries</span>.
            Building AI-augmented, spec-driven software and solving real-world problems.
          </p>
          <div
            className="mt-10 flex flex-wrap gap-4 animate-slide-up opacity-0"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <a
              href="#about"
              className="inline-flex items-center rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-400 transition hover:border-cyan-400 hover:bg-cyan-500/20"
            >
              About me
            </a>
            <a
              href="#career"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10"
            >
              Career journey
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </section>
  );
}
