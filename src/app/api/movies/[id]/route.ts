import { NextRequest, NextResponse } from "next/server";
import { getMovieDetails } from "@/lib/tmdb";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const movieId = parseInt(id, 10);

    if (isNaN(movieId)) {
      return NextResponse.json(
        { success: false, error: "Invalid movie ID" },
        { status: 400 }
      );
    }

    const movie = await getMovieDetails(movieId);

    return NextResponse.json({
      success: true,
      data: movie,
    });
  } catch (error) {
    console.error("Error in movie details API:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch movie details" },
      { status: 500 }
    );
  }
}
