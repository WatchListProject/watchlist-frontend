// MyList.jsx
import { useEffect } from 'react';
import { parse } from 'date-fns'; 
import MediaCard from '../components/MediaCard';
import useMediaList from '../hooks/useMediaList';

const MyList = () => {
  const { mediaList, fetchMediaList, loading, error } = useMediaList();

  useEffect(() => {
    fetchMediaList();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!mediaList?.length) return <p>Your list is empty!</p>;


  const parseDate = (dateString) => {
    if (!dateString) return new Date(9999, 11, 31); 
    return parse(dateString, 'dd/MM/yyyy HH:mm', new Date());
  };

  const filterMedia = (list, { orderBy = 'releaseDate', ascendent = false, show = 'All'}) => {
    const filteredList = list.filter((media) => {
      if (show === "Not Seen") return media.seen === false;
      if (show === "Seen") return media.seen === true;
      return true; 
    });
  
    const orderedList = filteredList
      .slice()
      .sort((a, b) => {
        const dateA = a[orderBy] ? parseDate(a[orderBy]) : parseDate(a.startDate);
        const dateB = b[orderBy] ? parseDate(b[orderBy]) : parseDate(b.startDate);
  
        console.log(`Comparing: ${dateA} (${a[orderBy]}) vs ${dateB} (${b[orderBy]})`);
        const result = ascendent ? dateA - dateB : dateB - dateA;
        console.log(`Result of comparison: ${result > 0 ? `${a.title} < ${b.title}` : result < 0 ? `${a.title} > ${b.title}` : "A == B"}`);
        return result;
      });
  
    console.log("Filtered and Ordered list:", orderedList);
    return orderedList;
  };
  

  return (
    <div className="myList">
      <h1>My List</h1>
      <div className="mediaCardContainer">
        {filterMedia(mediaList, {
          orderBy: 'releaseDate',
          ascendent: false,
          show: 'Not Seen' 
        }).map((media) => (
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
