import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/HeroSection.css';

const HeroSection = () => {
    // Función para scroll suave
    const scrollToFeatures = () => {
        document.querySelector('.features-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="hero-section">
            <div className="hero-overlay"></div>
            <Container className="text-center text-white hero-content">
                <h1 className="display-3 fw-bold mb-4 hero-title">
                    Su Experiencia de Lujo Comienza Aquí
                </h1>
                <p className="lead mb-5 hero-description">
                    Descubra el equilibrio perfecto entre confort moderno y hospitalidad tradicional
                    en nuestro exclusivo hotel ubicado en el corazón de la ciudad.
                </p>
                <div className="d-flex justify-content-center gap-3 hero-buttons">
                    <Button as={Link} to="/habitaciones" variant="primary" size="lg" className="hero-btn">
                        Explorar Habitaciones
                    </Button>
                    <Button as={Link} to="/contacto" variant="outline-light" size="lg" className="hero-btn">
                        Contáctenos
                    </Button>
                </div>
            </Container>
            <div className="scroll-indicator" onClick={scrollToFeatures}>
                <i className="bi bi-chevron-down text-white fs-4"></i>
            </div>
        </div>
    );
};

export default HeroSection;