import { useEffect } from 'react';
import MediaCard from '../components/MediaCard';
import useMediaList from '../hooks/useMediaList';
import './MyListPage.css';
import useLogin from '../hooks/useLogin';
import { Link } from 'react-router-dom';
import useFilters from '../hooks/useFilters';


const MyList = () => {
  const { mediaList, fetchMediaList, loading, error } = useMediaList();
  const { isLoggedIn, handleLoginWithGoogle } = useLogin();

  console.log(isLoggedIn);

  /// filters
  const { mediaType, setMediaType, seenStatus, setSeenStatus, orderBy, setOrderBy, ascendent, setAscendent, filterMedia } = useFilters();

  useEffect(() => {
    if (isLoggedIn) {
      console.log("fetching media list");
      fetchMediaList();
    }

  }, [isLoggedIn]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const renderMediaList = () => {
    return (
      <div className="myList">
        <h1>My List</h1>

        <div className="filters">
          <div>
            <select
              name="mediaType"
              value={mediaType}
              onChange={(event) => setMediaType(event.target.value)}
            >
              <option value="All">All Media Types</option>
              <option value="MOVIE">Movie</option>
              <option value="SERIE">Serie</option>
            </select>
          </div>

          <div>
            <select
              name="seenStatus"
              value={seenStatus}
              onChange={(event) => setSeenStatus(event.target.value)}
            >
              <option value="All">Seen and Not Seen</option>
              <option value="Not Seen">Not Seen</option>
              <option value="Seen">Seen</option>
            </select>
          </div>

          <div>
            <select
              name="orderBy"
              value={orderBy}
              onChange={(event) => setOrderBy(event.target.value)}
            >
              <option value="addedAt">Added Date</option>
              <option value="releaseDate">Release Date</option>
            </select>
          </div>

          <div>
            <select
              name="order"
              value={ascendent ? 'asc' : 'desc'}
              onChange={(event) => setAscendent(event.target.value === 'asc')}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        <div className="mediaCardContainer">
          {filterMedia(mediaList, {
            orderBy,
            ascendent,
            seenStatus,
            mediaType,
          }).map((media) => (
            <MediaCard key={media.id} media={{ ...media, onList: true }} />
          ))}
        </div>
      </div>
    );
  };

  return (
    isLoggedIn ? renderMediaList()
      :
      <>
        <h2>You need to be logged in to see your list</h2>
        <Link className="login-button" onClick={handleLoginWithGoogle}>Sign in with Google</Link>
      </>
  );
};

export default MyList;
