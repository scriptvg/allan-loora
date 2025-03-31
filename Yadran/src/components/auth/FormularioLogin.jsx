import React, { useEffect, useState } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import EsquemaLoginYup from './Esquemas/EsquemaLoginYup.jsx';
import useUsuarios from '../../config/hooks/useUsuarios.jsx';
import { usarAutenticacion } from '../../config/context/AuthContext.jsx';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Form, Container } from 'react-bootstrap';

const FormularioInicioSesion = () => {
    const { iniciarSesion } = useUsuarios();
    const { autenticarInicioSesion, estaAutenticado, usuario } = usarAutenticacion();
    const [error, establecerError] = useState(null);
    const [mostrarPassword, establecerMostrarPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (estaAutenticado) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 1500);

            return () => clearTimeout(timer)
        }
    }, [estaAutenticado, navigate]);

    const manejarEnvio = async (valores, { setSubmitting }) => {
        console.log('Valores enviados:', valores);
        establecerError(null);

        try {
            const datosUsuario = await iniciarSesion(valores);
            if (datosUsuario) {
                autenticarInicioSesion(datosUsuario);
            }
        } catch (error) {
            console.log('Error al iniciar sesión:', error);
            establecerError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="mt-5 animate-fade-up">
            <h2 className="mb-4 font-heading">Iniciar Sesión</h2>
            {error && (
                <div className="alert alert-danger">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {error}
                </div>
            )}
            {estaAutenticado && (
                <div className="alert alert-success">
                    <i className="bi bi-check-circle me-2"></i>
                    ¡Inicio de sesión exitoso! Bienvenido {usuario?.nombre || usuario?.email || 'Usuario'}
                    <div className="small mt-1">Redirigiendo al inicio...</div>
                </div>
            )}
            
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={EsquemaLoginYup}
                onSubmit={manejarEnvio}
            >
                {({ isSubmitting }) => (
                    <FormikForm className="card shadow-sm p-4 bg-white rounded ">
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label className="font-medium">Email</Form.Label>
                            <Field 
                                type="email" 
                                name="email" 
                                className="form-control" 
                                placeholder="ejemplo@correo.com" 
                            />
                            <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formPassword">
                            <div className="d-flex justify-content-between align-items-center">
                                <Form.Label className="font-medium">Contraseña</Form.Label>
                                <a href="/recuperar-contrasena" className="text-primary link-underline">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <div className="input-group">
                                <Field 
                                    type={mostrarPassword ? 'text' : 'password'} 
                                    name="password" 
                                    className="form-control" 
                                    placeholder="Ingresa tu contraseña" 
                                />
                                <button 
                                    type="button" 
                                    className="btn btn-outline-secondary" 
                                    onClick={() => establecerMostrarPassword(!mostrarPassword)}
                                >
                                    <i className={`bi bi-${mostrarPassword ? 'eye-slash' : 'eye'}`}></i>
                                </button>
                            </div>
                            <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <div className="form-check">
                                <Field 
                                    type="checkbox" 
                                    name="rememberMe" 
                                    id="rememberMe" 
                                    className="form-check-input" 
                                />
                                <label htmlFor="rememberMe" className="form-check-label">
                                    Recordarme
                                </label>
                            </div>
                        </Form.Group>
                        
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary hover-lift" disabled={isSubmitting}>
                                {isSubmitting ? 
                                    <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Iniciando sesión...</> : 
                                    'Iniciar Sesión'}
                            </button>
                        </div>

                        <div className="mt-3 text-center">
                            <p>¿No tienes cuenta? <a href="/registro" className="text-primary link-underline">Regístrate aquí</a></p>
                        </div>
                    </FormikForm>
                )}
            </Formik>
        </Container>
    );
};

export default FormularioInicioSesion;