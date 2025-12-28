import { NextRequest, NextResponse } from "next/server";
import { getSimilarMovies } from "@/lib/tmdb";

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

    const movies = await getSimilarMovies(movieId);

    return NextResponse.json({
      success: true,
      data: movies,
    });
  } catch (error) {
    console.error("Error in similar movies API:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch similar movies" },
      { status: 500 }
    );
  }
}
