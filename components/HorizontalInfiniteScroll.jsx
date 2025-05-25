"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HorizontalInfiniteScroll() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef(null);

  // Dohvati serije za trenutnu stranicu i dedupliciraj po show.id
  useEffect(() => {
    if (!hasMore) return;
    setLoading(true);
    fetch(`https://api.tvmaze.com/shows?page=${page}`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          setHasMore(false);
        } else {
          setShows(prev => {
            // Deduplikacija po show.id
            const existingIds = new Set(prev.map(s => s.id));
            const newShows = data.filter(s => !existingIds.has(s.id));
            return [...prev, ...newShows];
          });
        }
      })
      .finally(() => setLoading(false));
  }, [page, hasMore]);

  // Infinite scroll: blizu kraja, učitaj još
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !hasMore) return;

    function onScroll() {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 100
      ) {
        if (!loading) setPage(prev => prev + 1);
      }
    }
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [loading, hasMore]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "40px 0"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Popularne TV serije</h1>
      <div
        ref={containerRef}
  style={{
    display: "flex",
    flexDirection: "row",
    gap: 32, 
    overflowX: "auto",
    overflowY: "hidden",
    width: 1200, 
    maxWidth: "100vw",
    height: 430,
    padding: "0 32px", 
    background: "#f7f7f7",
    borderRadius: 12,
    boxShadow: "0 2px 16px #0001",
    scrollSnapType: "x mandatory"
  }}
      >
        {shows.map((show, idx) => (
          <div
            key={`${show.id}-${idx}`}
            style={{
              minWidth: 200,
              maxWidth: 200,
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 2px 8px #0001",
              padding: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              scrollSnapAlign: "start"
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
              <h2 style={{ fontSize: "1.1rem", margin: "10px 0 4px 0", textAlign: "center" }}>{show.name}</h2>
            </Link>
            <div style={{ fontSize: "0.9rem", color: "#555", marginBottom: "6px", textAlign: "center" }}>
              {show.genres.join(", ")}
            </div>
          </div>
        ))}
      </div>
      {loading && <p style={{ marginTop: 16 }}>Učitavanje...</p>}
      {!hasMore && <p style={{ marginTop: 16 }}>Nema više serija za prikaz.</p>}
    </div>
  );
}
