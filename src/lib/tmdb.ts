import { Movie, MovieDetails, MoviesResponse, Credits } from "@/types/movie";
import {
  mockMovies,
  getMockMovieDetails,
  getMockCredits,
  getMockMoviesResponse,
} from "./mock-data";
import placeholderMovie from "../public/placeholder-movie.png";
import placeholderBackdrop from "../public/placeholder-backdrop.png";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const USE_MOCK_DATA =
  !API_KEY || process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

if (!API_KEY) {
  console.warn(
    "TMDB API key is not configured. Using mock data for demonstration."
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

// Fetch wrapper with error handling and mock data fallback
async function fetchFromTMDB<T>(
  url: string,
  mockFallback: () => T
): Promise<T> {
  if (USE_MOCK_DATA) {
    console.log(
      "Using mock data (API key not configured or mock mode enabled)"
    );
    return mockFallback();
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Error fetching from TMDB, falling back to mock data:",
      error
    );
    return mockFallback();
  }
}

export async function getTrendingMovies(
  timeWindow: "day" | "week" = "day"
): Promise<Movie[]> {
  const url = buildUrl(`/trending/movie/${timeWindow}`);
  const data = await fetchFromTMDB<MoviesResponse>(url, () =>
    getMockMoviesResponse(mockMovies.slice(0, 10))
  );
  return data.results;
}

export async function getPopularMovies(
  page: number = 1
): Promise<MoviesResponse> {
  const url = buildUrl("/movie/popular", { page: page.toString() });
  return await fetchFromTMDB<MoviesResponse>(url, () =>
    getMockMoviesResponse(mockMovies)
  );
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<MoviesResponse> {
  const url = buildUrl("/search/movie", {
    query,
    page: page.toString(),
  });
  return await fetchFromTMDB<MoviesResponse>(url, () => {
    const filtered = mockMovies.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase())
    );
    return getMockMoviesResponse(filtered);
  });
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const url = buildUrl(`/movie/${movieId}`);
  return await fetchFromTMDB<MovieDetails>(url, () =>
    getMockMovieDetails(movieId)
  );
}

export async function getMovieCredits(movieId: number): Promise<Credits> {
  const url = buildUrl(`/movie/${movieId}/credits`);
  return await fetchFromTMDB<Credits>(url, () => getMockCredits());
}

export async function getSimilarMovies(movieId: number): Promise<Movie[]> {
  const url = buildUrl(`/movie/${movieId}/similar`);
  const data = await fetchFromTMDB<MoviesResponse>(url, () =>
    getMockMoviesResponse(mockMovies.slice(0, 5))
  );
  return data.results;
}

// Image URL helpers
export const getImageUrl = (
  path: string | null,
  size: "w200" | "w300" | "w500" | "original" = "w500"
) => {
  if (!path) return placeholderMovie;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (
  path: string | null,
  size: "w780" | "w1280" | "original" = "w1280"
) => {
  if (!path) return placeholderBackdrop;
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
