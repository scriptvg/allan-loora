import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const PublicLayout = () => {
    return (
        <>
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default PublicLayout;
