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
        checkIsLoggedIn();

        const interval = setInterval(() => {
            checkIsLoggedIn();
        }, 60000);

        return () => clearInterval(interval);
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
                        <Route path="/search/:mediaType/:query" element={<SearchPage />} />
                        
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="AI-Recomendations" element={<RecommendationsPage />} />
                    </Routes>
                </main>
            </Router>
        </>
    );
}

export default App;
