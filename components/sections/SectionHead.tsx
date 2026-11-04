export function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <header className="mb-8 sm:mb-10">
      <p className="font-mono text-xs tracking-[0.14em] text-accent-2">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{title}</h2>
      {desc && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mute sm:text-base">{desc}</p>}
    </header>
  );
}
