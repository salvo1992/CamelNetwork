import { useState, useEffect } from 'react';

const useAuthToken = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Fetch the token once and set it
        const tokenFromStorage = localStorage.getItem('auth');
        if (tokenFromStorage) {
            setToken(JSON.parse(tokenFromStorage));
        }
    }, []); // Empty dependency array ensures this runs once on mount

    return token;
};

export default useAuthToken;
