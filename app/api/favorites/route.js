// Memorijska "baza" favorita (vrijedi dok je server aktivan)
let favorites = [];

// GET: Vraća sve spremljene favorite
export async function GET() {
  return Response.json({ favorites });
}

// POST: Dodaje novi favorit po id-u
export async function POST(request) {
  const body = await request.json();
  if (!body?.id) return Response.json({ error: "id missing" }, { status: 400 });
  if (!favorites.includes(body.id)) favorites.push(body.id);
  return Response.json({ ok: true, favorites });
}

// DELETE: Briše favorit po id-u iz memorije
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "id missing" }, { status: 400 });
  favorites = favorites.filter(favId => favId !== id);
  return Response.json({ ok: true, favorites });
}
