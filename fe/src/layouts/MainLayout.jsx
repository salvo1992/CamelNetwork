import React from 'react'
import NavigationBar from '../component/navigationBar/NavigationBar'
import Footer from '../component/footer/Footer'

const MainLayout = ({ children }) => {
    return (
        <>
            <NavigationBar />
            {children}
            <Footer />
        </>
    )
}

export default MainLayout