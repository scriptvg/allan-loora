import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ServicesHero = () => {
    return (
        <div className="services-hero">
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8} className="text-center">
                        <h1 className="hero-title animate-on-scroll fade-in-up">Nuestros Servicios</h1>
                        <p className="hero-subtitle animate-on-scroll fade-in-up delay-1">
                            Descubra nuestra amplia gama de servicios diseñados para hacer de su estancia
                            una experiencia inolvidable
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ServicesHero;