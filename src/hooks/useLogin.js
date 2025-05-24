import { useContext, useState } from "react";
import Cookies from 'js-cookie';
import { UserContext } from "../context/User";
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
    const { setMediaList, fetchMediaList } = useMediaList();
    const { setSearchResults } = useSearch();


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
                    , {
                        secure: true,
                        sameSite: 'strict',
                        expires: 1, /// TO-DO: SET the expiration to the token exp
                    });
                setIsLoggedIn(true);
                alert("Login successful!");

            } else {
                setError(data.statusCode === 401 ? "Incorrect credentials" : (data.statusCode === 404 ? "User not found" : "Login failed. Please try again."));
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleLoginWithGoogle = async () => {
        try {
            const userCredential = await signInWithGoogle()

            Cookies.set('token',
                userCredential.idToken
                , {
                    secure: true,
                    sameSite: 'strict',
                    expires: 1,  /// TO-DO: SET the expiration to the token exp
                });
            setIsLoggedIn(true);
            fetchMediaList();
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    }

    const handleLogout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
        setMediaList([]);
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
            const payload = jwtDecode(token);

            const isExpired = payload.exp * 1000 < Date.now();
            if (isExpired) {
                Cookies.remove('token');
                setIsLoggedIn(false);
                setMediaList([]);
                setSearchResults(null);
                return false;
            }

            setIsLoggedIn(true);
            return true;
        } catch (err) {
            console.error('Error al decodificar el token:', err);
            setIsLoggedIn(false);
            return false;
        }
    };


    return { isLoggedIn, checkIsLoggedIn, handleLogin, handleLoginWithGoogle, handleLogout, setEmail, setPassword, error, loading };
};
