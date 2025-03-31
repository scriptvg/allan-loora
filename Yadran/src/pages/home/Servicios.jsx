import React from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import ServicesHero from './components/servicios/components/ServicesHero';
import FeaturedServices from './components/servicios/components/FeaturedServices';
import ServiceCategories from './components/servicios/components/ServiceCategories';
import CallToAction from './components/servicios/components/CallToAction';
import useServicesPage from './components/servicios/hooks/useServicesPage';
import LoadingSpinner from './components/servicios/components/LoadingSpinner';
import './components/servicios/styles/Servicios.css';

const Servicios = () => {
    const { services, featuredServices, groupedServices, isLoading, error } = useServicesPage();

    if (isLoading) {
        return (
            <div className="servicios-page">
                <Container className="text-center py-5 my-5">
                    <LoadingSpinner message="Cargando servicios..." />
                </Container>
            </div>
        );
    }

    return (
        <div className="servicios-page">
            <ServicesHero />

            {error && (
                <Container className="py-3">
                    <Alert variant="warning">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                    </Alert>
                </Container>
            )}

            <FeaturedServices services={featuredServices} />

            <ServiceCategories groupedServices={groupedServices} />

            <CallToAction />
        </div>
    );
};

export default Servicios;
