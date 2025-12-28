"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
} from "@/lib/api-client";
import {
  getImageUrl,
  getBackdropUrl,
  formatRating,
  formatDate,
  formatRuntime,
} from "@/lib/tmdb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MovieGrid } from "@/components/movie-grid";
import { Star, Calendar, Clock, ArrowLeft } from "lucide-react";
import { MovieDetails, Credits, Movie } from "@/types/movie";

export default function MoviePage() {
  const params = useParams();
  const id = params.id as string;
  const movieId = parseInt(id);

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isNaN(movieId)) {
      notFound();
      return;
    }

    async function loadMovieData() {
      try {
        setIsLoading(true);
        const [movieData, creditsData, similarData] = await Promise.all([
          fetchMovieDetails(movieId),
          fetchMovieCredits(movieId),
          fetchSimilarMovies(movieId),
        ]);

        setMovie(movieData);
        setCredits(creditsData);
        setSimilar(similarData);
      } catch (error) {
        console.error("Error loading movie data:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    }

    loadMovieData();
  }, [movieId]);

  if (isLoading || !movie || !credits) {
    return (
      <main className="min-h-screen">
        <div className="container px-4 md:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-muted rounded-lg" />
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        </div>
      </main>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, "original");
  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const mainCast = credits.cast.slice(0, 8);

  return (
    <main className="min-h-screen">
      {/* Backdrop Hero */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/20" />

        <Link href="/" className="absolute top-4 left-4 z-10">
          <Button variant="secondary" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <div className="container px-4 md:px-8 -mt-32 relative z-10">
        <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-12">
          {/* Poster */}
          <div className="hidden md:block">
            <Card className="overflow-hidden">
              <div className="relative aspect-2/3">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          </div>

          {/* Movie Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-lg italic text-muted-foreground">
                  "{movie.tagline}"
                </p>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {movie.vote_average > 0 && (
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">
                    {formatRating(movie.vote_average)}
                  </span>
                  <span className="text-muted-foreground">
                    ({movie.vote_count.toLocaleString()} votes)
                  </span>
                </div>
              )}
              {movie.release_date && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
              )}
              {movie.runtime > 0 && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.overview || "No overview available."}
              </p>
            </div>

            {/* Cast */}
            {mainCast.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {mainCast.map((actor) => (
                    <div key={actor.id} className="space-y-2">
                      <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-muted">
                        {actor.profile_path ? (
                          <Image
                            src={getImageUrl(actor.profile_path, "w200")}
                            alt={actor.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No Photo
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm line-clamp-1">
                          {actor.name}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {actor.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Movies */}
        {similar.length > 0 && (
          <section className="space-y-6 pb-12">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Similar Movies
            </h2>
            <MovieGrid movies={similar.slice(0, 10)} />
          </section>
        )}
      </div>
    </main>
  );
}
