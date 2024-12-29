import { useEffect } from 'react';
import MediaCard from '../components/MediaCard';
import useMediaList from '../hooks/useMediaList';
import useSearch from '../hooks/useSearch';
import './Searchpage.css'; // Corrected the case

const SearchPage = () => {
  const {
    title,
    setTitle,
    mediaType,
    setMediaType,
    isLoading,
    handleSubmit,
    searchResults,
    setSearchResults,
    error,
  } = useSearch();
  const { findMedia, fetchMediaList } = useMediaList();

  useEffect(() => {
    fetchMediaList();

    return () => {
      setSearchResults(null);
    };
  }, []);

  
  console.log("rendering search page");

  // Clase condicional para centrar el contenido si no hay resultados
  const pageClass = searchResults && searchResults.length > 0 ? 'search-page-with-results' : '';

  return (
    <div className={`search-page-container ${pageClass}`}>
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
