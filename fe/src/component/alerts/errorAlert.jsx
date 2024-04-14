import React from 'react';

const ErrorAlert = ({ message }) => {
    return (
        <div className="alert alert-danger mt-5 mb-5" role="alert">
            {message}
        </div>
    );
};

export default ErrorAlert;