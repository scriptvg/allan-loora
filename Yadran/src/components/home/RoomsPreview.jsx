import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/RoomsPreview.css';

const RoomsPreview = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función auxiliar para obtener tipo de habitación en formato legible
    const getTipoHabitacion = (tipo) => {
        const tipos = {
            'indi': 'Individual',
            'doble': 'Doble',
            'suite': 'Suite',
            'family': 'Familiar'
        };
        return tipos[tipo] || tipo;
    };

    // Cargar habitaciones desde la API
    useEffect(() => {
        const cargarHabitaciones = async () => {
            try {
                setLoading(true);
                const respuesta = await fetch('http://localhost:3001/habitaciones');

                if (!respuesta.ok) throw new Error('Error al cargar las habitaciones');

                const data = await respuesta.json();
                setHabitaciones(data.slice(0, 3)); // Solo las primeras 3
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar habitaciones:", error);
                setError("No se pudieron cargar las habitaciones. Intente de nuevo más tarde.");
                setLoading(false);
            }
        };

        cargarHabitaciones();
    }, []);

    return (
        <div className="bg-light py-5">
            <Container>
                <div className="section-title-container">
                    <h2 className="section-title">Nuestras Habitaciones</h2>
                    <p className="section-subtitle">
                        Diseñadas pensando en su comodidad y equipadas con todo lo necesario
                        para garantizarle una estancia perfecta y memorable.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-3 text-muted">Cargando habitaciones...</p>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger mt-4">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                    </div>
                ) : (
                    <Row xs={1} md={3} className="g-4 mt-3">
                        {habitaciones.length > 0 ? (
                            habitaciones.map((habitacion) => (
                                <Col key={habitacion.id}>
                                    <div className="room-card">
                                        <div className="room-img">
                                            <img
                                                src={habitacion.imgHabitacion?.imgs[0] || "https://placehold.co/600x400/1e4d6b/fff?text=Habitación"}
                                                alt={habitacion.nombre}
                                            />
                                            <div className="price-tag">${habitacion.precio}/noche</div>
                                        </div>
                                        <div className="room-details">
                                            <h4 className="room-title">{habitacion.nombre}</h4>
                                            <div className="room-type mb-2">
                                                <span className="badge bg-primary">
                                                    {getTipoHabitacion(habitacion.tipo)}
                                                </span>
                                                <span className="ms-2">
                                                    <i className="bi bi-people-fill text-primary me-1"></i>
                                                    Capacidad: {habitacion.capacidad} personas
                                                </span>
                                            </div>
                                            <p className="room-description">
                                                {habitacion.descripcion || "Sin descripción disponible"}
                                            </p>
                                            <div className="d-grid">
                                                <Button
                                                    variant="outline-primary"
                                                    as={Link}
                                                    to={`/habitaciones/${habitacion.id}`}
                                                    className="btn-hover-fill"
                                                >
                                                    Ver Detalles
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        ) : (
                            <Col xs={12} className="text-center py-5">
                                <i className="bi bi-house-slash fs-1 text-muted"></i>
                                <h4 className="mt-3">No hay habitaciones disponibles</h4>
                                <p className="text-muted">Pruebe de nuevo más tarde.</p>
                            </Col>
                        )}
                    </Row>
                )}

                <div className="text-center mt-5">
                    <Button as={Link} to="/habitaciones" variant="primary" size="lg" className="rounded-pill px-4">
                        Ver Todas las Habitaciones
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default RoomsPreview;