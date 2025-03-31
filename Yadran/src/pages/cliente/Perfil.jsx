import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Person, Key, EnvelopeAt, Phone, GeoAlt, Calendar } from 'react-bootstrap-icons';
import { usarAutenticacion } from '../../config/context/AuthContext';

const Perfil = () => {
    const { usuario } = usarAutenticacion();
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        fechaNacimiento: '',
        contrasenaActual: '',
        nuevaContrasena: '',
        confirmarContrasena: ''
    });

    useEffect(() => {
        const cargarDatosUsuario = async () => {
            try {
                setCargando(true);
                // Simulación de carga de datos desde la API
                // En una implementación real, estos datos vendrían del backend

                setTimeout(() => {
                    setDatosUsuario({
                        ...datosUsuario,
                        nombre: 'Juan',
                        apellido: 'Pérez',
                        email: 'juan.perez@ejemplo.com',
                        telefono: '+56 9 1234 5678',
                        direccion: 'Av. Principal 123, Santiago',
                        fechaNacimiento: '1985-06-15'
                    });
                    setCargando(false);
                }, 1000);
            } catch (error) {
                console.error('Error al cargar datos del usuario:', error);
                setError('No se pudieron cargar sus datos personales. Por favor, inténtelo de nuevo más tarde.');
                setCargando(false);
            }
        };

        cargarDatosUsuario();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosUsuario({
            ...datosUsuario,
            [name]: value
        });
    };

    const handleSubmitDatosPersonales = async (e) => {
        e.preventDefault();
        
        try {
            setGuardando(true);
            setError('');
            setExito(false);

            // Simulación de envío de datos a la API
            // En una implementación real, estos datos se enviarían al backend

            setTimeout(() => {
                console.log('Datos personales actualizados:', datosUsuario);
                setExito(true);
                setGuardando(false);

                // Ocultar mensaje de éxito después de 3 segundos
                setTimeout(() => {
                    setExito(false);
                }, 3000);
            }, 1500);
        } catch (error) {
            console.error('Error al actualizar datos personales:', error);
            setError('Ocurrió un error al actualizar sus datos personales. Por favor, inténtelo de nuevo.');
            setGuardando(false);
        }
    };

    const handleSubmitCambioContrasena = async (e) => {
        e.preventDefault();
        
        // Validaciones básicas
        if (!datosUsuario.contrasenaActual || !datosUsuario.nuevaContrasena || !datosUsuario.confirmarContrasena) {
            setError('Por favor, complete todos los campos de contraseña.');
            return;
        }

        if (datosUsuario.nuevaContrasena !== datosUsuario.confirmarContrasena) {
            setError('La nueva contraseña y su confirmación no coinciden.');
            return;
        }

        try {
            setGuardando(true);
            setError('');
            setExito(false);

            // Simulación de envío de datos a la API
            // En una implementación real, estos datos se enviarían al backend

            setTimeout(() => {
                console.log('Contraseña actualizada');
                setExito(true);
                setGuardando(false);
                
                // Limpiar campos de contraseña
                setDatosUsuario({
                    ...datosUsuario,
                    contrasenaActual: '',
                    nuevaContrasena: '',
                    confirmarContrasena: ''
                });

                // Ocultar mensaje de éxito después de 3 segundos
                setTimeout(() => {
                    setExito(false);
                }, 3000);
            }, 1500);
        } catch (error) {
            console.error('Error al cambiar contraseña:', error);
            setError('Ocurrió un error al cambiar su contraseña. Por favor, inténtelo de nuevo.');
            setGuardando(false);
        }
    };

    return (
        <Container fluid className="py-4">
            <Row className="mb-4">
                <Col>
                    <h1 className="mb-1">Mi Perfil</h1>
                    <p className="text-muted mb-0">
                        Administre su información personal y configuración de cuenta
                    </p>
                </Col>
            </Row>

            {error && (
                <Alert variant="danger" className="mb-4" onClose={() => setError('')} dismissible>
                    {error}
                </Alert>
            )}

            {exito && (
                <Alert variant="success" className="mb-4">
                    ¡Información actualizada correctamente!
                </Alert>
            )}

            {cargando ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Cargando su información personal...</p>
                </div>
            ) : (
                <Row>
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Header className="bg-white py-3">
                                <div className="d-flex align-items-center">
                                    <Person size={20} className="text-primary me-2" />
                                    <h5 className="mb-0">Información Personal</h5>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <Form onSubmit={handleSubmitDatosPersonales}>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="nombre"
                                                    value={datosUsuario.nombre}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Apellido</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="apellido"
                                                    value={datosUsuario.apellido}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Correo Electrónico</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <EnvelopeAt size={16} />
                                            </span>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={datosUsuario.email}
                                                onChange={handleChange}
                                                required
                                                disabled
                                            />
                                        </div>
                                        <Form.Text className="text-muted">
                                            El correo electrónico no se puede modificar
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Teléfono</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <Phone size={16} />
                                            </span>
                                            <Form.Control
                                                type="text"
                                                name="telefono"
                                                value={datosUsuario.telefono}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Dirección</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <GeoAlt size={16} />
                                            </span>
                                            <Form.Control
                                                type="text"
                                                name="direccion"
                                                value={datosUsuario.direccion}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Fecha de Nacimiento</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <Calendar size={16} />
                                            </span>
                                            <Form.Control
                                                type="date"
                                                name="fechaNacimiento"
                                                value={datosUsuario.fechaNacimiento}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>

                                    <div className="d-flex justify-content-end">
                                        <Button 
                                            type="submit" 
                                            variant="primary"
                                            disabled={guardando}
                                        >
                                            {guardando ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className="me-2"
                                                    />
                                                    Guardando...
                                                </>
                                            ) : 'Guardar Cambios'}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white py-3">
                                <div className="d-flex align-items-center">
                                    <Key size={20} className="text-primary me-2" />
                                    <h5 className="mb-0">Cambiar Contraseña</h5>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <Form onSubmit={handleSubmitCambioContrasena}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Contraseña Actual</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="contrasenaActual"
                                            value={datosUsuario.contrasenaActual}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Nueva Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="nuevaContrasena"
                                            value={datosUsuario.nuevaContrasena}
                                            onChange={handleChange}
                                        />
                                        <Form.Text className="text-muted">
                                            La contraseña debe tener al menos 8 caracteres, incluir letras mayúsculas, minúsculas y números
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmarContrasena"
                                            value={datosUsuario.confirmarContrasena}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <div className="d-flex justify-content-end">
                                        <Button 
                                            type="submit" 
                                            variant="primary"
                                            disabled={guardando}
                                        >
                                            {guardando ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className="me-2"
                                                    />
                                                    Actualizando...
                                                </>
                                            ) : 'Cambiar Contraseña'}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Header className="bg-white py-3">
                                <h5 className="mb-0">Información de la Cuenta</h5>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <div className="text-center mb-4">
                                    <div className="avatar-circle mb-3 mx-auto">
                                        <span className="avatar-initials">
                                            {datosUsuario.nombre && datosUsuario.apellido ? 
                                                `${datosUsuario.nombre.charAt(0)}${datosUsuario.apellido.charAt(0)}` : 'JP'}
                                        </span>
                                    </div>
                                    <h5 className="mb-1">{`${datosUsuario.nombre} ${datosUsuario.apellido}`}</h5>
                                    <p className="text-muted mb-0">{datosUsuario.email}</p>
                                </div>

                                <div className="mb-3">
                                    <small className="text-muted d-block mb-1">Tipo de Cuenta</small>
                                    <p className="mb-0"><span className="badge bg-primary">Cliente</span></p>
                                </div>

                                <div className="mb-3">
                                    <small className="text-muted d-block mb-1">Miembro desde</small>
                                    <p className="mb-0">Octubre 2023</p>
                                </div>

                                <div className="mb-3">
                                    <small className="text-muted d-block mb-1">Última actividad</small>
                                    <p className="mb-0">Hoy, 15:30</p>
                                </div>

                                <hr className="my-4" />

                                <div className="d-grid gap-2">
                                    <Button variant="outline-danger" size="sm">
                                        Cerrar Sesión
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white py-3">
                                <h5 className="mb-0">Preferencias</h5>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <Form>
                                    <Form.Check 
                                        type="switch"
                                        id="notificaciones-email"
                                        label="Recibir notificaciones por email"
                                        defaultChecked
                                        className="mb-3"
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="ofertas-especiales"
                                        label="Recibir ofertas especiales"
                                        defaultChecked
                                        className="mb-3"
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="confirmacion-reserva"
                                        label="Confirmación de reserva por SMS"
                                        className="mb-3"
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="newsletter"
                                        label="Suscripción al newsletter"
                                        defaultChecked
                                        className="mb-3"
                                    />
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Perfil;