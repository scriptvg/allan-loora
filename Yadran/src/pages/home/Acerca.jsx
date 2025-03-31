import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './components/acerca/styles/Acerca.css';

const Acerca = () => {
    return (
        <div className="acerca-page">
            <div className="acerca-hero">
                <Container>
                    <div className="text-center">
                        <h1 className="acerca-title">Sobre Hotel Yadran</h1>
                        <p className="acerca-subtitle">
                            Nuestra historia, misión y compromiso con la excelencia
                        </p>
                    </div>
                </Container>
            </div>
            
            <section className="historia-section py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <div className="historia-content">
                                <h2 className="section-title">Nuestra Historia</h2>
                                <p className="lead">Una tradición de hospitalidad desde 2010</p>
                                <p>
                                    El Hotel Yadran nació de la visión de crear un espacio donde la elegancia 
                                    contemporánea y el servicio personalizado se combinaran a la perfección.
                                    Fundado en 2010, nuestro hotel ha sido testigo de miles de historias de 
                                    viajeros que han encontrado en nuestras instalaciones un verdadero hogar 
                                    lejos de casa.
                                </p>
                                <p>
                                    A lo largo de los años, hemos evolucionado y renovado nuestras instalaciones, 
                                    pero nunca hemos perdido nuestra esencia: el compromiso con la excelencia 
                                    y la atención meticulosa a cada detalle.
                                </p>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="historia-image-container">
                                <img 
                                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" 
                                    alt="Hotel Yadran - Historia" 
                                    className="historia-image img-fluid rounded shadow-lg"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <section className="mision-vision-section py-5 bg-light">
                <Container>
                    <Row className="justify-content-center mb-5">
                        <Col lg={8} className="text-center">
                            <h2 className="section-title">Nuestra Misión y Visión</h2>
                            <p className="lead">
                                Construimos experiencias excepcionales con un propósito claro
                            </p>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md={6} className="mb-4">
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body className="p-4">
                                    <div className="mission-icon mb-3">
                                        <i className="bi bi-stars"></i>
                                    </div>
                                    <h3 className="card-title">Misión</h3>
                                    <p className="card-text">
                                        Proporcionar a nuestros huéspedes una experiencia de hospedaje excepcional, 
                                        combinando instalaciones de primera categoría con un servicio cálido y 
                                        personalizado que supere sus expectativas.
                                    </p>
                                    <p className="card-text">
                                        Nos esforzamos por ser un referente en la industria hotelera, 
                                        creando un ambiente donde el confort, la elegancia y la atención al 
                                        detalle se integran perfectamente para satisfacer las necesidades de 
                                        cada visitante.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={6} className="mb-4">
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body className="p-4">
                                    <div className="vision-icon mb-3">
                                        <i className="bi bi-eye"></i>
                                    </div>
                                    <h3 className="card-title">Visión</h3>
                                    <p className="card-text">
                                        Ser reconocidos como el hotel de referencia en nuestra región, 
                                        destacándonos por la excelencia en el servicio, la innovación constante 
                                        y el compromiso con la sostenibilidad.
                                    </p>
                                    <p className="card-text">
                                        Aspiramos a expandir nuestra presencia manteniendo siempre nuestra esencia y 
                                        valores, creando experiencias memorables que hagan que nuestros huéspedes 
                                        deseen regresar una y otra vez.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <section className="valores-section py-5">
                <Container>
                    <Row className="justify-content-center mb-5">
                        <Col lg={8} className="text-center">
                            <h2 className="section-title">Nuestros Valores</h2>
                            <p className="lead">
                                Principios que guían nuestras acciones cada día
                            </p>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md={4} className="mb-4">
                            <Card className="value-card h-100 border-0 shadow-sm">
                                <Card.Body className="p-4 text-center">
                                    <div className="value-icon mb-3">
                                        <i className="bi bi-heart-fill"></i>
                                    </div>
                                    <h4>Hospitalidad</h4>
                                    <p className="mb-0">
                                        Recibimos a cada huésped con calidez genuina, haciéndolos sentir bienvenidos 
                                        y valorados desde el primer momento.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="mb-4">
                            <Card className="value-card h-100 border-0 shadow-sm">
                                <Card.Body className="p-4 text-center">
                                    <div className="value-icon mb-3">
                                        <i className="bi bi-award-fill"></i>
                                    </div>
                                    <h4>Excelencia</h4>
                                    <p className="mb-0">
                                        Nos esforzamos por superar expectativas en cada aspecto de nuestro servicio, 
                                        desde las habitaciones hasta la atención personalizada.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="mb-4">
                            <Card className="value-card h-100 border-0 shadow-sm">
                                <Card.Body className="p-4 text-center">
                                    <div className="value-icon mb-3">
                                        <i className="bi bi-emoji-smile-fill"></i>
                                    </div>
                                    <h4>Pasión</h4>
                                    <p className="mb-0">
                                        Amamos lo que hacemos y eso se refleja en cada detalle y en cada interacción 
                                        con nuestros huéspedes.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="mb-4">
                            <Card className="value-card h-100 border-0 shadow-sm">
                                <Card.Body className="p-4 text-center">
                                    <div className="value-icon mb-3">
                                        <i className="bi bi-people-fill"></i>
                                    </div>
                                    <h4>Trabajo en Equipo</h4>
                                    <p className="mb-0">
                                        Colaboramos eficazmente para crear experiencias sin fisuras que deleiten a 
                                        nuestros huéspedes en cada momento.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="mb-4">
                            <Card className="value-card h-100 border-0 shadow-sm">
                                <Card.Body className="p-4 text-center">
                                    <div className="value-icon mb-3">
                                        <i className="bi bi-recycle"></i>
                                    </div>
                                    <h4>Sostenibilidad</h4>
                                    <p className="mb-0">
                                        Implementamos prácticas responsables que minimizan nuestro impacto ambiental 
                                        sin comprometer la calidad de nuestro servicio.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="mb-4">
                            <Card className="value-card h-100 border-0 shadow-sm">
                                <Card.Body className="p-4 text-center">
                                    <div className="value-icon mb-3">
                                        <i className="bi bi-lightbulb-fill"></i>
                                    </div>
                                    <h4>Innovación</h4>
                                    <p className="mb-0">
                                        Buscamos constantemente nuevas formas de mejorar la experiencia de nuestros 
                                        huéspedes, adaptándonos a sus necesidades cambiantes.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <section className="equipo-section py-5 bg-light">
                <Container>
                    <Row className="justify-content-center mb-5">
                        <Col lg={8} className="text-center">
                            <h2 className="section-title">Nuestro Equipo Directivo</h2>
                            <p className="lead">
                                Profesionales apasionados que lideran con el ejemplo
                            </p>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md={4} className="mb-4">
                            <Card className="team-card border-0 shadow-sm">
                                <Card.Img variant="top" src="https://randomuser.me/api/portraits/men/32.jpg" />
                                <Card.Body className="text-center">
                                    <h5 className="card-title">Carlos Mendoza</h5>
                                    <p className="card-subtitle text-muted mb-3">Director General</p>
                                    <p className="card-text">
                                        Con más de 20 años de experiencia en la industria hotelera, Carlos lidera 
                                        nuestro equipo con visión y pasión.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="mb-4">
                            <Card className="team-card border-0 shadow-sm">
                                <Card.Img variant="top" src="https://randomuser.me/api/portraits/women/44.jpg" />
                                <Card.Body className="text-center">
                                    <h5 className="card-title">Ana Martínez</h5>
                                    <p className="card-subtitle text-muted mb-3">Directora de Operaciones</p>
                                    <p className="card-text">
                                        Ana asegura que cada aspecto operativo del hotel cumpla con nuestros 
                                        estándares de excelencia.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="mb-4">
                            <Card className="team-card border-0 shadow-sm">
                                <Card.Img variant="top" src="https://randomuser.me/api/portraits/men/76.jpg" />
                                <Card.Body className="text-center">
                                    <h5 className="card-title">Roberto Sánchez</h5>
                                    <p className="card-subtitle text-muted mb-3">Chef Ejecutivo</p>
                                    <p className="card-text">
                                        La creatividad culinaria de Roberto ha posicionado a nuestro restaurante 
                                        como uno de los mejores de la región.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Acerca;
