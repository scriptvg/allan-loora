import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styles/FeaturesSection.css';

const FeaturesSection = () => {
    // Features para la sección de características
    const features = [
        {
            title: "Servicio de Excelencia",
            icon: "star-fill",
            desc: "Nuestro personal altamente capacitado está dedicado a superar todas sus expectativas, proporcionando una atención personalizada y anticipando sus necesidades.",
            color: "#1e4d6b"
        },
        {
            title: "Ubicación Estratégica",
            icon: "geo-alt-fill",
            desc: "Situados en el corazón de la ciudad, a pocos pasos de los principales puntos de interés, restaurantes exclusivos y zonas comerciales.",
            color: "#2a6d99"
        },
        {
            title: "Ambiente Seguro",
            icon: "shield-check",
            desc: "Su tranquilidad es nuestra prioridad. Contamos con sistemas de seguridad de última generación y vigilancia las 24 horas del día.",
            color: "#16384f"
        }
    ];

    return (
        <Container className="py-5 my-5 features-section">
            <div className="section-title-container">
                <h2 className="section-title">Por qué elegirnos</h2>
                <p className="section-subtitle">
                    Nuestro hotel combina el lujo con el confort para crear una experiencia única
                    que supera todas sus expectativas y hace de su estancia un momento inolvidable.
                </p>
            </div>

            <Row className="g-4 mt-3">
                {features.map((feature, idx) => (
                    <Col md={4} key={idx}>
                        <div className="feature-card">
                            <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                                <i className={`bi bi-${feature.icon}`}></i>
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.desc}</p>
                            <div className="feature-decoration" style={{ backgroundColor: feature.color }}></div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FeaturesSection;