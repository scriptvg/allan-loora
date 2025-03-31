import React, { useState } from 'react';
import { Container, Row, Col, Tabs, Tab, Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ServiceCategories = ({ groupedServices = {} }) => {
    const [activeTab, setActiveTab] = useState(Object.keys(groupedServices)[0] || 'primary');
    
    if (Object.keys(groupedServices).length === 0) {
        return null;
    }
    
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
    
    const getCategoryTitle = (category) => {
        const CATEGORY_TITLES = {
            'primary': 'Servicios Principales',
            'secondary': 'Servicios Adicionales',
            'success': 'Servicios de Bienestar',
            'danger': 'Servicios Premium',
            'warning': 'Servicios Gastronómicos',
            'info': 'Servicios Recreativos',
            'light': 'Otros Servicios',
            'dark': 'Servicios Exclusivos'
        };
        return CATEGORY_TITLES[category] || 'Otros Servicios';
    };
    
    const getCategoryIcon = (category) => {
        const CATEGORY_ICONS = {
            'primary': 'house-door-fill',
            'secondary': 'gear-fill',
            'success': 'heart-fill',
            'danger': 'gem',
            'warning': 'cup-hot-fill',
            'info': 'controller',
            'light': 'three-dots',
            'dark': 'star-fill'
        };
        return CATEGORY_ICONS[category] || 'star-fill';
    };
    
    return (
        <section className="service-categories-section py-5 bg-light">
            <Container>
                <Row className="justify-content-center mb-5">
                    <Col lg={8} className="text-center">
                        <h2 className="section-title">Categorías de Servicios</h2>
                        <p className="section-subtitle">
                            Explore nuestra variedad de servicios organizados por categorías para encontrar 
                            exactamente lo que necesita
                        </p>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <div className="categories-tabs-container">
                            <Tabs
                                id="service-categories-tabs"
                                activeKey={activeTab}
                                onSelect={(k) => setActiveTab(k)}
                                className="mb-4 service-tabs justify-content-center"
                            >
                                {Object.keys(groupedServices).map(category => (
                                    <Tab 
                                        key={category}
                                        eventKey={category}
                                        title={
                                            <span className="d-flex align-items-center">
                                                <i className={`bi bi-${getCategoryIcon(category)} me-2`}></i>
                                                {getCategoryTitle(category)}
                                            </span>
                                        }
                                    />
                                ))}
                            </Tabs>
                            
                            <div className="categories-content">
                                {Object.keys(groupedServices).map(category => (
                                    <div 
                                        key={category} 
                                        className={`category-content ${activeTab === category ? 'active' : 'd-none'}`}
                                    >
                                        <Row>
                                            {groupedServices[category].map((service) => (
                                                <Col key={service.id} md={6} lg={4} className="mb-4">
                                                    <Card className="service-card-alt h-100 border-0 shadow-sm">
                                                        <Card.Body className="p-4">
                                                            <div className="service-icon-container mb-3">
                                                                <div className={`service-icon-bg bg-${getVariantClass(service.variante)}`}>
                                                                    <i className={`bi bi-${service.icon}`}></i>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                                <Card.Title className="service-alt-title mb-0">
                                                                    {service.title}
                                                                </Card.Title>
                                                                
                                                                {service.destacado && (
                                                                    <Badge 
                                                                        bg={getVariantClass(service.variante)} 
                                                                        className="ms-2 featured-badge"
                                                                    >
                                                                        Destacado
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            
                                                            <Card.Text className="service-alt-description mb-3">
                                                                {service.description}
                                                            </Card.Text>
                                                            
                                                            <div className="service-schedule mb-3">
                                                                <i className="bi bi-clock me-2"></i>
                                                                <span>{service.horario}</span>
                                                            </div>
                                                            
                                                            <Button 
                                                                as={Link}
                                                                to={`/contacto?service=${service.title}`}
                                                                variant={`outline-${getVariantClass(service.variante)}`}
                                                                className="w-100 mt-3"
                                                            >
                                                                Solicitar Información
                                                            </Button>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ServiceCategories;