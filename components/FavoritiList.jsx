"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FavoritiList() {
  const [favorites, setFavorites] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dohvati favorite na mount
  useEffect(() => {
    fetch("/api/favorites")
      .then(res => res.json())
      .then(data => setFavorites((data.favorites || []).map(String)));
  }, []);

  // Dohvati podatke o serijama kad se promijene favoriti
  useEffect(() => {
    if (favorites.length === 0) {
      setShows([]);
      return;
    }
    setLoading(true);
    Promise.all(
      favorites.map(id =>
        fetch(`https://api.tvmaze.com/shows/${id}`).then(res => res.json())
      )
    ).then(shows => {
      setShows(shows);
      setLoading(false);
    });
  }, [favorites]);

  // Funkcija za brisanje favorita
  async function handleDelete(id) {
    const stringId = String(id);
    await fetch(`/api/favorites?id=${encodeURIComponent(stringId)}`, {
      method: "DELETE"
    });
    setFavorites(prev => prev.filter(favId => favId !== stringId));
  }

  if (favorites.length === 0) {
    return (
      <main>
        <h1>Favoriti</h1>
        <p>Trenutno nema spremljenih serija.</p>
        <Link href="/">← Povratak na početnu</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Favoriti</h1>
      {loading && <p>Učitavanje...</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
        {shows.map(
          (show) =>
            show && (
              <div
                key={show.id}
                style={{
                  width: 200,
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px #0001",
                  padding: 12,
                  position: "relative",
                }}
              >
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
                <button
                  onClick={() => handleDelete(show.id)}
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "#e11d48",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 10px",
                    cursor: "pointer",
                  }}
                  title="Ukloni iz favorita"
                >
                  Ukloni
                </button>
              </div>
            )
        )}
      </div>
      <p style={{ marginTop: 32 }}>
        <Link href="/">← Povratak na početnu</Link>
      </p>
    </main>
  );
}
