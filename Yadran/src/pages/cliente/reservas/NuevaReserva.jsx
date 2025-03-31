import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarCheck, ArrowLeft, InfoCircle } from 'react-bootstrap-icons';
import { usarAutenticacion } from '../../../config/context/AuthContext';

const NuevaReserva = () => {
    const { usuario } = usarAutenticacion();
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);
    const [habitaciones, setHabitaciones] = useState([]);
    const [formData, setFormData] = useState({
        fechaEntrada: '',
        fechaSalida: '',
        habitacionId: '',
        numHuespedes: 1,
        comentarios: ''
    });

    // Obtener fecha mínima (hoy) para el selector de fechas
    const hoy = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const cargarHabitaciones = async () => {
            try {
                setCargando(true);
                // Simulación de carga de datos desde la API
                // En una implementación real, estos datos vendrían del backend

                setTimeout(() => {
                    setHabitaciones([
                        {
                            id: 'hab-001',
                            nombre: 'Suite Deluxe',
                            capacidad: 2,
                            precio: 125000,
                            disponible: true
                        },
                        {
                            id: 'hab-002',
                            nombre: 'Habitación Doble con Vista al Mar',
                            capacidad: 3,
                            precio: 95000,
                            disponible: true
                        },
                        {
                            id: 'hab-003',
                            nombre: 'Habitación Individual',
                            capacidad: 1,
                            precio: 65000,
                            disponible: true
                        },
                        {
                            id: 'hab-004',
                            nombre: 'Suite Familiar',
                            capacidad: 4,
                            precio: 150000,
                            disponible: true
                        },
                        {
                            id: 'hab-005',
                            nombre: 'Habitación Doble Estándar',
                            capacidad: 2,
                            precio: 85000,
                            disponible: false
                        }
                    ]);
                    setCargando(false);
                }, 1000);
            } catch (error) {
                console.error('Error al cargar habitaciones:', error);
                setError('No se pudieron cargar las habitaciones disponibles. Por favor, inténtelo de nuevo más tarde.');
                setCargando(false);
            }
        };

        cargarHabitaciones();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones básicas
        if (!formData.fechaEntrada || !formData.fechaSalida || !formData.habitacionId) {
            setError('Por favor, complete todos los campos obligatorios.');
            return;
        }

        // Validar que la fecha de salida sea posterior a la de entrada
        if (new Date(formData.fechaEntrada) >= new Date(formData.fechaSalida)) {
            setError('La fecha de salida debe ser posterior a la fecha de entrada.');
            return;
        }

        try {
            setEnviando(true);
            setError('');

            // Simulación de envío de datos a la API
            // En una implementación real, estos datos se enviarían al backend

            setTimeout(() => {
                console.log('Datos de reserva enviados:', formData);
                setExito(true);
                setEnviando(false);

                // Redireccionar después de 2 segundos
                setTimeout(() => {
                    navigate('/cliente/reservas');
                }, 2000);
            }, 1500);
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            setError('Ocurrió un error al procesar su reserva. Por favor, inténtelo de nuevo.');
            setEnviando(false);
        }
    };

    const habitacionSeleccionada = habitaciones.find(h => h.id === formData.habitacionId);

    return (
        <Container fluid className="py-4">
            <Row className="mb-4 align-items-center">
                <Col>
                    <div className="d-flex align-items-center">
                        <Link to="/cliente/reservas" className="btn btn-outline-secondary me-3">
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <h1 className="mb-1">Nueva Reserva</h1>
                            <p className="text-muted mb-0">
                                Complete el formulario para realizar una nueva reserva
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>

            {exito ? (
                <Card className="border-0 shadow-sm">
                    <Card.Body className="p-4 text-center">
                        <div className="mb-4">
                            <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                <CalendarCheck size={40} />
                            </div>
                        </div>
                        <h3 className="mb-3">¡Reserva Creada con Éxito!</h3>
                        <p className="text-muted mb-4">
                            Su reserva ha sido registrada correctamente. Será redirigido a la página de reservas en unos segundos.
                        </p>
                        <div className="d-flex justify-content-center">
                            <Link to="/cliente/reservas" className="btn btn-primary px-4">
                                Ver Mis Reservas
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Header className="bg-white py-3">
                                <div className="d-flex align-items-center">
                                    <CalendarCheck size={20} className="text-primary me-2" />
                                    <h5 className="mb-0">Información de la Reserva</h5>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-4">
                                {error && (
                                    <Alert variant="danger" className="mb-4">
                                        {error}
                                    </Alert>
                                )}

                                {cargando ? (
                                    <div className="text-center py-5">
                                        <Spinner animation="border" variant="primary" />
                                        <p className="mt-3 text-muted">Cargando opciones disponibles...</p>
                                    </div>
                                ) : (
                                    <Form onSubmit={handleSubmit}>
                                        <Row className="mb-4">
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Fecha de Entrada <span className="text-danger">*</span></Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="fechaEntrada"
                                                        value={formData.fechaEntrada}
                                                        onChange={handleChange}
                                                        min={hoy}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Fecha de Salida <span className="text-danger">*</span></Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="fechaSalida"
                                                        value={formData.fechaSalida}
                                                        onChange={handleChange}
                                                        min={formData.fechaEntrada || hoy}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Seleccione Habitación <span className="text-danger">*</span></Form.Label>
                                            <Form.Select
                                                name="habitacionId"
                                                value={formData.habitacionId}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">-- Seleccione una habitación --</option>
                                                {habitaciones.filter(h => h.disponible).map((habitacion) => (
                                                    <option key={habitacion.id} value={habitacion.id}>
                                                        {habitacion.nombre} - Capacidad: {habitacion.capacidad} personas - ${habitacion.precio.toLocaleString()} CLP/noche
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Número de Huéspedes <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="numHuespedes"
                                                value={formData.numHuespedes}
                                                onChange={handleChange}
                                                min="1"
                                                max={habitacionSeleccionada?.capacidad || 1}
                                                required
                                            />
                                            {habitacionSeleccionada && (
                                                <Form.Text className="text-muted">
                                                    Capacidad máxima: {habitacionSeleccionada.capacidad} personas
                                                </Form.Text>
                                            )}
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Comentarios o Solicitudes Especiales</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                name="comentarios"
                                                value={formData.comentarios}
                                                onChange={handleChange}
                                                rows={4}
                                                placeholder="Indique cualquier solicitud especial o información adicional para su estancia..."
                                            />
                                        </Form.Group>

                                        <div className="d-flex justify-content-end mt-4">
                                            <Link to="/cliente/reservas" className="btn btn-outline-secondary me-2">
                                                Cancelar
                                            </Link>
                                            <Button 
                                                type="submit" 
                                                variant="primary"
                                                disabled={enviando}
                                            >
                                                {enviando ? (
                                                    <>
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                            className="me-2"
                                                        />
                                                        Procesando...
                                                    </>
                                                ) : 'Confirmar Reserva'}
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Header className="bg-white py-3">
                                <div className="d-flex align-items-center">
                                    <InfoCircle size={20} className="text-primary me-2" />
                                    <h5 className="mb-0">Información Importante</h5>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <div className="mb-4">
                                    <h6 className="fw-bold mb-2">Política de Reservas</h6>
                                    <p className="text-muted mb-0 small">
                                        Las reservas se confirman una vez verificada la disponibilidad. Recibirá un correo electrónico con los detalles de su reserva.
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <h6 className="fw-bold mb-2">Política de Cancelación</h6>
                                    <p className="text-muted mb-0 small">
                                        Cancelaciones sin cargo hasta 48 horas antes de la fecha de llegada. Cancelaciones posteriores tendrán un cargo del 50% del valor de la primera noche.
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <h6 className="fw-bold mb-2">Check-in / Check-out</h6>
                                    <p className="text-muted mb-0 small">
                                        Check-in: 15:00 hrs<br />
                                        Check-out: 12:00 hrs
                                    </p>
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-2">Formas de Pago</h6>
                                    <p className="text-muted mb-0 small">
                                        Aceptamos tarjetas de crédito, débito y transferencias bancarias. El pago se realizará al momento del check-in.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>

                        {habitacionSeleccionada && (
                            <Card className="border-0 shadow-sm">
                                <Card.Header className="bg-white py-3">
                                    <h5 className="mb-0">Resumen de Reserva</h5>
                                </Card.Header>
                                <Card.Body className="p-4">
                                    <div className="mb-3">
                                        <h6 className="fw-bold mb-2">{habitacionSeleccionada.nombre}</h6>
                                        <p className="text-muted mb-0 small">
                                            Capacidad: {habitacionSeleccionada.capacidad} personas
                                        </p>
                                    </div>

                                    {formData.fechaEntrada && formData.fechaSalida && (
                                        <div className="mb-3">
                                            <h6 className="fw-bold mb-2">Fechas</h6>
                                            <p className="text-muted mb-0 small">
                                                Entrada: {new Date(formData.fechaEntrada).toLocaleDateString()}<br />
                                                Salida: {new Date(formData.fechaSalida).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <h6 className="fw-bold mb-2">Precio por noche</h6>
                                        <p className="text-muted mb-0 small">
                                            ${habitacionSeleccionada.precio.toLocaleString()} CLP
                                        </p>
                                    </div>

                                    {formData.fechaEntrada && formData.fechaSalida && (
                                        <div className="mt-4 pt-3 border-top">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="fw-bold">Total Estimado:</span>
                                                <span className="fw-bold text-primary fs-5">
                                                    ${(habitacionSeleccionada.precio * Math.max(1, Math.floor((new Date(formData.fechaSalida) - new Date(formData.fechaEntrada)) / (1000 * 60 * 60 * 24)))).toLocaleString()} CLP
                                                </span>
                                            </div>
                                            <p className="text-muted mb-0 small">
                                                Impuestos incluidos
                                            </p>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default NuevaReserva;