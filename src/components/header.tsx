import Link from "next/link";
import { Suspense } from "react";
import { SearchBar } from "./search-bar";
import { Film } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* TODO: check why this needs so much padding on mobile? */}
      <div className="container flex h-16 items-center justify-between px-6 md:px-12 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <Film className="h-6 w-6" />
          <span className="hidden sm:inline">MovieDB</span>
        </Link>

        <Suspense
          fallback={
            <div className="w-full max-w-md h-10 bg-muted animate-pulse rounded-md" />
          }
        >
          <SearchBar />
        </Suspense>
      </div>
    </header>
  );
}
