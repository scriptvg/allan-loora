import React from 'react';
import { Card } from 'react-bootstrap';

const ContactInfo = () => {
    const contactData = [
        {
            icon: 'geo-alt',
            title: 'Dirección',
            content: 'Al Final del Paseo de los Turistas, Puntarenas, Costa Rica'
        },
        {
            icon: 'telephone',
            title: 'Teléfono',
            content: '+506 2661-0300'
        },
        {
            icon: 'envelope',
            title: 'Email',
            content: 'reservaciones@hotelyadran.com'
        },
        {
            icon: 'clock',
            title: 'Horario',
            content: 'Atención al cliente: 24/7'
        }
    ];

    const socialMedia = [
        { platform: 'facebook', url: 'https://facebook.com', label: 'Facebook' },
        { platform: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
        { platform: 'twitter-x', url: 'https://twitter.com', label: 'Twitter' },
        { platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' }
    ];

    return (
        <div className="contacto-info-container animate-on-scroll fade-in-left">
            <h2 className="section-title mb-4">Información de Contacto</h2>
            <p className="text-muted mb-4">
                Póngase en contacto con nosotros a través de los siguientes canales o complete el formulario y le responderemos a la brevedad.
            </p>

            <div className="info-cards">
                {contactData.map((item, index) => (
                    <Card key={index} className="info-card mb-3 border-0 shadow-sm">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center">
                                <div className="info-icon">
                                    <i className={`bi bi-${item.icon}`}></i>
                                </div>
                                <div className="ms-3">
                                    <h5 className="fw-bold mb-1">{item.title}</h5>
                                    <p className="mb-0 text-muted">{item.content}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <div className="social-media mt-4">
                <h5 className="fw-bold mb-3">Síganos</h5>
                <div className="d-flex gap-3">
                    {socialMedia.map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label={social.label}
                        >
                            <i className={`bi bi-${social.platform}`}></i>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;