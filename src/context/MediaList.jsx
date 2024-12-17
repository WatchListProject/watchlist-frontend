/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
export const MediaListContext = createContext();

// Proveedor del contexto
export const MediaListProvider = ({ children }) => {
  const [mediaList, setMediaList] = useState([]);

  return (
    <MediaListContext.Provider
      value={{
        mediaList,
        setMediaList
      }}
    >
      {children}
    </MediaListContext.Provider>
  );
};
