import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "https://linkedin-data-api.p.rapidapi.com/get-company-posts",
      {
        params: {
          username: "microsoft",
          start: 0,
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "linkedin-data-api.p.rapidapi.com",
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
