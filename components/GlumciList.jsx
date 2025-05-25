"use client";
import { useState } from "react";
import Image from "next/image";

export default function GlumciList({ glumci }) {
  const [prikaziSveGlumce, setPrikaziSveGlumce] = useState(false);

  return (
    <section>
      <h2>Glumci</h2>
      <ul style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {(prikaziSveGlumce ? glumci : glumci.slice(0, 6)).map(item => (
          <li key={item.person.id} style={{ width: 120 }}>
            <Image
              src={item.person.image?.medium || "/no-image.png"}
              alt={item.person.name}
              width={100}
              height={140}
              style={{ borderRadius: 6 }}
            />
            <div style={{ fontWeight: 600 }}>{item.person.name}</div>
            <div style={{ fontSize: "0.9em", color: "#666" }}>{item.character?.name}</div>
          </li>
        ))}
      </ul>
      {glumci.length > 6 && (
        <button
          onClick={() => setPrikaziSveGlumce(v => !v)}
          style={{
            marginTop: 16,
            padding: "6px 16px",
            borderRadius: 4,
            background: "#2563eb",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {prikaziSveGlumce ? "Prikaži manje" : "Prikaži sve glumce"}
        </button>
      )}
    </section>
  );
}
