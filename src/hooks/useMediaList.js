/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { MediaListContext } from "../context/MediaList";
import Cookies from 'js-cookie';
import useSearch from "./useSearch";

export default function useMediaList() {
    const { mediaList, setMediaList } = useContext(MediaListContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { searchResults, setSearchResults } = useSearch();


    const fetchMediaList = async () => {
        const token = Cookies.get('token');
        /// Prevents unnecessary fetching
        console.log(`media list len > 0?: ${mediaList.length}`);
        console.log(`TOKEN? ${!!token}`);
        console.log(token);
        if (mediaList.length > 0) {
            console.log('Medialist fetch is not necessary');
            return;
        }
        try {
            console.log('Fetching media list');
            setLoading(true);
            const response = await fetch('http://localhost:3001/user_media', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch media list');
            }

            const data = await response.json();
            console.log('fetching http://localhost:3001/user_media');
            setMediaList(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const findMedia = (mediaId) => {
        return mediaList.find((media) => media.id === mediaId);
    };

    const addMedia = async (newMedia) => {
        const token = Cookies.get('token');
        try {
            // Add media request
            const response = await fetch('http://localhost:3001/user_media', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    mediaId: newMedia.id,
                    mediaType: newMedia.mediaType
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add media');
            }


            // Add to my list and set onList=true in search results 
            newMedia.onList = true;
            const newMediaList = [...mediaList, newMedia];
            setMediaList(newMediaList);
            setSearchResults((prevResults) =>
                prevResults.map((media) =>
                    media.id === newMedia.id ? { ...media, onList: true } : media
                )
            );

            console.log("Media added:", newMedia);
        } catch (err) {
            setError(err.message);
        }
    };


    const removeMedia = async (mediaId) => {
        const token = Cookies.get('token');
        console.log(token);
        console.log(mediaId);
        try {
            // Remove media request
            const response = await fetch(`http://localhost:3001/user_media`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ mediaId: mediaId }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove media');
            }


            // Remove from My list and set onList=false in search results
            const newMediaList = structuredClone(mediaList).filter(element => element.id !== mediaId);
            setMediaList(newMediaList);
            setSearchResults((prevResults) =>
                prevResults?.map((media) =>
                    media.id === mediaId ? { ...media, onList: false } : media
                )
            );


        } catch (err) {
            setError(err.message);
        }
    };

    const updateSeenStatus = async (mediaId, seenStatus) => {
        const token = Cookies.get('token');
        console.log('updateSeenStatus');
        console.log(seenStatus);
        try {
            // Update status request
            const response = await fetch('http://localhost:3001/user_media', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    mediaId,
                    seenStatus,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update seen status');
            }
            console.log(`Seens ${seenStatus} updated successfully for ${mediaId}`); 
            // Update local state My List 
            setMediaList((prevList) =>
                prevList.map((media) =>
                    media.id === mediaId ? { ...media, seen: seenStatus } : media
                )
            );

        } catch (err) {
            setError(err.message);
            throw err;
        }
    };


    return {
        mediaList,
        setMediaList,
        addMedia,
        removeMedia,
        findMedia,
        error,
        loading,
        updateSeenStatus,
        fetchMediaList
    };
}
