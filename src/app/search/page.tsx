import { searchMovies } from "@/lib/tmdb";
import { MovieGrid } from "@/components/movie-grid";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-xl font-semibold text-muted-foreground mb-2">
          Start searching
        </p>
        <p className="text-sm text-muted-foreground">
          Enter a movie title in the search bar above
        </p>
      </div>
    );
  }

  const results = await searchMovies(query);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold">
          Search Results for "{query}"
        </h2>
        <p className="text-muted-foreground mt-1">
          Found {results.total_results}{" "}
          {results.total_results === 1 ? "movie" : "movies"}
        </p>
      </div>
      <MovieGrid movies={results.results} />
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  return (
    <main className="min-h-screen">
      <div className="container px-4 md:px-8 py-8">
        <Suspense fallback={<MovieGrid movies={[]} isLoading />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </main>
  );
}
