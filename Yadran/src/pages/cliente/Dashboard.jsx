import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CalendarCheck, Person, Star, Clock } from 'react-bootstrap-icons';
import { usarAutenticacion } from '../../config/context/AuthContext';
import { reservasApi } from '../../config/api/reservasApi';
import { formatearFecha } from '../../config/utils/formatUtils';

const Dashboard = () => {
    const { usuario } = usarAutenticacion();
    const [proximasReservas, setProximasReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [estadisticas, setEstadisticas] = useState({
        totalReservas: 0,
        reservasActivas: 0,
        ultimaActividad: null
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setCargando(true);
                // Simulación de carga de datos desde la API
                // En una implementación real, estos datos vendrían del backend

                setTimeout(() => {
                    setProximasReservas([
                        {
                            id: 'res-001',
                            habitacion: 'Suite Deluxe',
                            fechaEntrada: '2023-12-15',
                            fechaSalida: '2023-12-20',
                            estado: 'Confirmada',
                            precio: 125000
                        },
                        {
                            id: 'res-002',
                            habitacion: 'Habitación Doble con Vista al Mar',
                            fechaEntrada: '2024-01-10',
                            fechaSalida: '2024-01-15',
                            estado: 'Pendiente',
                            precio: 95000
                        }
                    ]);

                    setEstadisticas({
                        totalReservas: 5,
                        reservasActivas: 2,
                        ultimaActividad: new Date()
                    });

                    setCargando(false);
                }, 1000);
            } catch (error) {
                console.error('Error al cargar datos del dashboard:', error);
                setCargando(false);
            }
        };

        cargarDatos();
    }, []);

    return (
        <div className="cliente-dashboard-page">
            <div className="welcome-header mb-4">
                <h1 className="mb-2">Bienvenido, {usuario?.nombre || 'Cliente'}</h1>
                <p className="text-muted">
                    Panel de control del cliente - Gestione sus reservas y servicios
                </p>
            </div>

            <Row className="stats-row mb-4">
                <Col md={4} className="mb-3">
                    <Card className="h-100 border-0 shadow-sm stats-card">
                        <Card.Body className="d-flex align-items-center">
                            <div className="stats-icon bg-primary-light text-primary">
                                <CalendarCheck size={24} />
                            </div>
                            <div className="ms-3">
                                <h6 className="stats-label mb-1">Total Reservas</h6>
                                <h3 className="stats-value mb-0">{estadisticas.totalReservas}</h3>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} className="mb-3">
                    <Card className="h-100 border-0 shadow-sm stats-card">
                        <Card.Body className="d-flex align-items-center">
                            <div className="stats-icon bg-success-light text-success">
                                <Star size={24} />
                            </div>
                            <div className="ms-3">
                                <h6 className="stats-label mb-1">Reservas Activas</h6>
                                <h3 className="stats-value mb-0">{estadisticas.reservasActivas}</h3>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} className="mb-3">
                    <Card className="h-100 border-0 shadow-sm stats-card">
                        <Card.Body className="d-flex align-items-center">
                            <div className="stats-icon bg-info-light text-info">
                                <Clock size={24} />
                            </div>
                            <div className="ms-3">
                                <h6 className="stats-label mb-1">Última Actividad</h6>
                                <h3 className="stats-value mb-0">
                                    {estadisticas.ultimaActividad ?
                                        formatearFecha(estadisticas.ultimaActividad, 'short') :
                                        'Sin actividad'}
                                </h3>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col lg={8} className="mb-4 mb-lg-0">
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
                            <h5 className="mb-0">Próximas Reservas</h5>
                            <Button as={Link} to="/cliente/reservas" variant="outline-primary" size="sm">
                                Ver Todas
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            {cargando ? (
                                <div className="text-center py-3">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                    <p className="mt-2 text-muted">Cargando reservas...</p>
                                </div>
                            ) : proximasReservas.length > 0 ? (
                                proximasReservas.map((reserva, index) => (
                                    <div key={reserva.id} className={`reserva-item p-3 ${index !== proximasReservas.length - 1 ? 'border-bottom' : ''}`}>
                                        <div className="d-flex justify-content-between flex-wrap">
                                            <div>
                                                <h6 className="mb-1">{reserva.habitacion}</h6>
                                                <div className="text-muted small">
                                                    <span className="me-3">
                                                        <i className="bi bi-calendar-check me-1"></i>
                                                        {formatearFecha(reserva.fechaEntrada, 'short')} - {formatearFecha(reserva.fechaSalida, 'short')}
                                                    </span>
                                                    <span>
                                                        <i className="bi bi-tag me-1"></i>
                                                        {reserva.id}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 mt-sm-0">
                                                <span className={`badge ${reserva.estado === 'Confirmada' ? 'bg-success' : 'bg-warning text-dark'} me-2`}>
                                                    {reserva.estado}
                                                </span>
                                                <span className="fw-bold">
                                                    ${reserva.precio}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4">
                                    <div className="empty-state">
                                        <i className="bi bi-calendar-x fs-1 text-muted"></i>
                                        <p className="mt-2 mb-0">No tiene reservas próximas</p>
                                    </div>
                                    <Button
                                        as={Link}
                                        to="/cliente/reservas/nueva"
                                        variant="primary"
                                        className="mt-3"
                                    >
                                        Hacer una Reserva
                                    </Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Header className="bg-white py-3">
                            <h5 className="mb-0">Perfil de Usuario</h5>
                        </Card.Header>
                        <Card.Body className="text-center">
                            <div className="user-avatar-large mx-auto mb-3">
                                {usuario?.imgPerfil ? (
                                    <img
                                        src={usuario.imgPerfil}
                                        alt={usuario.nombre}
                                        className="rounded-circle img-fluid"
                                    />
                                ) : (
                                    <div className="avatar-placeholder-large rounded-circle d-flex align-items-center justify-content-center bg-primary text-white">
                                        <Person size={48} />
                                    </div>
                                )}
                            </div>
                            <h5 className="mb-1">{usuario?.nombre || 'Usuario'}</h5>
                            <p className="text-muted mb-3">{usuario?.email || 'email@ejemplo.com'}</p>
                            <Button
                                as={Link}
                                to="/cliente/perfil"
                                variant="outline-primary"
                                className="w-100"
                            >
                                Editar Perfil
                            </Button>
                        </Card.Body>
                    </Card>

                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white py-3">
                            <h5 className="mb-0">Acciones Rápidas</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="quick-actions">
                                <Button
                                    as={Link}
                                    to="/cliente/reservas/nueva"
                                    variant="success"
                                    className="w-100 mb-2"
                                >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Nueva Reserva
                                </Button>
                                <Button
                                    as={Link}
                                    to="/cliente/servicios"
                                    variant="outline-primary"
                                    className="w-100 mb-2"
                                >
                                    <i className="bi bi-stars me-2"></i>
                                    Explorar Servicios
                                </Button>
                                <Button
                                    as={Link}
                                    to="/contacto"
                                    variant="outline-secondary"
                                    className="w-100"
                                >
                                    <i className="bi bi-headset me-2"></i>
                                    Contactar Soporte
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
