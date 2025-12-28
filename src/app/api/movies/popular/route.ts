import { NextRequest, NextResponse } from "next/server";
import { getPopularMovies } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);

    const response = await getPopularMovies(page);

    return NextResponse.json({
      success: true,
      data: response.results,
      pagination: {
        currentPage: response.page,
        totalPages: response.total_pages,
        totalResults: response.total_results,
      },
    });
  } catch (error) {
    console.error("Error in popular movies API:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch popular movies" },
      { status: 500 }
    );
  }
}
