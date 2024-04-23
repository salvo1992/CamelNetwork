import React from 'react';

import Footer from '../component/footer/Footer';
import styles from './MainLayout.module.css';
import Sidebar from '../component/siderbar/Siderbar';
import CamelStories from '../component/CamelStories/CamelStories';


const MainLayoutUser = ({ children }) => {
    return (
        <>
        <div className={styles.body}>
            <Sidebar />
            {children}
            <CamelStories /> 
            </div>
            <Footer />
        </>
    )
}

export default MainLayoutUser