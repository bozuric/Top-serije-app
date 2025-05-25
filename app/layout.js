import "./globals.css";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <body>
        <div className="main-header">
          <Link href="/" className="header-title">
            Top TV Serije
          </Link>
          <div className="header-right">
            <SearchBox />
            <nav className="nav-links">
              <Link href="/" className="nav-btn">
                Početna
              </Link>
              <Link href="/favoriti" className="nav-btn">
                Favoriti
              </Link>
            </nav>
          </div>
        </div>
        <div className="main-content">{children}</div>
        <footer className="main-footer">
          Podaci sa{" "}
          <a
            href="https://www.tvmaze.com/api"
            target="_blank"
            rel="noopener noreferrer"
          >
            TVmaze API-ja
          </a>{" "}
          © {new Date().getFullYear()} – Sva prava pridržana
        </footer>
      </body>
    </html>
  );
}
