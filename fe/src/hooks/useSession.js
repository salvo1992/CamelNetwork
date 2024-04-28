import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Modifica questa riga

const useSession = () => {
    const session = JSON.parse(localStorage.getItem('auth'));
    const decodedSession = session ? jwtDecode(session) : null; // Modifica questa riga

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!session) {
            navigate('/', { replace: true })
        }

        if (session && location.pathname !== '/') {
            return;
        }
        navigate('/home', { replace: true })

    }, [navigate, session, location]); // Aggiungi `location` alla dipendenza dell'effetto

    return decodedSession;
};

export default useSession;

