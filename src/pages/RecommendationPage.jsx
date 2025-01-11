import { useState } from "react";
import "./RecommendationsPage.css";
import Cookies from "js-cookie";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";

const VITE_WATCHLIST_API_URL = import.meta.env.VITE_WATCHLIST_API_URL;
const RecommendationsPage = () => {
    const [recommendations, setRecommendations] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { isLoggedIn, handleLoginWithGoogle } = useLogin();

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

    return (
        isLoggedIn ?
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
            :
            <>
                <h2>You need to be logged in to generate recomendations</h2>
                <Link className="login-button" onClick={handleLoginWithGoogle}>Sign in with Google</Link>
            </>


    );
};

export default RecommendationsPage;
