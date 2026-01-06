import { notFound } from "next/navigation";
import { MovieDetailsClient } from "./movie-details-client";

async function getMovieData(movieId: number) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const [movieRes, creditsRes, similarRes] = await Promise.all([
      fetch(`${baseUrl}/api/movies/${movieId}`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/movies/${movieId}/credits`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/movies/${movieId}/similar`, { cache: "no-store" }),
    ]);

    if (!movieRes.ok) {
      notFound();
    }

    const [movieData, creditsData, similarData] = await Promise.all([
      movieRes.json(),
      creditsRes.json(),
      similarRes.json(),
    ]);

    return {
      movie: movieData.data,
      credits: creditsData.data,
      similar: similarData.data.slice(0, 10),
    };
  } catch (error) {
    console.error("Failed to load movie:", error);
    notFound();
  }
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = parseInt(id, 10);

  if (isNaN(movieId)) {
    notFound();
  }

  const data = await getMovieData(movieId);

  return <MovieDetailsClient {...data} />;
}
