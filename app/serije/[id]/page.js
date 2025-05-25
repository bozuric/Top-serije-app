import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import GlumciList from "@/components/GlumciList";
import styles from "./page.module.css";

// Dinamička SEO metadata za svaku seriju
export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  if (!res.ok) return { title: "Serija ne postoji" };
  const data = await res.json();

  return {
    title: `${data.name} │ Top TV Serije`,
    description: data.summary?.replace(/<[^>]+>/g, "") || "Detalji o seriji.",
    openGraph: {
      title: data.name,
      description: data.summary?.replace(/<[^>]+>/g, "") || "",
      images: [
        {
          url: data.image?.original || "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [data.image?.original || "/og-image.png"],
    },
  };
}

// Prikaz detalja serije (SSR)
export default async function SerijaDetalji({ params }) {
  const { id } = await params;

  // Dohvati detalje serije s embedanim epizodama i glumcima
  const res = await fetch(`https://api.tvmaze.com/shows/${id}?embed[]=episodes&embed[]=cast`);
  if (!res.ok) {
    return (
      <main className={styles.serijaMain}>
        <h1 className={styles.serijaTitle}>Serija nije pronađena!</h1>
        <Link href="/" className={styles.serijaBtn}>Vrati se na početnu</Link>
      </main>
    );
  }
  const data = await res.json();

  const { name, image, genres, summary, rating, status, premiered, _embedded } = data;
  const epizode = _embedded?.episodes || [];
  const glumci = _embedded?.cast || [];

  return (
    <main className={styles.serijaMain}>
      {/* Povratak na popis serija */}
      <Link href="/" className={styles.serijaBtn}>← Povratak na popis</Link>
      <div className={styles.serijaTop}>
        {/* Glavna slika serije */}
        <Image
          src={image?.original || "/no-image.png"}
          alt={name}
          width={250}
          height={350}
          className={styles.serijaPoster}
          priority
        />
        <div className={styles.serijaInfo}>
          <h1 className={styles.serijaTitle}>{name}</h1>
          {/* Gumb za favorite */}
          <FavoriteButton id={id} />
          <div className={styles.serijaGenres}>{genres.join(", ")}</div>
          <div className={styles.serijaMeta}>
            Status: {status} | Prikazano od: {premiered}
          </div>
          <div className={styles.serijaMeta}>
            Ocjena: {rating?.average || "N/A"}
          </div>
          {/* Kratki opis serije */}
          <div
            dangerouslySetInnerHTML={{ __html: summary }}
            className={styles.serijaSummary}
          />
        </div>
      </div>
      {/* Prikaz prvih 5 epizoda */}
      <section className={styles.serijaSection}>
        <h2>Epizode ({epizode.length})</h2>
        <ul>
          {epizode.slice(0, 5).map(ep => (
            <li key={ep.id}>
              Sezona {ep.season}, Epizoda {ep.number}: <b>{ep.name}</b> ({ep.airdate})
            </li>
          ))}
        </ul>
        <p>
          <Link href={`/serije/${id}/epizode`} className={styles.serijaBtn}>Prikaži sve epizode</Link>
        </p>
      </section>
      {/* Prikaz glumaca */}
      <GlumciList glumci={glumci} />
    </main>
  );
}
