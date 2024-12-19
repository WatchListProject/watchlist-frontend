import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import useLogin from './hooks/useLogin';
import { useEffect } from 'react';
import MyList from './pages/MyListPage';
import RecommendationsPage from './pages/RecommendationPage';

function App() {
    const { checkIsLoggedIn } = useLogin();

    useEffect(() => {
        checkIsLoggedIn(); // Verifica inicialmente al cargar la aplicación

        const interval = setInterval(() => {
            checkIsLoggedIn(); // Verifica periódicamente
        }, 60000); // Cada 60 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);
    return (
        <>
            <Router>
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/my-list" element={<MyList />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="AI-Recomendations" element={<RecommendationsPage/>} />
                    </Routes>
                </main>
            </Router>
        </>
    );
}

export default App;
