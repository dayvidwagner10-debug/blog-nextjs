import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArtigo, getArtigos } from "@/lib/artigos";

type Props = { params: Promise<{ slug: string }> };

// SSG: gera uma página estática por artigo no build
export async function generateStaticParams() {
  const artigos = await getArtigos();
  return artigos.map((a) => ({ slug: a.slug }));
}

// SEO: title e description únicos por artigo
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigo(slug);

  if (!artigo) return { title: "Artigo não encontrado" };

  return {
    title: artigo.titulo,
    description: artigo.resumo,
  };
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const artigo = await getArtigo(slug);

  if (!artigo) notFound();

  return (
    <article>
      <h1>{artigo.titulo}</h1>
      <p>
        Por {artigo.autor} em{" "}
        {new Date(artigo.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
      </p>
      <p>{artigo.conteudo}</p>
    </article>
  );
}