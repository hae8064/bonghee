"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#cases", label: "Cases" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? "border-b border-line/70 bg-bg/85 backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
        <Link href="/#top" className="shrink-0 font-mono text-sm font-semibold text-white">bonghee<span className="text-trace">.</span></Link>
        <ul className="flex min-w-0 items-center gap-3 overflow-x-auto text-[13px] sm:gap-6 sm:text-sm">
          {links.map((l) => (
            <li key={l.href}><Link href={l.href} className="text-mute transition-colors hover:text-white">{l.label}</Link></li>
          ))}
          <li><a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-mute transition-colors hover:text-white">GitHub</a></li>
        </ul>
      </div>
    </nav>
  );
}
