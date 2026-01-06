"use client";

import { MovieGrid } from "@/components/movie-grid";
import { Pagination } from "@/components/pagination";
import { Movie } from "@/types/movie";

interface SearchClientProps {
  initialQuery: string;
  initialResults: {
    movies: Movie[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalResults: number;
    };
    query: string;
  } | null;
}

export function SearchClient({
  initialQuery,
  initialResults,
}: SearchClientProps) {
  if (!initialQuery) {
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

  if (!initialResults) {
    return null;
  }

  const { movies, pagination, query } = initialResults;

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
      <MovieGrid movies={movies} />

      {movies.length > 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          baseUrl="/search"
        />
      )}
    </div>
  );
}
