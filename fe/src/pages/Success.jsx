import React, { useEffect } from 'react';

const Success = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    useEffect(() => {
        if (token) {
            localStorage.setItem('auth', JSON.stringify(token));
        }
    }, [token]);

    return (
        <div>
            success page
        </div>
    );
};

export default Success;

