export const runtime = "nodejs";

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const apiKey = process.env.RAPID_API_KEY;

    if (!apiKey) {
      console.error("API key missing");
      return NextResponse.json({ error: "API key not set" }, { status: 500 });
    }

    const response = await axios.get(
      "https://streaming-availability.p.rapidapi.com/v2/get/basic",
      {
        params: {
          output_language: "en",
          imdb_id: "tt0111161",
        },
        headers: {
          "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
          "X-RapidAPI-Key":
            "b1169a7ec8mshcf2d28b68d0f3f6p10e6e0jsna7d1975f23b5",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("API call failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
