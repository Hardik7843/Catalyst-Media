"use client";

import { useEffect, useState } from "react";
import { fetchTrendingMovies, fetchPopularMovies } from "@/lib/api-client";
import { MovieGrid } from "@/components/movie-grid";
import { Movie } from "@/types/movie";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);
        const [trending, popular] = await Promise.all([
          fetchTrendingMovies("day"),
          fetchPopularMovies(1),
        ]);

        setTrendingMovies(trending.slice(0, 10));
        setPopularMovies(popular.movies.slice(0, 10));
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, []);

  return (
    <main className="min-h-screen">
      <div className="container px-4 md:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Discover Movies
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore trending films, search for your favorites, and dive into
              detailed information about movies from around the world.
            </p>
          </div>
        </section>

        {/* Trending Movies */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Trending Today
            </h2>
          </div>
          <MovieGrid movies={trendingMovies} isLoading={isLoading} />
        </section>

        {/* Popular Movies */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Popular Movies
            </h2>
          </div>
          <MovieGrid movies={popularMovies} isLoading={isLoading} />
        </section>
      </div>
    </main>
  );
}
