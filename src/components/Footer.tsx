import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0d1117]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Lawrence Jefferson II. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="https://github.com/MenokoOG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/lawrence-jefferson-ii-46497075"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              LinkedIn
            </Link>
            <Link
              href="https://ljefferson-menoko-site.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              Personal Site
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
