import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CallToAction = () => {
    return (
        <section className="cta-section py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <div className="cta-container bg-primary text-white shadow rounded p-5 text-center">
                            <h2 className="cta-title mb-4">¿Necesita un servicio personalizado?</h2>
                            <p className="cta-text mb-4">
                                Si no encuentra exactamente lo que está buscando, nuestro equipo está listo para crear
                                una experiencia personalizada que se adapte a sus necesidades específicas.
                            </p>
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <Button
                                    as={Link}
                                    to="/contacto"
                                    variant="light"
                                    size="lg"
                                    className="px-4 py-2"
                                >
                                    Contáctenos
                                </Button>
                                <Button
                                    as={Link}
                                    to="/habitaciones"
                                    variant="outline-light"
                                    size="lg"
                                    className="px-4 py-2"
                                >
                                    Ver Habitaciones
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CallToAction;