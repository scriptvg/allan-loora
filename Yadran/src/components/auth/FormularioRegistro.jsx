import React, { useState, useEffect } from 'react'

import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import EsquemaRegistroYup from './Esquemas/EsquemaRegistroYup.jsx'

import { useNavigate } from 'react-router-dom'

import useUsuarios from '../../config/hooks/useUsuarios.jsx'
import { usarAutenticacion } from '../../config/context/AuthContext.jsx'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { Form, Container, Row, Col } from 'react-bootstrap'


function FormularioRegistro() {
    // Fix: Use object destructuring instead of array destructuring
    const { registrarUsuario } = useUsuarios();
    const { autenticarInicioSesion, estaAutenticado, usuario } = usarAutenticacion();
    const [error, establecerError] = useState(null);
    const [mostrarPassword, establecerMostrarPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (estaAutenticado) {
            const timer = setTimeout(() => {
                navigate('/iniciar-sesion');
            }, 1500)

            return () => clearTimeout(timer)
        }
    }, [estaAutenticado, navigate]);

    const manejarEnvio = async (valores, { setSubmitting }) => {
        console.log('Valores enviados:', valores);
        establecerError(null);

        try {
            const datosUsuario = await registrarUsuario(valores);
            if (datosUsuario) {
                autenticarInicioSesion(datosUsuario);
            }
        } catch (error) {
            console.log('Error al registrar usuario:', error);
            establecerError(error.message || 'Error al registrar usuario');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <Container className="mt-5">
                <h2>Registro de Usuario</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {estaAutenticado && (
                    <div className="alert alert-success">
                        ¡Registro exitoso! Bienvenido {usuario?.nombre || usuario?.email || 'Usuario'}
                        <div className="small mt-1">Redirigiendo al inicio...</div>
                    </div>
                )}

                <Formik
                    initialValues={{
                        nombre: '',
                        apellido: '',
                        email: '',
                        password: '',
                        confirmarPassword: '',
                        terminosCondiciones: false
                    }}
                    validationSchema={EsquemaRegistroYup}
                    onSubmit={manejarEnvio}
                >
                    {({ isSubmitting }) => (
                        <FormikForm>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formNombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Field type="text" name="nombre" className="form-control" placeholder="Ingresa tu nombre" />
                                        <ErrorMessage name="nombre" component="div" className="text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formApellido">
                                        <Form.Label>Apellido</Form.Label>
                                        <Field type="text" name="apellido" className="form-control" placeholder="Ingresa tu apellido" />
                                        <ErrorMessage name="apellido" component="div" className="text-danger" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Field type="email" name="email" className="form-control" placeholder="ejemplo@correo.com" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Contraseña</Form.Label>
                                        <div className="input-group">
                                            <Field
                                                type={mostrarPassword ? 'text' : 'password'}
                                                name="password"
                                                className="form-control"
                                                placeholder="Crea una contraseña segura"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => establecerMostrarPassword(!mostrarPassword)}
                                            >
                                                <i className={`bi bi-${mostrarPassword ? 'eye-slash' : 'eye'}`}></i>
                                            </button>
                                        </div>
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formConfirmarPassword">
                                        <Form.Label>Confirmar Contraseña</Form.Label>
                                        <Field
                                            type={mostrarPassword ? 'text' : 'password'}
                                            name="confirmarPassword"
                                            className="form-control"
                                            placeholder="Confirma tu contraseña"
                                        />
                                        <ErrorMessage name="confirmarPassword" component="div" className="text-danger" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <div className="form-check">
                                    <Field
                                        type="checkbox"
                                        name="terminosCondiciones"
                                        id="terminosCondiciones"
                                        className="form-check-input"
                                    />
                                    <label htmlFor="terminosCondiciones" className="form-check-label">
                                        Acepto los <a href="/terminos-condiciones">términos y condiciones</a>
                                    </label>
                                </div>
                                <ErrorMessage name="terminosCondiciones" component="div" className="text-danger" />
                            </Form.Group>

                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ?
                                        <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Registrando...</> :
                                        'Registrarse'}
                                </button>
                            </div>

                            <div className="mt-3 text-center">
                                <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
                            </div>
                        </FormikForm>
                    )}
                </Formik>
            </Container>
        </>
    )
}

export default FormularioRegistro;