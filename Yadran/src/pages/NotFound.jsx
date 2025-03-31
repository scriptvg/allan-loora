import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const NotFound = () => {
    return (
        <>
            <Header />
            <Container className="py-5 text-center" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <div className="error-code">404</div>
                    <h1 className="mt-4 mb-3">Página no encontrada</h1>
                    <p className="text-muted mb-4">
                        Lo sentimos, la página que estás buscando no existe o ha sido movida.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button as={Link} to="/" variant="primary">
                            <i className="bi bi-house-door me-2"></i>
                            Volver al inicio
                        </Button>
                        <Button as={Link} to="/contacto" variant="outline-primary">
                            <i className="bi bi-envelope me-2"></i>
                            Contactar soporte
                        </Button>
                    </div>
                </div>
            </Container>
            <Footer />
            <style jsx>{`
                .error-code {
                    font-size: 8rem;
                    font-weight: 700;
                    color: #f8f9fa;
                    text-shadow: 0 5px 10px rgba(0,0,0,0.1);
                    background: linear-gradient(to right, #0d6efd, #6610f2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    line-height: 1;
                }
            `}</style>
        </>
    );
};

export default NotFound;
