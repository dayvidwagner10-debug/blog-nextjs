import slugify from "slugify";
import dados from "@/data/artigos.json";

export type Artigo = {
  slug: string;
  titulo: string;
  autor: string;
  data: string;
  resumo: string;
  conteudo: string;
};

export async function getArtigos(): Promise<Artigo[]> {
  return dados.map((a) => ({
    ...a,
    slug: slugify(a.titulo, { lower: true, strict: true }),
  }));
}

export async function getArtigo(slug: string): Promise<Artigo | undefined> {
  const artigos = await getArtigos();
  return artigos.find((a) => a.slug === slug);
}