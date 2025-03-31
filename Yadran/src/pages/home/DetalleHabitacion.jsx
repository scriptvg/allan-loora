import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Badge, ListGroup, Spinner } from "react-bootstrap";
import { formatearMoneda } from "../../config/utils/formatUtils";
import { habitacionesApi } from "../../config/api/habitacionesApi";
import "./components/habitaciones/styles/DetalleHabitacion.css";

const DetalleHabitacion = () => {
    const { id } = useParams();
    const [habitacion, setHabitacion] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [fechaEntrada, setFechaEntrada] = useState("");
    const [fechaSalida, setFechaSalida] = useState("");
    const [huespedes, setHuespedes] = useState(1);
    const [imgPrincipal, setImgPrincipal] = useState("");

    useEffect(() => {
        const cargarHabitacion = async () => {
            try {
                setCargando(true);
                const datos = await habitacionesApi.obtenerHabitacionPorId(id);
                setHabitacion(datos);

                if (datos.imgsHabitacion?.img && datos.imgsHabitacion.img.length > 0) {
                    setImgPrincipal(datos.imgsHabitacion.img[0]);
                } else if (datos.imgsHabitacion?.imgHabitacion && datos.imgsHabitacion.imgHabitacion.length > 0) {
                    setImgPrincipal(datos.imgsHabitacion.imgHabitacion[0]);
                }
            } catch (error) {
                console.error("Error al cargar detalles de la habitación:", error);
                setError("No se pudo cargar la información de la habitación");
            } finally {
                setCargando(false);
            }
        };

        cargarHabitacion();
    }, [id]);

    const manejarReserva = (e) => {
        e.preventDefault();
        
        // Aquí implementarías la lógica para crear una reserva
        // Por ahora mostramos una alerta con la información
        alert(`Reserva confirmada para ${fechaEntrada} hasta ${fechaSalida} para ${huespedes} huéspedes`);
    };

    const cambiarImagenPrincipal = (img) => {
        setImgPrincipal(img);
    };

    const obtenerTipoHabitacion = (tipo) => {
        const TIPOS = {
            'individual': 'Individual',
            'doble': 'Doble',
            'suite': 'Suite',
            'familiar': 'Familiar'
        };
        return TIPOS[tipo] || tipo;
    };

    const obtenerIconoServicio = (servicio) => {
        const ICONOS_SERVICIO = {
            'bano_privado': 'water',
            'vista_al_mar': 'binoculars',
            'tv': 'tv',
            'wifi': 'wifi',
            'aire_acondicionado': 'thermometer-snow',
            'minibar': 'cup-hot',
            'caja_fuerte': 'safe',
            'escritorio': 'laptop',
            'desayuno': 'egg-fried',
            'limpieza_diaria': 'brush',
            'telefono': 'telephone',
            'secador_pelo': 'wind'
        };

        return ICONOS_SERVICIO[servicio] || 'check-circle';
    };

    const obtenerTodasLasImagenes = () => {
        let imagenes = [];

        if (habitacion?.imgsHabitacion?.img && habitacion.imgsHabitacion.img.length > 0) {
            imagenes = [...imagenes, ...habitacion.imgsHabitacion.img];
        }

        if (habitacion?.imgsHabitacion?.imgHabitacion && habitacion.imgsHabitacion.imgHabitacion.length > 0) {
            imagenes = [...imagenes, ...habitacion.imgsHabitacion.imgHabitacion];
        }

        return imagenes;
    };

    if (cargando) {
        return (
            <Container className="py-5 text-center">
                <div className="spinner-container" style={{ marginTop: "100px", minHeight: "60vh" }}>
                    <Spinner animation="border" role="status" variant="primary" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                    <div className="mt-3 fw-light fs-5">Buscando información de la habitación...</div>
                </div>
            </Container>
        );
    }

    if (error || !habitacion) {
        return (
            <Container className="py-5 text-center">
                <div className="error-container" style={{ minHeight: "60vh" }}>
                    <i className="bi bi-exclamation-triangle-fill text-danger" style={{ fontSize: "3rem" }}></i>
                    <h2 className="mt-3">Habitación no encontrada</h2>
                    <p className="text-muted">{error || "Lo sentimos, no pudimos encontrar la habitación que estás buscando."}</p>
                    <Button as={Link} to="/habitaciones" variant="primary" className="mt-3">
                        Volver a Habitaciones
                    </Button>
                </div>
            </Container>
        );
    }

    const todasLasImagenes = obtenerTodasLasImagenes();

    return (
        <div className="detalle-habitacion-page">
            <div className="breadcrumb-container bg-light py-2">
                <Container>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to="/">Inicio</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/habitaciones">Habitaciones</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {habitacion.nombre || `Habitación ${habitacion.id}`}
                            </li>
                        </ol>
                    </nav>
                </Container>
            </div>

            <Container className="py-5">
                <Row>
                    <Col lg={8}>
                        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                            <div>
                                <h1 className="mb-2">{habitacion.nombre || `Habitación ${habitacion.id}`}</h1>
                                <div className="d-flex align-items-center flex-wrap">
                                    <Badge bg="primary" className="me-2 px-3 py-2 mb-2 mb-md-0">
                                        {obtenerTipoHabitacion(habitacion.tipo)}
                                    </Badge>
                                    <Badge
                                        bg={habitacion.estado === 'Disponible' ? 'success' : 'secondary'}
                                        className="me-2 px-3 py-2 mb-2 mb-md-0"
                                    >
                                        {habitacion.estado || 'No disponible'}
                                    </Badge>
                                    <div className="ms-0 ms-md-3 d-flex align-items-center mt-2 mt-md-0">
                                        <i className="bi bi-people-fill me-2 text-primary"></i>
                                        <span>Capacidad para <strong>{habitacion.capacidad}</strong> personas</span>
                                    </div>
                                </div>
                            </div>
                            <div className="precio-container mt-3 mt-md-0">
                                <span className="precio-label">Precio por noche</span>
                                <span className="precio-valor">{formatearMoneda(habitacion.precio)}</span>
                            </div>
                        </div>

                        <div className="galeria-habitacion mb-5">
                            <div className="imagen-principal mb-3">
                                <img
                                    src={imgPrincipal || "https://placehold.co/800x500/1e4d6b/fff?text=Habitación"}
                                    alt={habitacion.nombre || "Habitación"}
                                    className="img-fluid rounded shadow-sm"
                                />
                            </div>
                            {todasLasImagenes.length > 0 && (
                                <Row className="imagenes-miniaturas">
                                    {todasLasImagenes.map((img, index) => (
                                        <Col xs={4} md={3} key={index} className="mb-3">
                                            <div
                                                className={`miniatura ${imgPrincipal === img ? 'active' : ''}`}
                                                onClick={() => cambiarImagenPrincipal(img)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Vista ${index + 1} de ${habitacion.nombre || 'la habitación'}`}
                                                    className="img-fluid rounded shadow-sm"
                                                />
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </div>

                        <div className="descripcion-habitacion mb-5">
                            <h3 className="mb-3">Descripción</h3>
                            <p>{habitacion.descripcion || "Sin descripción disponible para esta habitación."}</p>

                            <Row className="caracteristicas-basicas mt-4">
                                <Col md={4} className="mb-3">
                                    <Card className="h-100 border-0 shadow-sm p-3 text-center">
                                        <div className="caracteristica-icono">
                                            <i className="bi bi-rulers"></i>
                                        </div>
                                        <h5>Tamaño</h5>
                                        <p className="mb-0">{habitacion.tamaño || "25"} m²</p>
                                    </Card>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Card className="h-100 border-0 shadow-sm p-3 text-center">
                                        <div className="caracteristica-icono">
                                            <i className="bi bi-people"></i>
                                        </div>
                                        <h5>Ocupación</h5>
                                        <p className="mb-0">Hasta {habitacion.capacidad} personas</p>
                                    </Card>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <Card className="h-100 border-0 shadow-sm p-3 text-center">
                                        <div className="caracteristica-icono">
                                            <i className="bi bi-cash"></i>
                                        </div>
                                        <h5>Precio</h5>
                                        <p className="mb-0">{formatearMoneda(habitacion.precio)}/noche</p>
                                    </Card>
                                </Col>
                            </Row>
                        </div>

                        {habitacion.servicios && habitacion.servicios.length > 0 && (
                            <div className="servicios-habitacion mb-5">
                                <h3 className="mb-3">Servicios y Amenidades</h3>
                                <Row>
                                    {habitacion.servicios.map((servicio, index) => (
                                        <Col md={4} key={index} className="mb-3">
                                            <div className="servicio-item d-flex align-items-center">
                                                <div className="servicio-icono me-3">
                                                    <i className={`bi bi-${obtenerIconoServicio(servicio)}`}></i>
                                                </div>
                                                <div className="servicio-nombre">
                                                    {servicio.replace(/_/g, ' ')}
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}

                        <div className="politicas-habitacion mb-5">
                            <h3 className="mb-3">Políticas</h3>
                            <Row>
                                <Col md={6}>
                                    <Card className="border-0 shadow-sm">
                                        <Card.Body>
                                            <h5 className="mb-3">Check-in / Check-out</h5>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                                                    <span>Check-in</span>
                                                    <Badge bg="light" text="dark">Desde las 14:00</Badge>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                                                    <span>Check-out</span>
                                                    <Badge bg="light" text="dark">Hasta las 12:00</Badge>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="border-0 shadow-sm">
                                        <Card.Body>
                                            <h5 className="mb-3">Cancelación</h5>
                                            <p className="mb-0">Cancelación gratuita hasta 48 horas antes del check-in. Después de ese momento, se cobrará la primera noche.</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    <Col lg={4}>
                        <Card className="reserva-card sticky-lg-top border-0 shadow-sm" style={{ top: "2rem" }}>
                            <Card.Header className="text-center bg-primary text-white py-3">
                                <h3 className="mb-0">Reservar Ahora</h3>
                            </Card.Header>
                            <Card.Body>
                                <div className="precio-resumen text-center mb-4">
                                    <span className="precio-valor-grande">{formatearMoneda(habitacion.precio)}</span>
                                    <span className="precio-periodo">/noche</span>
                                </div>

                                <Form onSubmit={manejarReserva}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Fecha de llegada</Form.Label>
                                        <Form.Control
                                            type="date"
                                            required
                                            value={fechaEntrada}
                                            onChange={(e) => setFechaEntrada(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Fecha de salida</Form.Label>
                                        <Form.Control
                                            type="date"
                                            required
                                            value={fechaSalida}
                                            onChange={(e) => setFechaSalida(e.target.value)}
                                            min={fechaEntrada || new Date().toISOString().split('T')[0]}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Número de huéspedes</Form.Label>
                                        <Form.Select
                                            value={huespedes}
                                            onChange={(e) => setHuespedes(parseInt(e.target.value))}
                                        >
                                            {[...Array(habitacion.capacidad || 1)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1} {i === 0 ? 'Huésped' : 'Huéspedes'}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    {fechaEntrada && fechaSalida && (
                                        <div className="resumen-reserva mb-4">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Precio por noche</span>
                                                <span>{formatearMoneda(habitacion.precio)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Noches</span>
                                                <span>
                                                    {Math.max(1, Math.ceil((new Date(fechaSalida) - new Date(fechaEntrada)) / (1000 * 60 * 60 * 24)))}
                                                </span>
                                            </div>
                                            <div className="d-flex justify-content-between fw-bold pt-2 border-top">
                                                <span>Total</span>
                                                <span>
                                                    {formatearMoneda(habitacion.precio * Math.max(1, Math.ceil((new Date(fechaSalida) - new Date(fechaEntrada)) / (1000 * 60 * 60 * 24))))}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="d-grid">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="reservar-btn py-3"
                                            disabled={habitacion.estado !== "Disponible"}
                                        >
                                            {habitacion.estado === "Disponible" ? "Reservar Ahora" : "No Disponible"}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DetalleHabitacion;
