import { Suspense } from "react";
import { SearchClient } from "./search-client";

async function getSearchResults(query: string, page: number) {
  if (!query) return null;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(
    `${baseUrl}/api/movies/search?query=${encodeURIComponent(
      query
    )}&page=${page}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return {
    movies: data.data,
    pagination: data.pagination,
    query: data.query,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const page = parseInt(params.page || "1", 10);

  const results = await getSearchResults(query, page);

  return (
    <main className="min-h-screen">
      <div className="container px-4 md:px-8 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchClient initialQuery={query} initialResults={results} />
        </Suspense>
      </div>
    </main>
  );
}
