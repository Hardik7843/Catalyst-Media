import { Movie, MovieDetails, MoviesResponse, Credits } from "@/types/movie";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

if (!API_KEY) {
  console.warn(
    "TMDB API key is not configured. Please add NEXT_PUBLIC_TMDB_API_KEY to your .env.local file"
  );
}

// Helper function to build API URLs
const buildUrl = (endpoint: string, params?: Record<string, string>) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY || "");

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  return url.toString();
};

// Fetch wrapper with error handling
async function fetchFromTMDB<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    throw error;
  }
}

export async function getTrendingMovies(
  timeWindow: "day" | "week" = "day"
): Promise<Movie[]> {
  const url = buildUrl(`/trending/movie/${timeWindow}`);
  const data = await fetchFromTMDB<MoviesResponse>(url);
  return data.results;
}

export async function getPopularMovies(
  page: number = 1
): Promise<MoviesResponse> {
  const url = buildUrl("/movie/popular", { page: page.toString() });
  return await fetchFromTMDB<MoviesResponse>(url);
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<MoviesResponse> {
  const url = buildUrl("/search/movie", {
    query,
    page: page.toString(),
  });
  return await fetchFromTMDB<MoviesResponse>(url);
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const url = buildUrl(`/movie/${movieId}`);
  return await fetchFromTMDB<MovieDetails>(url);
}

export async function getMovieCredits(movieId: number): Promise<Credits> {
  const url = buildUrl(`/movie/${movieId}/credits`);
  return await fetchFromTMDB<Credits>(url);
}

export async function getSimilarMovies(movieId: number): Promise<Movie[]> {
  const url = buildUrl(`/movie/${movieId}/similar`);
  const data = await fetchFromTMDB<MoviesResponse>(url);
  return data.results;
}

// Image URL helpers
export const getImageUrl = (
  path: string | null,
  size: "w200" | "w300" | "w500" | "original" = "w500"
) => {
  if (!path) return "/placeholder-movie.png";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (
  path: string | null,
  size: "w780" | "w1280" | "original" = "w1280"
) => {
  if (!path) return "/placeholder-backdrop.png";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Utility functions
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};
