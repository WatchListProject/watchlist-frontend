import PropTypes from 'prop-types';
import './MediaCard.css';
import useMediaList from '../hooks/useMediaList';
import { FaFilm, FaTv } from 'react-icons/fa';
import useLogin from '../hooks/useLogin';

const MediaCard = ({
  media = {
    releaseDate: 'Date not available',
    overview: 'Description not available',
  },
}) => {
  const { addMedia, removeMedia, updateSeenStatus } = useMediaList();
  const { isLoggedIn, handleLoginWithGoogle } = useLogin();

  const handleAddToList = () => {
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    addMedia({
      id: media.id,
      mediaType: media.mediaType,
      title: media.title || media.name,
      posterPath: media.posterPath,
      releaseDate: media.releaseDate || media.startDate,
      overview: media.overview,
      seen: false,
      addedAt: formatDate(new Date())
    });
  };


  const handleRemoveFromList = () => {
    removeMedia(media.id);
  };

  const handleSeenStatusChange = async (event) => {
    const newSeenStatus = event.target.value === 'true';
    try {
      await updateSeenStatus(media.id, newSeenStatus);
    } catch (error) {
      console.error('Error updating seen status:', error.message);
      alert('Failed to update the seen status. Please try again.');
    }
  };


  const formatDateWithoutTime = (dateString) => {
    if (dateString === undefined)
      return 'Date not available';
    const datePart = dateString.split(' ')[0];
    return datePart;
  };

  const renderButtons = () => {
    return (
      isLoggedIn ?
        <div className="mediaButtons">
          {media.onList ? (
            <button className="removeButton" onClick={handleRemoveFromList}>
              Remove from My List
            </button>
          ) : (
            <button className="addButton" onClick={handleAddToList}>
              Add to My List
            </button>
          )}
          {media.onList && (
            <div className="seenSelector">
              <select
                id={`seen-${media.id}`}
                value={media.seen ? 'true' : 'false'}
                onChange={handleSeenStatusChange}
              >
                <option value="false">Not Seen</option>
                <option value="true">Seen</option>
              </select>
            </div>
          )}
        </div>
        :
        <button className="addButton" onClick={handleLoginWithGoogle}>
          Sign in and add to My List
        </button>
    );
  }


  const renderMediaContent = () => {
    const icon =
      media.mediaType === 'MOVIE' ? (
        <FaFilm className="mediaIcon" />
      ) : media.mediaType === 'SERIE' ? (
        <FaTv className="mediaIcon" />
      ) : null;

    return (
      <>
        <h3>
          {icon}
          {media.title}
        </h3>
        {media.mediaType === 'MOVIE' ? (
          <p>{formatDateWithoutTime(media.releaseDate) || 'Date not available'}</p>
        ) : (
          <p>
            {formatDateWithoutTime(media.startDate) || 'Start date not available'} -{' '}
            {formatDateWithoutTime(media.endDate) || 'End date not available'}
          </p>
        )}
        <p>{media.overview || 'Description not available'}</p>
      </>
    );
  };

  return (
    <div key={media.id} className="mediaCard">
      <img src={media.posterPath} alt={media.title} />
      <div className="mediacard-right">
        <div>{renderMediaContent()}</div>
        <div className="options">{renderButtons()}</div>
        {media.addedAt && (
          <div className="addedAt">Added At: {media.addedAt}</div>
        )}
      </div>
    </div>
  );
};

MediaCard.propTypes = {
  media: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    posterPath: PropTypes.string,
    mediaType: PropTypes.string.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    releaseDate: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    overview: PropTypes.string,
    onList: PropTypes.bool,
    seen: PropTypes.bool,
    addedAt: PropTypes.string,
  }).isRequired,
};

export default MediaCard;
