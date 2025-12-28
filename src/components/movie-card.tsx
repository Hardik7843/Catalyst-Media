"use client";

import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/movie";
import { getImageUrl, formatRating, formatDate } from "@/lib/tmdb";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <Link href={`/movie/${movie.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border-none bg-card/50 backdrop-blur">
        <div className="relative aspect-2/3 overflow-hidden bg-muted">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {movie.vote_average > 0 && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-white">
                {formatRating(movie.vote_average)}
              </span>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1 mb-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <p className="text-sm text-muted-foreground">{releaseYear}</p>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0">
          {movie.overview && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {movie.overview}
            </p>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
