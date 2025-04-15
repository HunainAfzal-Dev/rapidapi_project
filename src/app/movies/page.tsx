"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function FetchMoives() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const FetchMovies = async () => {
            try {
                const res = await axios.get("/api/movies");
                console.log("API Data:", res.data);
                setMovies(res.data || []);

            } catch (err: any) {
                console.error(err);
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        FetchMovies();
    }, []);

}