import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { usarAutenticacion } from '../../config/context/AuthContext';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Login = () => {
    const [email, setEmail] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    
    const { iniciarSesion } = usarAutenticacion();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Obtener la ruta de redirección o usar la ruta por defecto
    const from = location.state?.from?.pathname || '/';
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación básica
        if (!email || !contrasenia) {
            setError('Por favor complete todos los campos.');
            return;
        }
        
        // Intentar iniciar sesión
        try {
            setSubmitting(true);
            setError('');
            
            await iniciarSesion(email, contrasenia);
            
            // Redireccionar al usuario después del login exitoso
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            
            if (err.response?.status === 401) {
                setError('Email o contraseña incorrectos.');
            } else {
                setError('Ocurrió un error al iniciar sesión. Por favor intente de nuevo.');
            }
        } finally {
            setSubmitting(false);
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
                                    <h2 className="h3 mb-3">Iniciar Sesión</h2>
                                    <p className="text-muted">Ingrese a su cuenta para continuar</p>
                                </div>
                                
                                {error && <Alert variant="danger">{error}</Alert>}
                                
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="nombre@ejemplo.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={submitting}
                                            required
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-4">
                                        <div className="d-flex justify-content-between">
                                            <Form.Label>Contraseña</Form.Label>
                                            <Link to="/recuperar-contrasenia" className="text-decoration-none small">
                                                ¿Olvidó su contraseña?
                                            </Link>
                                        </div>
                                        <Form.Control
                                            type="password"
                                            placeholder="Ingrese su contraseña"
                                            value={contrasenia}
                                            onChange={(e) => setContrasenia(e.target.value)}
                                            disabled={submitting}
                                            required
                                        />
                                    </Form.Group>
                                    
                                    <div className="d-grid">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            size="lg"
                                            disabled={submitting}
                                        >
                                            {submitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Iniciando sesión...
                                                </>
                                            ) : 'Iniciar Sesión'}
                                        </Button>
                                    </div>
                                </Form>
                                
                                <div className="mt-4 text-center">
                                    <p className="mb-0">
                                        ¿No tiene una cuenta? <Link to="/registrarse" className="text-primary text-decoration-none">Regístrese</Link>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Login;
