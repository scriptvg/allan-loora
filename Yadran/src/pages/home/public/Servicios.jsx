import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Alert, Modal, Button, Row, Col } from 'react-bootstrap';
import Header from '../../../components/header/Header';
import ServicesHero from './components/servicios/components/ServicesHero';
import FeaturedServices from './components/servicios/components/FeaturedServices';
import ServiceCategories from './components/servicios/components/ServiceCategories';
import CallToAction from './components/servicios/components/CallToAction';
import LoadingSpinner from './components/servicios/components/LoadingSpinner';
import useServicesPage from './components/servicios/hooks/useServicesPage';
import useScrollAnimation from './components/contacto/hooks/useScrollAnimation';
import './components/servicios/styles/Servicios.css';

const Servicios = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const { services, featuredServices, groupedServices, isLoading, error } = useServicesPage();
    const navigate = useNavigate();

    // Inicializar efecto de animación en scroll
    useScrollAnimation();

    // Modal handlers
    const openServiceModal = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedService(null);
    };

    if (isLoading) {
        return <LoadingSpinner message="Cargando servicios..." />;
    }

    return (
        <div className="servicios-page">
            <Header />

            <ServicesHero />

            <Container className="py-5">
                {error && (
                    <Alert variant="warning" className="mb-4">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                    </Alert>
                )}

                {/* Servicios Destacados */}
                <FeaturedServices
                    services={featuredServices}
                    onServiceClick={openServiceModal}
                />

                {/* Todos los Servicios por Categoría */}
                <ServiceCategories
                    groupedServices={groupedServices}
                    onServiceClick={openServiceModal}
                />
            </Container>

            {/* Llamada a la acción */}
            <CallToAction onButtonClick={() => navigate("/habitaciones")} />

            {/* Modal de detalle de servicio */}
            <Modal show={showModal} onHide={closeModal} size="lg" centered>
                {selectedService && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedService.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedService.imgSrc && (
                                <img
                                    src={selectedService.imgSrc}
                                    alt={selectedService.title}
                                    className="img-fluid rounded mb-4 w-100"
                                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                                />
                            )}
                            <p>{selectedService.description}</p>

                            {selectedService.horario && (
                                <>
                                    <h5 className="mt-4 mb-3">Horario</h5>
                                    <p>
                                        <i className="bi bi-clock-fill me-2 text-primary"></i>
                                        {selectedService.horario}
                                    </p>
                                </>
                            )}

                            {selectedService.caracteristicas && selectedService.caracteristicas.length > 0 && (
                                <>
                                    <h5 className="mt-4 mb-3">Características</h5>
                                    <Row className="mb-4">
                                        {selectedService.caracteristicas.map((feature, index) => (
                                            <Col md={6} key={index} className="mb-2">
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-check-circle-fill me-2 text-success"></i>
                                                    <span>{feature}</span>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Cerrar
                            </Button>
                            <Button
                                variant="primary"
                                as={Link}
                                to="/contacto"
                                onClick={closeModal}
                            >
                                Solicitar Información
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Servicios;