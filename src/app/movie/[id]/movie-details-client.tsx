"use client";

import Image from "next/image";
import Link from "next/link";
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

interface MovieDetailsClientProps {
  movie: MovieDetails;
  credits: Credits;
  similar: Movie[];
}

export function MovieDetailsClient({
  movie,
  credits,
  similar,
}: MovieDetailsClientProps) {
  const backdropUrl = getBackdropUrl(movie.backdrop_path, "original");
  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const mainCast = credits.cast.slice(0, 8);

  return (
    <main className="min-h-screen">
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

          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-lg italic text-muted-foreground">
                  "{movie.tagline}"
                </p>
              )}
            </div>

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

            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.overview || "No overview available."}
              </p>
            </div>

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

        {similar.length > 0 && (
          <section className="space-y-6 pb-12" style={{ marginTop: "3.5rem" }}>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Similar Movies
            </h2>
            <MovieGrid movies={similar} />
          </section>
        )}
      </div>
    </main>
  );
}
