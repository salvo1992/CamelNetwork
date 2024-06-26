import React from 'react';
import NavigationBar from '../component/navigationBar/NavigationBar';
import Footer from '../component/footer/Footer';
import styles from './MainLayout.module.css';
import Sidebar from '../component/siderbar/Siderbar';
import CamelStories from '../component/CamelStories/CamelStories';


const MainLayout = ({ children }) => {
    return (
        <>
        <div className={styles.body}>
            <NavigationBar />
            <Sidebar />
            {children}
            <CamelStories /> 
            </div>
            <Footer />
        </>
    )
}

export default MainLayout