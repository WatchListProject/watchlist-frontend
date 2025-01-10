/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();



export function UserProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = Cookies.get('token');
        console.log(`TOKEN? ${!!token}`);
        return !!token;
    });



    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}
