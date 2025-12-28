import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const page = parseInt(searchParams.get("page") || "1", 10);

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const response = await searchMovies(query, page);

    return NextResponse.json({
      success: true,
      data: response.results,
      pagination: {
        currentPage: response.page,
        totalPages: response.total_pages,
        totalResults: response.total_results,
      },
      query,
    });
  } catch (error) {
    console.error("Error in search movies API:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search movies" },
      { status: 500 }
    );
  }
}
