import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ContactForm from './public/components/contacto/components/ContactForm';
import ContactInfo from './public/components/contacto/components/ContactInfo';
import ContactMap from './public/components/contacto/components/ContactMap';
import './public/components/contacto/styles/Contacto.css';

const Contacto = () => {
    return (
        <div className="contacto-page">
            <div className="contacto-hero">
                <Container>
                    <div className="text-center">
                        <h1 className="contacto-title animate-on-scroll fade-in-up">Contáctenos</h1>
                        <p className="contacto-subtitle animate-on-scroll fade-in-up delay-1">
                            Estamos aquí para responder cualquier consulta y ayudarle a planificar su estadía perfecta
                        </p>
                    </div>
                </Container>
            </div>
            
            <Container className="py-5">
                <Row className="justify-content-between">
                    <Col lg={5} className="mb-4 mb-lg-0">
                        <ContactInfo />
                    </Col>
                    
                    <Col lg={7}>
                        <ContactForm />
                    </Col>
                </Row>
                
                <Row className="mt-5">
                    <Col>
                        <Card className="border-0 shadow-sm animate-on-scroll fade-in-up">
                            <Card.Body className="p-0">
                                <ContactMap />
                            </Card.Body>
                        </Card>
                        
                        <div className="text-center mt-4">
                            <h5 className="mb-3">Visite Nuestro Hotel</h5>
                            <p className="text-muted">
                                Estaremos encantados de mostrarle nuestras instalaciones y responder a todas sus preguntas en persona.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
            
            <section className="faq-section py-5 mt-5 bg-light">
                <Container>
                    <h2 className="text-center mb-5">Preguntas Frecuentes</h2>
                    
                    <Row>
                        <Col lg={6} className="mb-4">
                            <div className="faq-item animate-on-scroll fade-in-up">
                                <h5>¿Cuál es el horario de check-in y check-out?</h5>
                                <p>El check-in está disponible a partir de las 14:00 y el check-out debe realizarse antes de las 12:00 del mediodía.</p>
                            </div>
                        </Col>
                        
                        <Col lg={6} className="mb-4">
                            <div className="faq-item animate-on-scroll fade-in-up">
                                <h5>¿Ofrecen servicio de transporte desde el aeropuerto?</h5>
                                <p>Sí, ofrecemos servicio de transporte desde y hacia el aeropuerto por un cargo adicional. Por favor, contáctenos con anticipación para coordinar.</p>
                            </div>
                        </Col>
                        
                        <Col lg={6} className="mb-4">
                            <div className="faq-item animate-on-scroll fade-in-up">
                                <h5>¿Las mascotas son permitidas?</h5>
                                <p>Permitimos mascotas pequeñas en habitaciones seleccionadas con un depósito adicional. Por favor notifíquenos al momento de su reserva.</p>
                            </div>
                        </Col>
                        
                        <Col lg={6} className="mb-4">
                            <div className="faq-item animate-on-scroll fade-in-up">
                                <h5>¿El desayuno está incluido en la tarifa?</h5>
                                <p>Sí, todas nuestras tarifas incluyen desayuno buffet servido en nuestro restaurante principal de 7:00 a 10:30.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Contacto;
