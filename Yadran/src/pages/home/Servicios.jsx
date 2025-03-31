import React from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import ServicesHero from './public/components/servicios/components/ServicesHero';
import FeaturedServices from './public/components/servicios/components/FeaturedServices';
import ServiceCategories from './public/components/servicios/components/ServiceCategories';
import CallToAction from './public/components/servicios/components/CallToAction';
import useServicesPage from './public/components/servicios/hooks/useServicesPage';
import LoadingSpinner from './public/components/servicios/components/LoadingSpinner';
import './public/components/servicios/styles/Servicios.css';

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
