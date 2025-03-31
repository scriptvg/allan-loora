import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Hero from './components/home/Hero';
import FeaturedRooms from './components/home/FeaturedRooms';
import Services from './components/home/Services';
import Testimonials from './components/home/Testimonials';
import './components/home/styles/Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />

            <section className="welcome-section py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <div className="welcome-content">
                                <h2 className="section-title">Bienvenido a Hotel Yadran</h2>
                                <p className="lead">Su refugio de tranquilidad y lujo en el corazón de la ciudad</p>
                                <p className="text-muted">
                                    Disfrute de una experiencia única en nuestro hotel boutique, donde cada detalle ha sido
                                    cuidadosamente diseñado para brindarle confort y elegancia. Con nuestra ubicación privilegiada,
                                    tendrá acceso inmediato a los principales atractivos turísticos y comerciales.
                                </p>
                                <Button as={Link} to="/acerca" variant="outline-primary" className="mt-3">
                                    Conozca nuestra historia
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="welcome-image-container">
                                <img
                                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070"
                                    alt="Hotel Yadran"
                                    className="welcome-image img-fluid rounded shadow-lg"
                                />
                                <div className="image-badge">
                                    <span className="years">10+</span>
                                    <span className="text">años de experiencia</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <FeaturedRooms />

            <Services />

            <section className="cta-section py-5 my-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <Card className="cta-card border-0 shadow">
                                <Card.Body className="p-5 text-center">
                                    <h2 className="cta-title mb-4">Reserve su estadía perfecta hoy</h2>
                                    <p className="cta-text mb-4">
                                        Aproveche nuestras ofertas especiales y disfrute de una experiencia inolvidable
                                        en el Hotel Yadran. Garantizamos la mejor tarifa al reservar directamente con nosotros.
                                    </p>
                                    <div className="d-flex justify-content-center flex-wrap gap-3">
                                        <Button as={Link} to="/habitaciones" variant="primary" size="lg" className="px-4">
                                            Ver Habitaciones
                                        </Button>
                                        <Button as={Link} to="/contacto" variant="outline-primary" size="lg" className="px-4">
                                            Contáctenos
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Testimonials />
        </div>
    );
};

export default Home;
