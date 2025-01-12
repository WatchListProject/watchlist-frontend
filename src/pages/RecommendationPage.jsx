import "./RecommendationsPage.css";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";
import useRecommendations from "../hooks/useRecommendations";


const RecommendationsPage = () => {
    const { fetchRecommendations, recommendations, loading, error } = useRecommendations();
    const { isLoggedIn, handleLoginWithGoogle } = useLogin();

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
