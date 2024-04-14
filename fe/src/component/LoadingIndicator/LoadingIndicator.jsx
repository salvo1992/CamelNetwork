import React from 'react';
import styles from './spinner.module.css'

const LoadingIndicator = () => {
    return (
        <div className={`d-flex justify-content-center align-items-center ${styles.spinnerContainer}`}>
            <div className="spinner-grow text-primary" role="status"></div>
        </div>
    );
};

export default LoadingIndicator;