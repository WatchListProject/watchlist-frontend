import { useEffect, useState } from 'react';
import MediaCard from '../components/MediaCard';
import useMediaList from '../hooks/useMediaList';
import useSearch from '../hooks/useSearch';
import './Searchpage.css';
import { useNavigate, useParams } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const SearchPage = () => {

  const { mediaType: urlMediaType, query: urlQuery } = useParams();
  const navigate = useNavigate();

  /// Custom Hooks
  const {
    title,
    setTitle,
    mediaType,
    setMediaType,
    isLoading,
    handleSearch,
    searchResults,
    setSearchResults,
    error,
  } = useSearch();
  const { findMedia, fetchMediaList } = useMediaList();
  const { isLoggedIn } = useLogin


  /// Effects
  useEffect(() => {
    console.log('SEARCH PAGE useEffect isLoggedIn');
    if (isLoggedIn) {
      console.log("fetching media list");
      fetchMediaList();
    }

  }, [isLoggedIn]);

  useEffect(() => {
    fetchMediaList();

    return () => {
      setSearchResults(null);
    };
  }, []);

  /// Set states by params only on first render
  const [firstRender, setFirstRender] = useState(true);
  if (firstRender &&urlMediaType && urlQuery && title !== urlQuery) {
    setTitle(urlQuery);
    setMediaType(urlMediaType);
    setFirstRender(false);
    handleSearch({ preventDefault: () => { } });
  }
  


  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim()) {
      navigate(`/search/${mediaType}/${title}`);
    }
    handleSearch({ preventDefault: () => { } });
  };



  return (
    <div className={`search-page-container`}>
      <h1>Search Media</h1>
      <form className="search-form-container" onSubmit={handleSubmit}>
        <div className="search-form">
          <input
            name="title"
            placeholder="Media Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <div className="search-form-row">
            <select
              className='select-media-type'
              name="mediaType"
              value={mediaType}
              onChange={(event) => setMediaType(event.target.value)}
            >
              <option value="MOVIE">Movie</option>
              <option value="SERIE">Serie</option>
            </select>
            <button className="search-button" type="submit">Search</button>
          </div>
        </div>
      </form>

      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : searchResults && searchResults.length > 0 ? (
        searchResults.map((item) => {
          const mediaFromList = findMedia(item.id);
          return (
            mediaFromList !== undefined ?
              <MediaCard key={item.id} media={{ ...mediaFromList, onList: true }} /> :
              <MediaCard key={item.id} media={{ ...item, mediaType, onList: false }} />
          );
        })
      ) : (
        searchResults && <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
