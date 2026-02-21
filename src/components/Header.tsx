"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Career", href: "#career" },
  { label: "Links", href: "#links" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0c10]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="#"
          className="font-display text-lg font-semibold tracking-tight text-white"
        >
          LJ<span className="text-cyan-400">II</span>
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-5 bg-white transition ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-white transition ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="border-t border-white/5 bg-[#0a0c10] px-6 py-4 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-slate-400 hover:text-cyan-400"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
