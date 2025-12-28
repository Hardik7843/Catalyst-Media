import Link from "next/link";
import { SearchBar } from "./search-bar";
import { Film } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <Film className="h-6 w-6" />
          <span className="hidden sm:inline">MovieDB</span>
        </Link>

        <SearchBar />
      </div>
    </header>
  );
}
