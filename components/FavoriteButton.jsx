"use client";
import { useState, useEffect, useTransition } from "react";

// Gumb za dodavanje/uklanjanje serije iz favorita
export default function FavoriteButton({ id }) {
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Provjera je li serija već u favoritima (GET na API)
  useEffect(() => {
    fetch("/api/favorites")
      .then(res => res.json())
      .then(data => {
        if (data.favorites?.includes(id)) setSaved(true);
      });
  }, [id]);

  // Dodavanje serije u favorite (POST na API)
  async function dodajFavorita() {
    startTransition(async () => {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setSaved(true);
    });
  }

  // Uklanjanje serije iz favorita (DELETE na API)
  async function ukloniFavorita() {
    startTransition(async () => {
      const res = await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setSaved(false);
    });
  }

  // Prikaz gumba ovisno o stanju
  return saved ? (
    <button onClick={ukloniFavorita} disabled={isPending} style={{ background: "#b91c1c", color: "#fff", padding: "6px 12px", borderRadius: 4 }}>
      Ukloni iz favorita
    </button>
  ) : (
    <button onClick={dodajFavorita} disabled={isPending} style={{ background: "#2563eb", color: "#fff", padding: "6px 12px", borderRadius: 4 }}>
      Dodaj u favorite
    </button>
  );
}
