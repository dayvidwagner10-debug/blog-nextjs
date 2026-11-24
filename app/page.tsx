import Link from "next/link";
import { getArtigos } from "@/lib/artigos";

export default async function Home() {
  const artigos = await getArtigos();

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {artigos.map((a) => (
          <li key={a.slug}>
            <Link href={`/artigos/${a.slug}`}>
              <h2>{a.titulo}</h2>
            </Link>
            <p>{a.resumo}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}