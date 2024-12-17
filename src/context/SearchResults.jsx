/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
export const SearchResultsContext = createContext();

// Proveedor del contexto
export const SearchResultsProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState(null);

  return (
    <SearchResultsContext.Provider
      value={{
        searchResults,
        setSearchResults
      }}
    >
      {children}
    </SearchResultsContext.Provider>
  );
};
