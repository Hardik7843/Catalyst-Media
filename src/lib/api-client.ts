import { Movie, MovieDetails, Credits } from "@/types/movie";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalResults: number;
  };
}

const API_BASE = "/api/movies";

async function fetchApi<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.error || "API request failed");
  }

  return json;
}

export async function fetchTrendingMovies(
  timeWindow: "day" | "week" = "day"
): Promise<Movie[]> {
  const response = await fetchApi<ApiResponse<Movie[]>>(
    `${API_BASE}/trending?timeWindow=${timeWindow}`
  );
  return response.data;
}

export async function fetchPopularMovies(page: number = 1) {
  const response = await fetchApi<PaginatedResponse<Movie[]>>(
    `${API_BASE}/popular?page=${page}`
  );
  return {
    movies: response.data,
    pagination: response.pagination!,
  };
}

export async function fetchSearchMovies(query: string, page: number = 1) {
  const response = await fetchApi<PaginatedResponse<Movie[]>>(
    `${API_BASE}/search?query=${encodeURIComponent(query)}&page=${page}`
  );
  return {
    movies: response.data,
    pagination: response.pagination!,
    query: (response as any).query,
  };
}

export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  const response = await fetchApi<ApiResponse<MovieDetails>>(
    `${API_BASE}/${id}`
  );
  return response.data;
}

export async function fetchMovieCredits(id: number): Promise<Credits> {
  const response = await fetchApi<ApiResponse<Credits>>(
    `${API_BASE}/${id}/credits`
  );
  return response.data;
}

export async function fetchSimilarMovies(id: number): Promise<Movie[]> {
  const response = await fetchApi<ApiResponse<Movie[]>>(
    `${API_BASE}/${id}/similar`
  );
  return response.data;
}
