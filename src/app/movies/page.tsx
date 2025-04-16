"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(
                    "https://streaming-availability.p.rapidapi.com/shows/movie/tt0111161",
                    {
                        headers: {
                            "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
                            "X-RapidAPI-Key": "b1169a7ec8mshcf2d28b68d0f3f6p10e6e0jsna7d1975f23b5",
                        },
                    }
                );
                console.log("Data:", response.data);
                setMovies(response.data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, []);

    return (
        <div>
            <h1>Movies</h1>
        </div>
    )

}