import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { usarAutenticacion } from '../../config/context/AuthContext';
import { validarFortalezaContrasenia } from '../../config/utils/validationUtils';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        contrasenia: '',
        confirmarContrasenia: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    
    const { registrarUsuario } = usarAutenticacion();
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        // Limpiar errores al cambiar valores
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };
    
    const validateForm = () => {
        let formErrors = {};
        let isValid = true;
        
        // Validar nombre
        if (!formData.nombre.trim()) {
            formErrors.nombre = 'El nombre es obligatorio';
            isValid = false;
        }
        
        // Validar email
        if (!formData.email.trim()) {
            formErrors.email = 'El email es obligatorio';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email inválido';
            isValid = false;
        }
        
        // Validar contraseña
        if (!formData.contrasenia) {
            formErrors.contrasenia = 'La contraseña es obligatoria';
            isValid = false;
        } else {
            const validacion = validarFortalezaContrasenia(formData.contrasenia);
            if (!validacion.esValida) {
                formErrors.contrasenia = validacion.retroalimentacion.join('. ');
                isValid = false;
            }
        }
        
        // Validar confirmación de contraseña
        if (formData.contrasenia !== formData.confirmarContrasenia) {
            formErrors.confirmarContrasenia = 'Las contraseñas no coinciden';
            isValid = false;
        }
        
        setErrors(formErrors);
        return isValid;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Construir objeto de datos para el registro
        const datosUsuario = {
            nombre: formData.nombre,
            email: formData.email,
            telefono: formData.telefono || null,
            contrasenia: formData.contrasenia,
            rol: 'cliente' // Por defecto, registramos como cliente
        };
        
        try {
            setSubmitting(true);
            
            await registrarUsuario(datosUsuario);
            
            // Redireccionar al login después de registro exitoso
            navigate('/iniciar-sesion', { 
                state: { 
                    message: 'Registro exitoso. Por favor inicie sesión con sus credenciales.' 
                }
            });
        } catch (error) {
            console.error('Error en el registro:', error);
            
            if (error.response?.data?.errors) {
                const backendErrors = {};
                error.response.data.errors.forEach(err => {
                    backendErrors[err.param] = err.msg;
                });
                setErrors(backendErrors);
            } else if (error.response?.data?.message) {
                setErrors({ 
                    general: error.response.data.message 
                });
            } else {
                setErrors({ 
                    general: 'Error al registrar usuario. Por favor intente de nuevo.' 
                });
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
                    <Col md={8} lg={6}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body className="p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <h2 className="h3 mb-3">Crear una cuenta</h2>
                                    <p className="text-muted">Complete el formulario para registrarse</p>
                                </div>
                                
                                {errors.general && (
                                    <Alert variant="danger">{errors.general}</Alert>
                                )}
                                
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre completo <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nombre"
                                            placeholder="Ingrese su nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            isInvalid={!!errors.nombre}
                                            disabled={submitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.nombre}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="nombre@ejemplo.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                            disabled={submitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Teléfono (opcional)</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="telefono"
                                            placeholder="Ingrese su teléfono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            isInvalid={!!errors.telefono}
                                            disabled={submitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.telefono}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Contraseña <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="contrasenia"
                                            placeholder="Cree su contraseña"
                                            value={formData.contrasenia}
                                            onChange={handleChange}
                                            isInvalid={!!errors.contrasenia}
                                            disabled={submitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.contrasenia}
                                        </Form.Control.Feedback>
                                        <Form.Text className="text-muted">
                                            Debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.
                                        </Form.Text>
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-4">
                                        <Form.Label>Confirmar contraseña <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmarContrasenia"
                                            placeholder="Confirme su contraseña"
                                            value={formData.confirmarContrasenia}
                                            onChange={handleChange}
                                            isInvalid={!!errors.confirmarContrasenia}
                                            disabled={submitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmarContrasenia}
                                        </Form.Control.Feedback>
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
                                                    Registrando...
                                                </>
                                            ) : 'Registrarse'}
                                        </Button>
                                    </div>
                                </Form>
                                
                                <div className="mt-4 text-center">
                                    <p className="mb-0">
                                        ¿Ya tiene una cuenta? <Link to="/iniciar-sesion" className="text-primary text-decoration-none">Iniciar Sesión</Link>
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

export default Registro;
