import Link from "next/link";

export const revalidate = 60;

export default async function EpizodePage({ params }) {
  const { id } = params;

  // Dohvati sve epizode za seriju
  const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
  if (!res.ok) {
    return (
      <main>
        <h1>Epizode nisu pronađene!</h1>
        <Link href={`/serije/${id}`}>Vrati se na detalje serije</Link>
      </main>
    );
  }
  const epizode = await res.json();

  return (
    <main>
      <h1>Popis svih epizoda</h1>
      <Link href={`/serije/${id}`} style={{ display: "inline-block", marginBottom: 16 }}>
        ← Povratak na detalje serije
      </Link>
      <ul>
        {epizode.map(ep => (
          <li key={ep.id} style={{ marginBottom: 8 }}>
            <b>{ep.name}</b> (Sezona {ep.season}, Epizoda {ep.number}, {ep.airdate})
          </li>
        ))}
      </ul>
    </main>
  );
}
