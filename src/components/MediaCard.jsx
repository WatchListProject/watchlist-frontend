import PropTypes from 'prop-types';
import './MediaCard.css';
import useMediaList from '../hooks/useMediaList';

const MediaCard = ({
  media = {
    releaseDate: 'Date not available',
    overview: 'Description not available',
  },
}) => {
  // Estado y acciones de contexto
  const { addMedia, removeMedia, updateSeenStatus } = useMediaList();

  // Lógica de añadir medio a la lista
  const handleAddToList = () => {
    console.log('handleAddToList');
    console.log({
      id: media.id,
      mediaType: media.mediaType,
      title: media.title || media.name,
      posterPath: media.posterPath,
      releaseDate: media.releaseDate || media.startDate,
      overview: media.overview,
      seen: false,
    });
    addMedia({
      id: media.id,
      mediaType: media.mediaType,
      title: media.title || media.name,
      posterPath: media.posterPath,
      releaseDate: media.releaseDate || media.startDate,
      overview: media.overview,
      seen: false,
    });
  };

  // Lógica de eliminar medio de la lista
  const handleRemoveFromList = () => {
    removeMedia(media.id);
  };

  // Lógica de cambio de estado de visto/no visto
  const handleSeenStatusChange = async (event) => {
    console.log('handleSeenStatusChange');
    const newSeenStatus = event.target.value === 'true';
    try {
      await updateSeenStatus(media.id, newSeenStatus);
    } catch (error) {
      console.error('Error updating seen status:', error.message);
      alert('Failed to update the seen status. Please try again.');
    }
  };



  // Renderizado de botones para agregar/eliminar del listado y cambiar el estado de visto
  const renderButtons = () => (
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
  );

  // Renderizado de contenido del medio (película o serie)
  const renderMediaContent = () => {
    if (media.mediaType === 'MOVIE') {
      return (
        <>
          <h3>{media.title}</h3>
          <p>{media.releaseDate || 'Date not available'}</p>
          <p>{media.overview || 'Description not available'}</p>
        </>
      );
    } else if (media.mediaType === 'SERIE') {
      return (
        <>
          <h3>{media.title}</h3>
          <p>
            {media.startDate || 'Start date not available'} -{' '}
            {media.endDate || 'End date not available'}
          </p>
          <p>{media.overview || 'Description not available'}</p>
        </>
      );
    }

    return <div>Error: Media type not valid ({media.mediaType})</div>;
  };

  return (
    <div key={media.id} className="mediaCard">
      <img src={media.posterPath} alt={media.title} />
      <div className="mediacard-right">
        <div>{renderMediaContent()}</div>
        <div className="options">
          {renderButtons()}
        </div>
        {media.addedAt && <div className="addedAt">
          Added At: {media.addedAt}
        </div>}
      </div>
    </div>
  );

};

// PropTypes para validación
MediaCard.propTypes = {
  media: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    posterPath: PropTypes.string.isRequired,
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
