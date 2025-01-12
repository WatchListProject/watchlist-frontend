import Cookies from "js-cookie";
import { useState } from "react";

const VITE_WATCHLIST_API_URL = import.meta.env.VITE_WATCHLIST_API_URL;

export default function useRecommendations() {
    const [recommendations, setRecommendations] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecommendations = async () => {
        setLoading(true);
        setError(null);
        setRecommendations("");
        try {
            const token = Cookies.get("token");
            const response = await fetch(`${VITE_WATCHLIST_API_URL}/user_media/recomendations`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch recommendations.");
            }

            const data = await response.json();
            console.log("Received recommendations:", data);

            setRecommendations(data.recommendation.split('%') || "No recommendations available.");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return { fetchRecommendations, recommendations, loading, error };
};