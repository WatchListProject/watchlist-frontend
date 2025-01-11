import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import useLogin from '../hooks/useLogin';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const { isLoggedIn, handleLogout, handleLoginWithGoogle } = useLogin();


    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">WatchList</Link>
                <button className="menu-toggle" onClick={toggleMenu}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </button>

                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <li>
                        <Link to="/search" onClick={toggleMenu}>Search</Link>
                    </li>
                    <li>
                        <Link to="/my-list" onClick={toggleMenu}>My List</Link>
                    </li>
                    <li>
                        <Link to="/AI-Recomendations" onClick={toggleMenu}>AI Recomendations</Link>
                    </li>
                    {isLoggedIn ?
                        <li>
                            <Link className="login-button" onClick={handleLogout}>Logout</Link>
                        </li> :
                        <li>
                            <Link className="login-button" onClick={handleLoginWithGoogle}>Sign in with Google</Link>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
