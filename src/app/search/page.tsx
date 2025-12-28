"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fetchSearchMovies } from "@/lib/api-client";
import { MovieGrid } from "@/components/movie-grid";
import { Pagination } from "@/components/pagination";
import { Movie } from "@/types/movie";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSearchResults() {
      if (!query) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetchSearchMovies(query, page);
        setMovies(response.movies);
        setPagination(response.pagination);
      } catch (error) {
        console.error("Error searching movies:", error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadSearchResults();
  }, [query, page]);

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold">
          Search Results for "{query}"
        </h2>
        <p className="text-muted-foreground mt-1">
          Found {pagination.totalResults}{" "}
          {pagination.totalResults === 1 ? "movie" : "movies"}
        </p>
      </div>
      <MovieGrid movies={movies} isLoading={isLoading} />

      {!isLoading && movies.length > 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          baseUrl="/search"
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen">
      <div className="container px-4 md:px-8 py-8">
        <Suspense fallback={<MovieGrid movies={[]} isLoading />}>
          <SearchResults />
        </Suspense>
      </div>
    </main>
  );
}
