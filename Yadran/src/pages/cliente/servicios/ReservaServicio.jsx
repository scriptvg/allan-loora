import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Star, ArrowLeft, InfoCircle, Calendar, Clock, GeoAlt, CurrencyDollar } from 'react-bootstrap-icons';
import { usarAutenticacion } from '../../../config/context/AuthContext';

const ReservaServicio = () => {
    const { id } = useParams();
    const { usuario } = usarAutenticacion();
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);
    const [servicio, setServicio] = useState(null);
    const [formData, setFormData] = useState({
        fecha: '',
        hora: '',
        cantidad: 1,
        comentarios: ''
    });

    // Obtener fecha mínima (hoy) para el selector de fechas
    const hoy = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const cargarServicio = async () => {
            try {
                setCargando(true);
                // Simulación de carga de datos desde la API
                // En una implementación real, estos datos vendrían del backend

                setTimeout(() => {
                    setServicio({
                        id: 'serv-002',
                        nombre: 'Spa y Masajes',
                        descripcion: 'Relájese con nuestros tratamientos de spa y masajes terapéuticos.',
                        precio: 45000,
                        imagen: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070',
                        disponible: true,
                        horario: '10:00 - 20:00',
                        ubicacion: 'Área de Spa - Piso 2',
                        opciones: [
                            { id: 'opt-1', nombre: 'Masaje Relajante', duracion: '60 min', precio: 45000 },
                            { id: 'opt-2', nombre: 'Masaje Terapéutico', duracion: '90 min', precio: 65000 },
                            { id: 'opt-3', nombre: 'Tratamiento Facial', duracion: '45 min', precio: 35000 }
                        ]
                    });
                    setCargando(false);
                }, 1000);
            } catch (error) {
                console.error('Error al cargar servicio:', error);
                setError('No se pudo cargar la información del servicio. Por favor, inténtelo de nuevo más tarde.');
                setCargando(false);
            }
        };

        if (id) {
            cargarServicio();
        } else {
            setError('ID de servicio no proporcionado');
            setCargando(false);
        }
    }, [id]);

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
        if (!formData.fecha || !formData.hora) {
            setError('Por favor, complete todos los campos obligatorios.');
            return;
        }

        try {
            setEnviando(true);
            setError('');

            // Simulación de envío de datos a la API
            // En una implementación real, estos datos se enviarían al backend

            setTimeout(() => {
                console.log('Datos de reserva de servicio enviados:', {
                    ...formData,
                    servicioId: servicio.id,
                    usuarioId: usuario.id
                });
                setExito(true);
                setEnviando(false);

                // Redireccionar después de 2 segundos
                setTimeout(() => {
                    navigate('/cliente/servicios');
                }, 2000);
            }, 1500);
        } catch (error) {
            console.error('Error al reservar servicio:', error);
            setError('Ocurrió un error al procesar su reserva de servicio. Por favor, inténtelo de nuevo.');
            setEnviando(false);
        }
    };

    const formatearPrecio = (precio) => {
        if (precio === 0) return 'Gratuito';
        return `$${precio.toLocaleString()} CLP`;
    };

    return (
        <Container fluid className="py-4">
            <Row className="mb-4 align-items-center">
                <Col>
                    <div className="d-flex align-items-center">
                        <Link to="/cliente/servicios" className="btn btn-outline-secondary me-3">
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <h1 className="mb-1">Reservar Servicio</h1>
                            <p className="text-muted mb-0">
                                Complete el formulario para reservar este servicio
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
                                <Star size={40} />
                            </div>
                        </div>
                        <h3 className="mb-3">¡Reserva de Servicio Exitosa!</h3>
                        <p className="text-muted mb-4">
                            Su reserva de servicio ha sido registrada correctamente. Será redirigido a la página de servicios en unos segundos.
                        </p>
                        <div className="d-flex justify-content-center">
                            <Link to="/cliente/servicios" className="btn btn-primary px-4">
                                Ver Servicios
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    {cargando ? (
                        <Col xs={12}>
                            <div className="text-center py-5">
                                <Spinner animation="border" variant="primary" />
                                <p className="mt-3 text-muted">Cargando información del servicio...</p>
                            </div>
                        </Col>
                    ) : error && !servicio ? (
                        <Col xs={12}>
                            <Alert variant="danger">{error}</Alert>
                            <div className="text-center">
                                <Link to="/cliente/servicios" className="btn btn-primary">
                                    Volver a Servicios
                                </Link>
                            </div>
                        </Col>
                    ) : servicio && (
                        <>
                            <Col lg={4} className="mb-4">
                                <Card className="border-0 shadow-sm h-100">
                                    <Card.Img 
                                        variant="top" 
                                        src={servicio.imagen} 
                                        alt={servicio.nombre}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        <Card.Title className="mb-3 fw-bold">{servicio.nombre}</Card.Title>
                                        <Card.Text className="text-muted mb-3">
                                            {servicio.descripcion}
                                        </Card.Text>
                                        
                                        <div className="d-flex align-items-center mb-2">
                                            <Clock size={16} className="text-primary me-2" />
                                            <span>Horario: {servicio.horario}</span>
                                        </div>
                                        
                                        <div className="d-flex align-items-center mb-2">
                                            <GeoAlt size={16} className="text-primary me-2" />
                                            <span>Ubicación: {servicio.ubicacion}</span>
                                        </div>
                                        
                                        <div className="d-flex align-items-center mb-3">
                                            <CurrencyDollar size={16} className="text-primary me-2" />
                                            <span>Precio: {formatearPrecio(servicio.precio)}</span>
                                        </div>
                                        
                                        <div className="bg-light p-3 rounded">
                                            <h6 className="mb-2">Opciones Disponibles:</h6>
                                            <ul className="list-unstyled mb-0">
                                                {servicio.opciones.map((opcion) => (
                                                    <li key={opcion.id} className="mb-2">
                                                        <div className="d-flex justify-content-between">
                                                            <span>{opcion.nombre} ({opcion.duracion})</span>
                                                            <span className="fw-medium">{formatearPrecio(opcion.precio)}</span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                            <Col lg={8}>
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="bg-white py-3">
                                        <div className="d-flex align-items-center">
                                            <Calendar size={20} className="text-primary me-2" />
                                            <h5 className="mb-0">Formulario de Reserva</h5>
                                        </div>
                                    </Card.Header>
                                    <Card.Body className="p-4">
                                        {error && (
                                            <Alert variant="danger" className="mb-4">
                                                {error}
                                            </Alert>
                                        )}

                                        <Form onSubmit={handleSubmit}>
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Fecha <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="fecha"
                                                            value={formData.fecha}
                                                            onChange={handleChange}
                                                            min={hoy}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Hora <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="time"
                                                            name="hora"
                                                            value={formData.hora}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Opción de Servicio <span className="text-danger">*</span></Form.Label>
                                                        <Form.Select
                                                            name="opcionId"
                                                            value={formData.opcionId}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="">Seleccione una opción</option>
                                                            {servicio.opciones.map((opcion) => (
                                                                <option key={opcion.id} value={opcion.id}>
                                                                    {opcion.nombre} - {opcion.duracion} - {formatearPrecio(opcion.precio)}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Cantidad de Personas</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            name="cantidad"
                                                            value={formData.cantidad}
                                                            onChange={handleChange}
                                                            min="1"
                                                            max="10"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group className="mb-4">
                                                <Form.Label>Comentarios o Solicitudes Especiales</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="comentarios"
                                                    value={formData.comentarios}
                                                    onChange={handleChange}
                                                    placeholder="Indique cualquier solicitud especial o información adicional que debamos conocer"
                                                />
                                            </Form.Group>

                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <Link to="/cliente/servicios" className="btn btn-outline-secondary me-md-2">
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
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default ReservaServicio;