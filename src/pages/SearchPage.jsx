import { useEffect } from 'react';
import MediaCard from '../components/MediaCard';
import useMediaList from '../hooks/useMediaList';
import useSearch from '../hooks/useSearch';

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
  return (
    <div className="search-page">
      <h1>Search Media</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Media Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <select
          name="mediaType"
          value={mediaType}
          onChange={(event) => setMediaType(event.target.value)}
        >
          <option value="MOVIE">Movie</option>
          <option value="SERIE">Serie</option>
        </select>
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : searchResults && searchResults.length > 0 ? (
        searchResults.map((item) => {
          const mediaFromList = findMedia(item.id);
          return (mediaFromList !== undefined ?
            <MediaCard key={item.id} media={{ ...mediaFromList, onList: true }} />
            :
            <MediaCard key={item.id} media={{ ...item, mediaType, onList: false }} />
          )
        }
        )
      ) : (
        searchResults && <p>No results found.</p>
      )}

    </div>
  );
};

export default SearchPage;
