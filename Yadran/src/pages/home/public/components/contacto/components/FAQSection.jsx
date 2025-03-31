import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const FAQSection = () => {
    const faqData = [
        {
            pregunta: '¿Cuáles son los horarios de check-in y check-out?',
            respuesta: 'El check-in está disponible a partir de las 15:00 horas, y el check-out debe realizarse antes de las 12:00 horas. Consulte en recepción para solicitudes especiales de late check-out o early check-in.'
        },
        {
            pregunta: '¿Ofrecen servicio de transporte desde el aeropuerto?',
            respuesta: 'Sí, ofrecemos servicio de traslado desde y hacia el aeropuerto con un costo adicional. Para programar este servicio, debe solicitarlo con al menos 24 horas de anticipación.'
        },
        {
            pregunta: '¿Aceptan mascotas en el hotel?',
            respuesta: 'Aceptamos mascotas pequeñas en habitaciones seleccionadas con un cargo adicional por noche. Por favor infórmenos al momento de su reserva si viajará con una mascota.'
        },
        {
            pregunta: '¿Tienen estacionamiento disponible?',
            respuesta: 'Sí, contamos con estacionamiento gratuito para todos nuestros huéspedes durante su estadía. También ofrecemos servicio de valet parking por un costo adicional.'
        }
    ];

    return (
        <Container className="mb-5">
            <div className="text-center mb-4 animate-on-scroll fade-in-up">
                <h2 className="section-title-centered mb-4">Preguntas Frecuentes</h2>
                <p className="text-muted">Respuestas a las consultas más comunes de nuestros clientes</p>
            </div>

            <Row className="g-4">
                {faqData.map((faq, index) => (
                    <Col md={6} key={index}>
                        <Card className="faq-card border-0 shadow-sm h-100 animate-on-scroll fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <Card.Body className="p-4">
                                <h5 className="card-title mb-3 fw-bold">
                                    <i className="bi bi-question-circle-fill text-primary me-2"></i>
                                    {faq.pregunta}
                                </h5>
                                <p className="card-text text-muted mb-0">{faq.respuesta}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FAQSection;