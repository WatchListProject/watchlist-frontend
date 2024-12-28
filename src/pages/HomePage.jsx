import { Link } from 'react-router-dom';
import './HomePage.css';


const HomePage = () => {
  return (
    <div className="homePage">
      <header className="homeHeader">
        <h1>Welcome to the Media Search App</h1>
        <p>Your ultimate tool to explore, organize, and enjoy your favorite movies and series!</p>
      </header>

      <section className="homeSection">
        <div className="homeFeature">
        <img src="/images/search-media.png" alt="Search Media" className="featureImage" />
          <div>
            <h2>Discover Media</h2>
            <p>Search for your favorite movies and series using our powerful search engine. Stay updated with the latest releases and find hidden gems to enjoy.</p>
            <Link to="/search" className="featureLink">Search for media</Link>
          </div>
        </div>

        <div className="homeFeature">
          <img src="images\search-media.png" alt="Add to List" className="featureImage" />
          <div>
            <h2>Organize Your Media</h2>
            <p>Create a personalized list of movies and series. Keep track of what you’ve watched and what’s next on your list!</p>
            <Link to="/search" className="featureLink">Go to Your List</Link>
          </div>
        </div>

        <div className="homeFeature">
          <img src="images\search-media.png" alt="AI Recommendations" className="featureImage" />
          <div>
            <h2>Get AI Recommendations</h2>
            <p>Leverage the power of AI to receive personalized movie and series recommendations based on your watchlist.</p>
            <Link to="/AI-Recomendations" className="featureLink">Get Recommendations</Link> 
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
