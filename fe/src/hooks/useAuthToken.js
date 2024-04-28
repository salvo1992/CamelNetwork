import { useState, useEffect } from 'react';

const useAuthToken = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('auth');
       

        if (tokenFromStorage) {
            const parsedToken = JSON.parse(tokenFromStorage);
           
            setToken(parsedToken);
        }
    }, []);

    return token;
};

export default useAuthToken;



