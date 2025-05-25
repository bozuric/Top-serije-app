import Image from "next/image";
import Link from "next/link";

export default async function Pretraga({ searchParams }) {
  const upit = searchParams?.q || "";
  let serije = [];
  let greska = false;

  if (upit.trim() !== "") {
    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(upit)}`);
      if (res.ok) {
        const data = await res.json();
        serije = data.map(el => el.show);
      } else {
        greska = true;
      }
    } catch {
      greska = true;
    }
  }

  return (
    <main>
      <h1>Rezultati pretrage</h1>
      {upit.trim() === "" && <p>Upiši pojam za pretragu serija.</p>}
      {greska && <p style={{ color: "red" }}>Greška pri dohvaćanju rezultata.</p>}
      {!greska && upit.trim() !== "" && serije.length === 0 && <p>Nema rezultata za "{upit}".</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 24 }}>
        {serije.map(show => (
          <div key={show.id} style={{ width: 200, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001", padding: 12 }}>
            <Link href={`/serije/${show.id}`}>
              <Image
                src={show.image?.medium || "/no-image.png"}
                alt={show.name}
                width={200}
                height={285}
                style={{ borderRadius: 6 }}
              />
              <h2 style={{ fontSize: "1.1rem", margin: "10px 0 4px 0" }}>{show.name}</h2>
            </Link>
            <div style={{ color: "#555", fontSize: "0.95em" }}>{show.genres?.join(", ")}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
