import { getTrendingMovies, getPopularMovies } from "@/lib/tmdb";
import { MovieGrid } from "@/components/movie-grid";

export default async function Home() {
  // Fetch data on the server
  const trendingMovies = await getTrendingMovies("day");
  const popularResponse = await getPopularMovies(1);
  const popularMovies = popularResponse.results;

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
          <MovieGrid movies={trendingMovies.slice(0, 10)} />
        </section>

        {/* Popular Movies */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Popular Movies
            </h2>
          </div>
          <MovieGrid movies={popularMovies.slice(0, 10)} />
        </section>
      </div>
    </main>
  );
}
