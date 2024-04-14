import React from 'react'
import MainLayout from '../layouts/MainLayout'
import MainContent from '../component/HomePage/MainContent'
import { jwtDecode } from "jwt-decode";

const Home = () => {
    const session = JSON.parse(localStorage.getItem('auth'))
    const decodedSession = jwtDecode(session)

    return (
        <MainLayout>
            <MainContent />
        </MainLayout>
    )
}

export default Home