import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
    BarChart, 
    Building, 
    Users, 
    Calendar, 
    CreditCard, 
    TrendingUp, 
    CheckCircle,
    XCircle,
    Clock
} from 'react-bootstrap-icons';
import { usarAutenticacion } from '../../config/context/AuthContext';
import { reservasApi } from '../../config/api/reservasApi';
import { formatearFecha, formatearMoneda } from '../../config/utils/formatUtils';

const Dashboard = () => {
    const { usuario } = usarAutenticacion();
    const [estadisticas, setEstadisticas] = useState({
        totalHabitaciones: 0,
        habitacionesDisponibles: 0,
        totalClientes: 0,
        totalReservas: 0,
        ingresosMensuales: 0,
        ocupacionPromedio: 0
    });
    const [ultimasReservas, setUltimasReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    
    useEffect(() => {
        const cargarDatosDashboard = async () => {
            try {
                setCargando(true);
                
                // En una implementación real, estos datos vendrían del backend
                // Por ahora, simulamos una carga de datos
                setTimeout(() => {
                    setEstadisticas({
                        totalHabitaciones: 25,
                        habitacionesDisponibles: 15,
                        totalClientes: 120,
                        totalReservas: 450,
                        ingresosMensuales: 5600000,
                        ocupacionPromedio: 72
                    });
                    
                    setUltimasReservas([
                        {
                            id: 'RES-001',
                            cliente: 'Ana María Pérez',
                            habitacion: 'Suite Deluxe',
                            fechaEntrada: '2023-12-15',
                            fechaSalida: '2023-12-20',
                            estado: 'Confirmada',
                            total: 625000
                        },
                        {
                            id: 'RES-002',
                            cliente: 'Juan Carlos Rodríguez',
                            habitacion: 'Habitación Doble Vista al Mar',
                            fechaEntrada: '2023-12-18',
                            fechaSalida: '2023-12-22',
                            estado: 'Pendiente',
                            total: 480000
                        },
                        {
                            id: 'RES-003',
                            cliente: 'María Fernanda Gómez',
                            habitacion: 'Habitación Individual',
                            fechaEntrada: '2023-12-10',
                            fechaSalida: '2023-12-12',
                            estado: 'Completada',
                            total: 180000
                        },
                        {
                            id: 'RES-004',
                            cliente: 'Pedro Alonso Gutierrez',
                            habitacion: 'Suite Presidencial',
                            fechaEntrada: '2023-12-24',
                            fechaSalida: '2023-12-30',
                            estado: 'Confirmada',
                            total: 1200000
                        },
                        {
                            id: 'RES-005',
                            cliente: 'Roberto Sánchez',
                            habitacion: 'Habitación Familiar',
                            fechaEntrada: '2023-12-05',
                            fechaSalida: '2023-12-08',
                            estado: 'Cancelada',
                            total: 350000
                        }
                    ]);
                    
                    setCargando(false);
                }, 1000);
                
            } catch (error) {
                console.error('Error al cargar datos del dashboard:', error);
                setCargando(false);
            }
        };
        
        cargarDatosDashboard();
    }, []);
    
    return (
        <div className="admin-dashboard">
            <div className="page-header mb-4">
                <h1 className="mb-2">Dashboard</h1>
                <p className="text-muted">
                    Bienvenido, {usuario?.nombre || 'Administrador'}. Aquí tiene un resumen de la actividad del hotel.
                </p>
            </div>
            
            <Row className="stats-cards mb-4">
                <Col md={6} lg={3} className="mb-4">
                    <Card className="stats-card border-0 shadow-sm h-100">
                        <Card.Body className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="stats-title text-muted mb-0">Habitaciones</h6>
                                    <h3 className="stats-value mt-2 mb-0">{estadisticas.totalHabitaciones}</h3>
                                </div>
                                <div className="stats-icon bg-primary-light">
                                    <Building size={24} className="text-primary" />
                                </div>
                            </div>
                            <div className="mt-3 pt-2 border-top">
                                <small className="text-success">
                                    <strong>{estadisticas.habitacionesDisponibles}</strong> disponibles actualmente
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={6} lg={3} className="mb-4">
                    <Card className="stats-card border-0 shadow-sm h-100">
                        <Card.Body className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="stats-title text-muted mb-0">Clientes</h6>
                                    <h3 className="stats-value mt-2 mb-0">{estadisticas.totalClientes}</h3>
                                </div>
                                <div className="stats-icon bg-success-light">
                                    <Users size={24} className="text-success" />
                                </div>
                            </div>
                            <div className="mt-3 pt-2 border-top">
                                <small className="text-muted">
                                    Total de clientes registrados
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={6} lg={3} className="mb-4">
                    <Card className="stats-card border-0 shadow-sm h-100">
                        <Card.Body className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="stats-title text-muted mb-0">Reservas</h6>
                                    <h3 className="stats-value mt-2 mb-0">{estadisticas.totalReservas}</h3>
                                </div>
                                <div className="stats-icon bg-warning-light">
                                    <Calendar size={24} className="text-warning" />
                                </div>
                            </div>
                            <div className="mt-3 pt-2 border-top">
                                <small className="text-muted">
                                    Reservas totales realizadas
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={6} lg={3} className="mb-4">
                    <Card className="stats-card border-0 shadow-sm h-100">
                        <Card.Body className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="stats-title text-muted mb-0">Ingresos Mensuales</h6>
                                    <h3 className="stats-value mt-2 mb-0">{formatearMoneda(estadisticas.ingresosMensuales)}</h3>
                                </div>
                                <div className="stats-icon bg-info-light">
                                    <CreditCard size={24} className="text-info" />
                                </div>
                            </div>
                            <div className="mt-3 pt-2 border-top">
                                <small className="text-success">
                                    <TrendingUp size={12} className="me-1" />
                                    <span>Incremento de 8.2% vs mes anterior</span>
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Row className="mb-4">
                <Col lg={8} className="mb-4">
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Últimas Reservas</h5>
                            <Button 
                                as={Link} 
                                to="/admin/reservas" 
                                variant="outline-primary" 
                                size="sm"
                            >
                                Ver Todas
                            </Button>
                        </Card.Header>
                        <Card.Body className="p-0">
                            {cargando ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                    <p className="mt-2 text-muted">Cargando datos...</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <Table hover className="align-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Cliente</th>
                                                <th>Habitación</th>
                                                <th>Estado</th>
                                                <th>Fechas</th>
                                                <th className="text-end">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ultimasReservas.map((reserva) => (
                                                <tr key={reserva.id}>
                                                    <td>
                                                        <Link 
                                                            to={`/admin/reservas/editar/${reserva.id}`}
                                                            className="fw-medium text-decoration-none"
                                                        >
                                                            {reserva.id}
                                                        </Link>
                                                    </td>
                                                    <td>{reserva.cliente}</td>
                                                    <td>{reserva.habitacion}</td>
                                                    <td>
                                                        <span className={`badge ${getBadgeClass(reserva.estado)}`}>
                                                            {getEstadoIcon(reserva.estado)} {reserva.estado}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="small">
                                                            <div>{formatearFecha(reserva.fechaEntrada)}</div>
                                                            <div>{formatearFecha(reserva.fechaSalida)}</div>
                                                        </div>
                                                    </td>
                                                    <td className="text-end fw-medium">
                                                        {formatearMoneda(reserva.total)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col lg={4}>
                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Header className="bg-white py-3">
                            <h5 className="mb-0">Ocupación</h5>
                        </Card.Header>
                        <Card.Body className="text-center py-4">
                            <div className="ocupacion-chart mb-3">
                                <div className="position-relative donut-chart-container">
                                    <svg width="160" height="160" viewBox="0 0 160 160" className="donut-chart">
                                        <circle
                                            r="70"
                                            cx="80"
                                            cy="80"
                                            fill="transparent"
                                            stroke="#e9ecef"
                                            strokeWidth="16"
                                        />
                                        <circle
                                            r="70"
                                            cx="80"
                                            cy="80"
                                            fill="transparent"
                                            stroke="#0d6efd"
                                            strokeWidth="16"
                                            strokeDasharray={`${2 * Math.PI * 70 * estadisticas.ocupacionPromedio / 100} ${2 * Math.PI * 70 * (100 - estadisticas.ocupacionPromedio) / 100}`}
                                            strokeDashoffset={2 * Math.PI * 70 * 0.25}
                                        />
                                    </svg>
                                    <div className="position-absolute top-50 start-50 translate-middle">
                                        <h3 className="mb-0">{estadisticas.ocupacionPromedio}%</h3>
                                        <p className="mb-0 text-muted small">Ocupación</p>
                                    </div>
                                </div>
                            </div>
                            <p className="mb-0">
                                La tasa de ocupación actual del hotel es del <strong>{estadisticas.ocupacionPromedio}%</strong>
                            </p>
                        </Card.Body>
                    </Card>
                    
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white py-3">
                            <h5 className="mb-0">Acciones Rápidas</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-grid gap-2">
                                <Button 
                                    as={Link} 
                                    to="/admin/reservas/crear" 
                                    variant="primary"
                                >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Nueva Reserva
                                </Button>
                                <Button 
                                    as={Link} 
                                    to="/admin/habitaciones" 
                                    variant="outline-primary"
                                >
                                    <i className="bi bi-building me-2"></i>
                                    Gestionar Habitaciones
                                </Button>
                                <Button 
                                    as={Link} 
                                    to="/admin/clientes" 
                                    variant="outline-primary"
                                >
                                    <i className="bi bi-people me-2"></i>
                                    Gestionar Clientes
                                </Button>
                                <Button 
                                    as={Link} 
                                    to="/admin/servicios" 
                                    variant="outline-primary"
                                >
                                    <i className="bi bi-stars me-2"></i>
                                    Gestionar Servicios
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

// Función auxiliar para determinar la clase del badge según el estado
const getBadgeClass = (estado) => {
    switch (estado) {
        case 'Confirmada':
            return 'bg-success';
        case 'Pendiente':
            return 'bg-warning text-dark';
        case 'Cancelada':
            return 'bg-danger';
        case 'Completada':
            return 'bg-info';
        default:
            return 'bg-secondary';
    }
};

// Función auxiliar para mostrar el ícono según el estado
const getEstadoIcon = (estado) => {
    switch (estado) {
        case 'Confirmada':
            return <CheckCircle size={10} className="me-1" />;
        case 'Pendiente':
            return <Clock size={10} className="me-1" />;
        case 'Cancelada':
            return <XCircle size={10} className="me-1" />;
        case 'Completada':
            return <CheckCircle size={10} className="me-1" />;
        default:
            return null;
    }
};

export default Dashboard;
