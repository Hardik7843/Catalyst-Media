import { HomeClient } from "./home-client";

async function getMoviesData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const [trendingRes, popularRes] = await Promise.all([
    fetch(`${baseUrl}/api/movies/trending?timeWindow=day`, {
      cache: "no-store",
    }),
    fetch(`${baseUrl}/api/movies/popular?page=1`, { cache: "no-store" }),
  ]);

  const trending = await trendingRes.json();
  const popular = await popularRes.json();

  return {
    trending: trending.data.slice(0, 10),
    popular: popular.data.slice(0, 10),
  };
}

export default async function Home() {
  const { trending, popular } = await getMoviesData();

  console.log("trending: ", trending);
  console.log("popular: ", popular);
  return <HomeClient trendingMovies={trending} popularMovies={popular} />;
}
