// MyList.jsx
import { useEffect } from 'react';
import MediaCard from '../components/MediaCard';
import useMediaList from '../hooks/useMediaList';
// import './MyList.css'; // Si necesitas estilos personalizados para MyList


const MyList = () => {
  const { mediaList, setMediaList, fetchMediaList, loading, error } = useMediaList(); // Obtener el estado y función del contexto


  useEffect(() => {
    fetchMediaList();
  }, [setMediaList]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!mediaList?.length) return <p>Your list is empty!</p>;

  return (
    <div className="myList">
      <h1>My List</h1>
      <div className="mediaCardContainer">
        {/* Crea una copia de mediaList y luego aplica reverse */}
        {([...mediaList]).reverse().map((media) => (
          <MediaCard
            key={media.id}
            media={{ ...media, onList: true }}
          />
        ))}
      </div>
    </div>
  );
};

export default MyList;

