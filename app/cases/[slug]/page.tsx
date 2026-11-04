import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/cases/CaseDetail";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { cases, getCase } from "@/content/cases";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCase((await params).slug);
  return c ? { title: `${c.title} | 이봉희`, description: c.summary } : {};
}

export default async function CasePage({ params }: Props) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  const i = cases.indexOf(c);
  return (
    <>
      <Nav />
      <main>
        <CaseDetail c={c} prev={cases[i - 1]} next={cases[i + 1]} />
      </main>
      <Footer />
    </>
  );
}
