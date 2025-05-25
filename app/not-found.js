import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>404 - Stranica ne postoji</h2>
      <p>Tražena stranica nije pronađena!</p>
      <Link href="/">Vrati se na početnu</Link>
    </div>
  );
}
