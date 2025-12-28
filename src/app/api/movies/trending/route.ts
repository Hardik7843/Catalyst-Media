import { NextRequest, NextResponse } from "next/server";
import { getTrendingMovies } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeWindow =
      (searchParams.get("timeWindow") as "day" | "week") || "day";

    // fetch trending movies from TMDB
    const movies = await getTrendingMovies(timeWindow);

    return NextResponse.json({
      success: true,
      data: movies,
      timeWindow,
    });
  } catch (error) {
    console.error("Error in trending movies API:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch trending movies" },
      { status: 500 }
    );
  }
}
