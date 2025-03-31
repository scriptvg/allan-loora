import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FeaturedServices = ({ services = [] }) => {
    const getVariantClass = (variant) => {
        const VARIANTS = {
            'primary': 'primary',
            'secondary': 'secondary',
            'success': 'success',
            'danger': 'danger',
            'warning': 'warning',
            'info': 'info',
            'light': 'light',
            'dark': 'dark'
        };
        return VARIANTS[variant] || 'primary';
    };

    return (
        <section className="featured-services-section py-5">
            <Container>
                <Row className="justify-content-center mb-5">
                    <Col lg={8} className="text-center">
                        <h2 className="section-title animate-on-scroll fade-in-up">Servicios Destacados</h2>
                        <p className="section-subtitle animate-on-scroll fade-in-up delay-1">
                            Ofrecemos una variedad de servicios premium diseñados para hacer su estadía 
                            más cómoda y placentera
                        </p>
                    </Col>
                </Row>
                
                <Row>
                    {services.length > 0 ? (
                        services.map((service, index) => (
                            <Col key={service.id} md={6} lg={4} className="mb-4">
                                <Card className={`service-card border-0 shadow-sm animate-on-scroll fade-in-up delay-${index+1}`}>
                                    <div className="service-image-container">
                                        <Card.Img 
                                            variant="top" 
                                            src={service.imgSrc || `https://source.unsplash.com/random/300x200/?${service.title.toLowerCase()}`} 
                                            alt={service.title}
                                            className="service-image"
                                        />
                                        <div className={`service-badge bg-${getVariantClass(service.variante)}`}>
                                            <i className={`bi bi-${service.icon}`}></i>
                                        </div>
                                    </div>
                                    <Card.Body className="p-4">
                                        <Card.Title className="service-title">{service.title}</Card.Title>
                                        <Card.Text className="service-description">{service.description}</Card.Text>
                                        
                                        <div className="service-details">
                                            <div className="service-schedule mb-3">
                                                <i className="bi bi-clock me-2"></i>
                                                <span>{service.horario}</span>
                                            </div>
                                            
                                            {service.caracteristicas && service.caracteristicas.length > 0 && (
                                                <div className="service-features">
                                                    <h6 className="features-title">Características:</h6>
                                                    <ul className="features-list">
                                                        {service.caracteristicas.slice(0, 3).map((feature, i) => (
                                                            <li key={i}><i className="bi bi-check-circle-fill me-2"></i>{feature}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="text-center mt-4">
                                            <Button 
                                                as={Link}
                                                to={`/contacto?service=${service.title}`}
                                                variant={getVariantClass(service.variante)}
                                                className="btn-learn-more"
                                            >
                                                Solicitar Información
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center py-5">
                            <div className="empty-services">
                                <i className="bi bi-emoji-frown display-4 text-muted"></i>
                                <h3 className="mt-3">No hay servicios destacados</h3>
                                <p className="text-muted">
                                    Estamos trabajando para ofrecerle nuevos servicios pronto.
                                </p>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </section>
    );
};

export default FeaturedServices;