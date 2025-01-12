import { parse } from "date-fns";
import { useState } from "react";

export default function useFilters() {
    const [mediaType, setMediaType] = useState('All');
    const [seenStatus, setSeenStatus] = useState('All');
    const [orderBy, setOrderBy] = useState('addedAt');
    const [ascendent, setAscendent] = useState(false);

    const parseDate = (dateString) => {
        if (!dateString) return new Date(9999, 11, 31);
        return parse(dateString, 'dd/MM/yyyy HH:mm', new Date());
      };
    
      const filterMedia = (list, { orderBy = 'addedAt', ascendent, seenStatus, mediaType }) => {
        const filteredList = list.filter((media) => {
          if (media.mediaType !== mediaType && mediaType !== 'All') {
            return false;
          }
    
          if (seenStatus === 'Not Seen') {
            return media.seen === false;
          }
          if (seenStatus === 'Seen') {
            return media.seen === true;
          }
          return true;
        });
    
        const orderedList = filteredList
          .slice()
          .sort((a, b) => {
            const dateA = a[orderBy] ? parseDate(a[orderBy]) : parseDate(a.startDate);
            const dateB = b[orderBy] ? parseDate(b[orderBy]) : parseDate(b.startDate);
    
            return ascendent ? dateA - dateB : dateB - dateA;
          });
    
        return orderedList;
      };
    

    return { mediaType, setMediaType, seenStatus, setSeenStatus, orderBy, setOrderBy, ascendent, setAscendent, filterMedia };
};