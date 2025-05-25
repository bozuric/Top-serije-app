"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [upit, setUpit] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (upit.trim() === "") return;
    router.push(`/pretraga?q=${encodeURIComponent(upit)}`);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 24 }}>
      <input
        type="text"
        placeholder="Pretraži serije..."
        value={upit}
        onChange={e => setUpit(e.target.value)}
        style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", minWidth: 200 }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          borderRadius: 4,
          background: "#2563eb",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Pretraži
      </button>
    </form>
  );
}
