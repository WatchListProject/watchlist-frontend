import { useState } from "react";
import "./RecommendationsPage.css";
import Cookies from "js-cookie";

const RecommendationsPage = () => {
    const [recommendations, setRecommendations] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecommendations = async () => {
        setLoading(true);
        setError(null);
        setRecommendations(""); // Limpia recomendaciones anteriores
        try {
            const token = Cookies.get("token");
            const response = await fetch("http://localhost:3001/user_media/recomendations", {
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

            // Si el endpoint retorna un string, lo guardamos directamente
            setRecommendations(data.recommendation.split('%') || "No recommendations available.");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recommendationsPage">
            <h1>AI Recommendations</h1>
            <p>
                Welcome to the recommendations page! Here, we use artificial intelligence
                to generate suggestions based on your media list. Just click the button
                below to get started.
            </p>

            <button onClick={fetchRecommendations} disabled={loading}>
                {loading ? "Loading..." : "Generate Recommendations"}
            </button>

            {error && <p className="error">Error: {error}</p>}

            {loading && !recommendations && <p>Generating your recommendations. Please wait...</p>}

            {recommendations && (
                <div className="recommendationsResult">
                    <h2>Your Recommendations</h2>
                    <ul>
                        {recommendations.map((recommendation, index) => (
                            <li key={index}>{recommendation}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RecommendationsPage;
