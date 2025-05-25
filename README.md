# 🎬 Top TV Serije

Top TV Serije je moderna Next.js web aplikacija za pregled, pretragu i spremanje omiljenih TV serija. Omogućuje detaljan prikaz serija, epizoda i glumaca, kao i upravljanje favoritima putem vlastitih API ruta. Aplikacija je optimizirana za performanse i testirana Lighthouse alatom.

---

## 🌐 Link aplikacije

[https://top-tv-serije.vercel.app](https://top-tv-serije.vercel.app)

---

## 🛠️ Tehnologije korištene

- **Next.js** – React framework za SSR, App Router i brzu izradu aplikacija
- **CSS Modules \& Global CSS** – Modularno i globalno stiliziranje bez Tailwinda
- **TVmaze API** – Otvoreni API za podatke o serijama, epizodama i glumcima
- **Vercel** – Platforma za deploy aplikacije
- **GitHub** – Verzijska kontrola i suradnja

---

## 🚀 Funkcionalnosti

- Pretraga i pregled TV serija (horizontalni infinite scroll na početnoj)
- Prikaz detalja za svaku seriju (poster, žanrovi, ocjena, status, opis, glumci, epizode)
- Spremanje i uklanjanje serija iz favorita (vlastite API rute, bez baze)
- Prikaz i brisanje favorita na posebnoj stranici
- Prikaz svih epizoda i glumaca s mogućnošću proširenja
- Prilagođena 404 (Not Found) stranica i loading prikaz
- Brzo, responzivno i pristupačno korisničko sučelje (CSS, sticky footer, moderni header)
- SEO meta podaci (dynamic title/description, OpenGraph)
- Visoke performanse (testirano s Lighthouse)

---

## 🏗️ Lokalno pokretanje aplikacije

```bash
git clone https://github.com/bozuric/Top-serije-app.git
cd Top-serije-app
npm install
npm run dev
```
---

## 📦 Build \& Deploy

Za lokalni build:

```bash
npm run build
npm run start
```

Za deploy koristi Vercel – poveži repozitorij, deploy je automatski.

---

## ℹ️ Napomena

- Favoriti se spremaju u memoriji servera (RAM) – podaci se brišu nakon restarta servera ili deploya.
- Nije potrebna nikakva `.env` konfiguracija za osnovnu funkcionalnost, osim ako želiš promijeniti bazni URL za API (vidi `.env` primjer u kodu).
- Prikaz slika koristi Next.js `<Image />` komponentu i automatsku optimizaciju.

---

## 👨‍💻 Autor

Josip Božurić
[Instagram](https://www.instagram.com/josip_bozuric/)

---

## 📄 Dodatno

- Kod je organiziran prema uputama za izradu projekta (App Router, server-side fetch, modularni CSS, API rute, SEO).
- Za svaki napredniji zahtjev (npr. baza, autentikacija) aplikacija je spremna za proširenje.

---
    