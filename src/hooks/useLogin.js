import { useContext, useState } from "react";
import Cookies from 'js-cookie';
import { UserContext } from "../context/User"; // Corrected the case
import { jwtDecode } from "jwt-decode";
import useMediaList from "./useMediaList";
import useSearch from "./useSearch";
import { signInWithGoogle } from "../auth/firebaseAuth";

const VITE_WATCHLIST_API_URL = import.meta.env.VITE_WATCHLIST_API_URL;
export default function useLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const { setMediaList } = useMediaList();
    const { setSearchResults } = useSearch();
    /// TO-DO: Redirect to home or my list if the user is already logged in 



    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`${VITE_WATCHLIST_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {

                Cookies.set('token',
                    data.token
                    //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkhlbGxvQGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2YjY5ZWU0MmRkOTg5MGY3YzAzYjZmOSIsImF1ZCI6IldhdGNobGlzdCIsImlhdCI6MTczMzUwMDkxMSwiZXhwIjoxNzMzNTA0NTExfQ.yOqtC3DQzeXVBWtUAFbFwsG7Ce-6EnhPn8lP9sLau6o'
                    , {
                        secure: true, 
                        sameSite: 'strict', 
                        expires: 1, /// TO-DO: SET the expiration to the token exp
                    });
                setIsLoggedIn(true);

                console.log('Token guardado en cookie:', data.token);

                alert("Login successful!");

                // Redirige o realiza alguna acción
            } else {
                // Muestra el mensaje de error desde el servidor

                setError(data.statusCode === 401 ? "Incorrect credentials" : (data.statusCode === 404 ? "User not found" : "Login failed. Please try again."));
            }
        } catch (err) {
            // Error de red u otros problemas
            console.error(err);
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false); // Oculta estado de carga
        }
    };

    const handleLoginWithGoogle = async () => {
        try {
            const userCredential = await signInWithGoogle()

            console.log(userCredential);

            Cookies.set('token',
                userCredential.idToken
                , {
                    secure: true, 
                    sameSite: 'strict', 
                    expires: 1,  /// TO-DO: SET the expiration to the token exp
                });
            setIsLoggedIn(true);

            console.log('Token guardado en cookie:', userCredential.idToken);

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    }

    const handleLogout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
        setMediaList([]);
        setSearchResults([]);
        console.log('Sesión cerrada, token eliminado.');
    };

    const checkIsLoggedIn = () => {
        const token = Cookies.get('token');

        if (!token) {
            setIsLoggedIn(false);
            console.log("JWT NOT FOUND");
            return false;
        }

        try {
            // Usar jwt-decode para decodificar el token
            const payload = jwtDecode(token);

            // Verificar si el token ha expirado
            const isExpired = payload.exp * 1000 < Date.now();
            if (isExpired) {
                Cookies.remove('token'); // Eliminar la cookie si ha expirado
                setIsLoggedIn(false);
                setMediaList([]);
                setSearchResults(null);
                console.log(`JWT EXPIRED: ${JSON.stringify(payload)}`);
                return false;
            }
            console.log(`JWT STILL VALID: ${JSON.stringify(payload)}`);

            setIsLoggedIn(true); // El token es válido
            return true;
        } catch (err) {
            console.error('Error al decodificar el token:', err);
            setIsLoggedIn(false); // Cualquier error invalida el estado de autenticación
            return false;
        }
    };



    return { isLoggedIn, checkIsLoggedIn, handleLogin, handleLoginWithGoogle, handleLogout, setEmail, setPassword, error, loading };
};
