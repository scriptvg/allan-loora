import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EnvelopeFill, GeoAltFill, TelephoneFill, Facebook, Instagram, Twitter, Youtube } from 'react-bootstrap-icons';
import './styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <Container>
                    <Row>
                        <Col lg={4} md={6} className="mb-4 mb-md-0">
                            <div className="footer-info">
                                <div className="footer-logo">
                                    <img src="/logo.jpg" alt="Hotel Yadran" />
                                    <span>YADRAN</span>
                                </div>
                                <p className="mt-3">
                                    Ofrecemos una experiencia única de hospedaje, combinando lujo, confort y un servicio
                                    excepcional para hacer de su estadía un momento inolvidable.
                                </p>
                                <div className="footer-social">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                        <Facebook />
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                        <Instagram />
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                        <Twitter />
                                    </a>
                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                        <Youtube />
                                    </a>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} md={6} className="mb-4 mb-md-0">
                            <h5 className="footer-heading">Enlaces</h5>
                            <ul className="footer-links">
                                <li>
                                    <Link to="/">Inicio</Link>
                                </li>
                                <li>
                                    <Link to="/habitaciones">Habitaciones</Link>
                                </li>
                                <li>
                                    <Link to="/servicios">Servicios</Link>
                                </li>
                                <li>
                                    <Link to="/acerca">Acerca de</Link>
                                </li>
                                <li>
                                    <Link to="/contacto">Contacto</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col lg={3} md={6} className="mb-4 mb-md-0">
                            <h5 className="footer-heading">Contacto</h5>
                            <ul className="footer-contact">
                                <li>
                                    <GeoAltFill />
                                    <span>Av. Principal 123, Los Cerros, Santiago de Chile</span>
                                </li>
                                <li>
                                    <TelephoneFill />
                                    <span>+56 2 2345 6789</span>
                                </li>
                                <li>
                                    <EnvelopeFill />
                                    <span>info@hotelyadran.com</span>
                                </li>
                            </ul>
                        </Col>
                        <Col lg={3} md={6}>
                            <h5 className="footer-heading">Suscríbase</h5>
                            <p>Reciba nuestras últimas ofertas y novedades</p>
                            <Form className="subscription-form">
                                <Form.Group>
                                    <Form.Control
                                        type="email"
                                        placeholder="Su email"
                                        className="mb-2"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Suscribirse
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="footer-bottom">
                <Container>
                    <div className="copyright text-center">
                        &copy; {new Date().getFullYear()} Hotel Yadran. Todos los derechos reservados.
                    </div>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;