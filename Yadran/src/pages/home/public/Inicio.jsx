import React from 'react';
import Header from '../../../components/header/Header.jsx';
import Footer from '../../../components/footer/Footer.jsx';

// Componentes para la página de inicio
import HeroSection from '../../../components/home/HeroSection.jsx';
import FeaturesSection from '../../../components/home/FeaturesSection.jsx';
import RoomsPreview from '../../../components/home/RoomsPreview.jsx';
import CtaSection from '../../../components/home/CtaSection.jsx';

import './styles/Inicio.css';

function Inicio() {
    return (
        <>
            <Header />
            <div className="home-page">
                <HeroSection />
                <FeaturesSection />
                <RoomsPreview />
                <CtaSection />
            </div>
            <Footer />
        </>
    );
}

export default Inicio;