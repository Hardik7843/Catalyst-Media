"use client";

import { MovieGrid } from "@/components/movie-grid";
import { Movie } from "@/types/movie";

interface HomeClientProps {
  trendingMovies: Movie[];
  popularMovies: Movie[];
}

export function HomeClient({ trendingMovies, popularMovies }: HomeClientProps) {
  return (
    <main className="min-h-screen">
      <div className="container px-4 md:px-8 py-8 space-y-12">
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

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Trending Today
            </h2>
          </div>
          <MovieGrid movies={trendingMovies} />
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Popular Movies
            </h2>
          </div>
          <MovieGrid movies={popularMovies} />
        </section>
      </div>
    </main>
  );
}
