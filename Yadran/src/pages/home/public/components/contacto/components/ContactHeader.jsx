import React from 'react';
import { Container } from 'react-bootstrap';

const ContactHeader = () => {
    return (
        <div className="contacto-header text-center py-5 mb-5">
            <Container>
                <h1 className="display-4 fw-bold text-white mb-4 slide-up-animation">Contáctenos</h1>
                <p className="lead text-white mb-0 fade-in-animation">
                    Estamos aquí para atender todas sus consultas y solicitudes
                </p>
            </Container>
            <div className="header-overlay"></div>
        </div>
    );
};

export default ContactHeader;