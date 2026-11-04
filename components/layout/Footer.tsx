import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line/70">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
        <p className="font-mono text-xs tracking-[0.14em] text-accent-2">CONTACT</p>
        <p className="mt-3 text-2xl font-black text-white sm:text-3xl">{profile.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <a href={`mailto:${profile.email}`} className="text-ink hover:text-accent-2">{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent-2">github.com/hae8064</a>
        </div>
        <p className="mt-10 font-mono text-[11px] text-mute/70">© 2026 이봉희 · Next.js · three.js · anime.js</p>
      </div>
    </footer>
  );
}
