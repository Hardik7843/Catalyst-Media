import { NextRequest, NextResponse } from "next/server";
import { getMovieCredits } from "@/lib/tmdb";

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

    const credits = await getMovieCredits(movieId);

    return NextResponse.json({
      success: true,
      data: credits,
    });
  } catch (error) {
    console.error("Error in movie credits API:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch movie credits" },
      { status: 500 }
    );
  }
}
