import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usuariosApi } from '../../config/api/usuariosApi';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const RecuperarContrasenia = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar email
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            setError('Por favor ingrese un email válido');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            await usuariosApi.recuperarContrasenia(email);
            setSubmitted(true);
        } catch (err) {
            console.error('Error al solicitar recuperación de contraseña:', err);
            
            // No revelar si el email existe o no por seguridad
            // Fingir éxito incluso si el email no existe en la base de datos
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <>
            <Header />
            <Container className="py-5 my-5">
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body className="p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <h2 className="h3 mb-3">Recuperar Contraseña</h2>
                                    <p className="text-muted">
                                        {!submitted
                                            ? 'Ingrese su email para recibir instrucciones de recuperación'
                                            : 'Gracias por enviar su solicitud'
                                        }
                                    </p>
                                </div>
                                
                                {error && <Alert variant="danger">{error}</Alert>}
                                
                                {!submitted ? (
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="nombre@ejemplo.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={loading}
                                                required
                                            />
                                        </Form.Group>
                                        
                                        <div className="d-grid mb-4">
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                size="lg"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Enviando...
                                                    </>
                                                ) : 'Enviar Instrucciones'}
                                            </Button>
                                        </div>
                                        
                                        <div className="text-center">
                                            <Link to="/iniciar-sesion" className="text-decoration-none">
                                                <i className="bi bi-arrow-left me-1"></i> Volver a Iniciar Sesión
                                            </Link>
                                        </div>
                                    </Form>
                                ) : (
                                    <div className="text-center">
                                        <div className="mb-4">
                                            <i className="bi bi-envelope-check text-success" style={{ fontSize: '3rem' }}></i>
                                        </div>
                                        
                                        <Alert variant="success">
                                            Si su email existe en nuestra base de datos, recibirá un correo con instrucciones para restablecer su contraseña.
                                        </Alert>
                                        
                                        <div className="mt-4">
                                            <Link to="/iniciar-sesion" className="btn btn-outline-primary">
                                                Volver a Iniciar Sesión
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default RecuperarContrasenia;
