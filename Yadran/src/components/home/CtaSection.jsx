import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/CtaSection.css';

const CtaSection = () => {
    return (
        <Container className="mb-5">
            <div className="cta-section">
                <div className="cta-decoration-1"></div>
                <div className="cta-decoration-2"></div>
                <h2 className="cta-title">Reserve su estancia ahora</h2>
                <p className="cta-description">
                    Disfrute de tarifas especiales y promociones exclusivas reservando directamente con nosotros.
                    Garantizamos el mejor precio y beneficios adicionales para su estancia.
                </p>
                <Button as={Link} to="/habitaciones" variant="light" size="lg" className="cta-button">
                    Comprobar Disponibilidad
                </Button>
            </div>
        </Container>
    );
};

export default CtaSection;