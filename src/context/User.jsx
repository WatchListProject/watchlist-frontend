/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from 'react';
import Cookies from 'js-cookie';

// Crea el contexto y luego el proveedor
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
