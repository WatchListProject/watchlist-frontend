import { useContext, useEffect, useState } from "react";
import { SearchResultsContext } from "../context/SearchResults";

const VITE_WATCHLIST_API_URL = import.meta.env.VITE_WATCHLIST_API_URL;
export default function useSearch() {
    const [title, setTitle] = useState(''); 
    const { searchResults, setSearchResults } = useContext(SearchResultsContext);
    const [error, setError] = useState(null);
    const [mediaType, setMediaType] = useState('MOVIE');
    const [isLoading, setIsLoading] = useState(false);

    const fetchMedia = async (name, type) => {
        setIsLoading(true);
        setError(null);

        try {
            const url = `${VITE_WATCHLIST_API_URL}/${type.toLowerCase() === 'movie' ? 'search_movie' : 'search_serie'}?name=${name}`;
            console.log(url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch search for ${type} "${name}"`);
            }

            const data = await response.json();
            console.log(data);

            if (Object.keys(data).length === 0) {
                throw new Error(`No results for ${type} "${name}"`);
            }

            setSearchResults(data.moviesList || data.seriesList);
        } catch (err) {
            setError(err.message);
            setSearchResults(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (!title.trim()) {
            setError('Please enter a valid title.');
            return;
        }
        fetchMedia(title, mediaType);
    };

    useEffect(() => {
        if (title.trim()) {
            fetchMedia(title, mediaType);
        }
    }, [mediaType]);

    return { title, setTitle, mediaType, setMediaType, isLoading, handleSearch, searchResults, setSearchResults, error };
}