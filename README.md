🌐 Link aplikacije
https://top-tv-serije.vercel.app


🛠️ Tehnologije korištene
Next.js – React framework (App Router, SSR, dinamičke rute, API rute)

CSS Modules & Global CSS – Modularno i globalno stiliziranje

TVmaze API – Otvoreni API za podatke o serijama, epizodama i glumcima

Vercel – Platforma za deploy aplikacije

GitHub – Verzijska kontrola i suradnja


🚀 Funkcionalnosti
Pretraga i pregled TV serija (horizontalni infinite scroll na početnoj)

Prikaz detalja za svaku seriju (poster, žanrovi, ocjena, status, opis, glumci, epizode)

Spremanje i uklanjanje serija iz favorita (vlastite API rute, bez baze)

Prikaz i brisanje favorita na posebnoj stranici

Prikaz svih epizoda i glumaca s mogućnošću proširenja

Prilagođena 404 (Not Found) stranica i loading prikaz

Brzo, responzivno i pristupačno korisničko sučelje (CSS, sticky footer, moderni header)

SEO meta podaci (dynamic title/description, OpenGraph)

Visoke performanse (testirano s Lighthouse)


🏗️ Upute za lokalno pokretanje
bash
git clone https://github.com/bozuric/Top-serije-app.git
cd Top-serije-app
npm install
npm run dev


📦 Build & Deploy
Za lokalni build:

bash
npm run build
npm run start
Za deploy koristi Vercel – poveži repozitorij, deploy je automatski.
Aplikacija je online na: https://top-tv-serije.vercel.app


ℹ️ Napomena
Favoriti se spremaju u memoriji servera (RAM) – podaci se brišu nakon restarta servera ili deploya.

.env nije potreban za osnovnu funkcionalnost, ali možeš koristiti NEXT_PUBLIC_SITE_URL za server-side provjeru favorita.

Prikaz slika koristi Next.js <Image /> komponentu i automatsku optimizaciju.


💡 Arhitektura i logika (umjesto opširnih komentara u kodu)
API rute (app/api/favorites/route.js):
Favoriti se spremaju u memoriju servera (RAM). GET vraća sve favorite, POST dodaje novi, DELETE briše po ID-u. Ova metoda je jednostavna za demo, ali nije trajna.

Favoriti:
Klijentska komponenta koristi useEffect za dohvat trenutnog stanja favorita i useTransition za bolje korisničko iskustvo prilikom dodavanja/brisanja (izbjegava blokiranje sučelja).

Horizontalni infinite scroll:
Početna stranica koristi server-side fetch i deduplikaciju po ID-u. Infinite scroll je riješen tako da se nove serije učitavaju kad korisnik dođe blizu kraja scrolla.

Prikaz detalja serije:
Server-side fetch koristi paralelno dohvaćanje podataka o seriji, epizodama i glumcima.
SEO meta podaci generiraju se dinamički za svaku seriju.

Epizode i glumci:
Prikaz epizoda i glumaca je jednostavan, s fallbackom za prazne podatke i mogućnošću prikaza svih glumaca.

404 i loading:
Dodane su globalne fallback stranice za bolji UX.

Komentari u kodu:
Kod je pisan sa samorazumljivim nazivima funkcija i varijabli, a složenija logika (npr. deduplikacija, infinite scroll, paralelni fetch) je objašnjena u ovom README-u.
Za dodatne detalje pogledaj funkcije u HorizontalInfiniteScroll.jsx, FavoriteButton.jsx i API rutama.


👨‍💻 Autor
Josip Božurić
https://github.com/bozuric