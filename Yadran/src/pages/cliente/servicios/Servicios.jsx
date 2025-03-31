import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Search } from 'react-bootstrap-icons';
import { usarAutenticacion } from '../../../config/context/AuthContext';

const Servicios = () => {
    const { usuario } = usarAutenticacion();
    const navigate = useNavigate();
    const [servicios, setServicios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        const cargarServicios = async () => {
            try {
                setCargando(true);
                // Simulación de carga de datos desde la API
                // En una implementación real, estos datos vendrían del backend

                setTimeout(() => {
                    setServicios([
                        {
                            id: 'serv-001',
                            nombre: 'Desayuno Buffet',
                            descripcion: 'Disfrute de un completo desayuno buffet con opciones locales e internacionales.',
                            precio: 15000,
                            imagen: 'https://images.unsplash.com/photo-1533089860892-a9b9ac6cd6a4?q=80&w=2070',
                            disponible: true,
                            horario: '7:00 - 10:30',
                            ubicacion: 'Restaurante Principal'
                        },
                        {
                            id: 'serv-002',
                            nombre: 'Spa y Masajes',
                            descripcion: 'Relájese con nuestros tratamientos de spa y masajes terapéuticos.',
                            precio: 45000,
                            imagen: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070',
                            disponible: true,
                            horario: '10:00 - 20:00',
                            ubicacion: 'Área de Spa - Piso 2'
                        },
                        {
                            id: 'serv-003',
                            nombre: 'Servicio a la Habitación',
                            descripcion: 'Comidas y bebidas entregadas directamente a su habitación.',
                            precio: 5000,
                            imagen: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071',
                            disponible: true,
                            horario: '24 horas',
                            ubicacion: 'Disponible en todas las habitaciones'
                        },
                        {
                            id: 'serv-004',
                            nombre: 'Tour Guiado por la Ciudad',
                            descripcion: 'Explore los principales atractivos de la ciudad con un guía experto.',
                            precio: 35000,
                            imagen: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?q=80&w=2070',
                            disponible: true,
                            horario: '9:00 - 17:00',
                            ubicacion: 'Punto de encuentro: Lobby'
                        },
                        {
                            id: 'serv-005',
                            nombre: 'Gimnasio',
                            descripcion: 'Manténgase en forma durante su estancia con nuestro gimnasio completamente equipado.',
                            precio: 0,
                            imagen: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070',
                            disponible: true,
                            horario: '6:00 - 22:00',
                            ubicacion: 'Piso 3'
                        },
                        {
                            id: 'serv-006',
                            nombre: 'Cena Romántica',
                            descripcion: 'Cena especial para dos con vistas al mar y menú de degustación.',
                            precio: 85000,
                            imagen: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070',
                            disponible: true,
                            horario: '19:00 - 23:00',
                            ubicacion: 'Terraza - Piso 10'
                        }
                    ]);
                    setCargando(false);
                }, 1000);
            } catch (error) {
                console.error('Error al cargar servicios:', error);
                setCargando(false);
            }
        };

        cargarServicios();
    }, []);

    const serviciosFiltrados = servicios.filter(servicio => 
        servicio.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        servicio.descripcion.toLowerCase().includes(filtro.toLowerCase())
    );

    const formatearPrecio = (precio) => {
        if (precio === 0) return 'Gratuito';
        return `$${precio.toLocaleString()} CLP`;
    };

    return (
        <Container fluid className="py-4">
            <Row className="mb-4 align-items-center">
                <Col>
                    <h1 className="mb-1">Servicios del Hotel</h1>
                    <p className="text-muted mb-0">
                        Explore y reserve los servicios exclusivos disponibles durante su estancia
                    </p>
                </Col>
                <Col xs="auto">
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar servicio..."
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                        <Search size={16} className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                    </div>
                </Col>
            </Row>

            {cargando ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Cargando servicios disponibles...</p>
                </div>
            ) : serviciosFiltrados.length === 0 ? (
                <div className="text-center py-5">
                    <div className="mb-3">
                        <Star size={48} className="text-muted" />
                    </div>
                    <h5>No se encontraron servicios</h5>
                    <p className="text-muted">
                        {filtro ? 'No hay resultados para su búsqueda' : 'No hay servicios disponibles en este momento'}
                    </p>
                </div>
            ) : (
                <Row>
                    {serviciosFiltrados.map((servicio) => (
                        <Col lg={4} md={6} className="mb-4" key={servicio.id}>
                            <Card className="h-100 border-0 shadow-sm service-card">
                                <div className="position-relative">
                                    <Card.Img 
                                        variant="top" 
                                        src={servicio.imagen} 
                                        alt={servicio.nombre}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                        className="service-image"
                                    />
                                    <div className="position-absolute top-0 end-0 m-3">
                                        {!servicio.disponible && (
                                            <span className="badge bg-danger">No Disponible</span>
                                        )}
                                        {servicio.precio === 0 && (
                                            <span className="badge bg-success">Gratuito</span>
                                        )}
                                    </div>
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="mb-3 fw-bold">{servicio.nombre}</Card.Title>
                                    <Card.Text className="text-muted mb-3">
                                        {servicio.descripcion}
                                    </Card.Text>
                                    <div className="mt-auto">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div>
                                                <small className="text-muted d-block">Precio</small>
                                                <span className="fw-bold text-primary">{formatearPrecio(servicio.precio)}</span>
                                            </div>
                                            <div className="text-end">
                                                <small className="text-muted d-block">Horario</small>
                                                <span className="fw-medium">{servicio.horario}</span>
                                            </div>
                                        </div>
                                        <small className="text-muted d-block mb-3">
                                            <strong>Ubicación:</strong> {servicio.ubicacion}
                                        </small>
                                        <div className="d-grid">
                                            <Button 
                                                variant={servicio.disponible ? "primary" : "secondary"}
                                                disabled={!servicio.disponible}
                                                className="hover-lift"
                                                onClick={() => servicio.disponible && navigate(`/cliente/servicios/reservar/${servicio.id}`)}
                                            >
                                                {servicio.disponible ? 'Reservar Ahora' : 'No Disponible'}
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Servicios;