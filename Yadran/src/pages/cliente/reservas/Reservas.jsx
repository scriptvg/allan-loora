import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CalendarCheck, PlusCircle, Search } from 'react-bootstrap-icons';
import { usarAutenticacion } from '../../../config/context/AuthContext';
import { formatearFecha, formatearMoneda } from '../../../config/utils/formatUtils';

const Reservas = () => {
    const { usuario } = usarAutenticacion();
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        const cargarReservas = async () => {
            try {
                setCargando(true);
                // Simulación de carga de datos desde la API
                // En una implementación real, estos datos vendrían del backend

                setTimeout(() => {
                    setReservas([
                        {
                            id: 'res-001',
                            habitacion: 'Suite Deluxe',
                            fechaEntrada: '2023-12-15',
                            fechaSalida: '2023-12-20',
                            estado: 'Confirmada',
                            precio: 125000,
                            huespedes: 2
                        },
                        {
                            id: 'res-002',
                            habitacion: 'Habitación Doble con Vista al Mar',
                            fechaEntrada: '2024-01-10',
                            fechaSalida: '2024-01-15',
                            estado: 'Pendiente',
                            precio: 95000,
                            huespedes: 3
                        },
                        {
                            id: 'res-003',
                            habitacion: 'Habitación Individual',
                            fechaEntrada: '2023-11-05',
                            fechaSalida: '2023-11-07',
                            estado: 'Completada',
                            precio: 65000,
                            huespedes: 1
                        },
                        {
                            id: 'res-004',
                            habitacion: 'Suite Familiar',
                            fechaEntrada: '2024-02-20',
                            fechaSalida: '2024-02-25',
                            estado: 'Confirmada',
                            precio: 150000,
                            huespedes: 4
                        },
                        {
                            id: 'res-005',
                            habitacion: 'Habitación Doble Estándar',
                            fechaEntrada: '2023-10-12',
                            fechaSalida: '2023-10-15',
                            estado: 'Cancelada',
                            precio: 85000,
                            huespedes: 2
                        }
                    ]);
                    setCargando(false);
                }, 1000);
            } catch (error) {
                console.error('Error al cargar reservas:', error);
                setCargando(false);
            }
        };

        cargarReservas();
    }, []);

    const reservasFiltradas = reservas.filter(reserva => 
        reserva.habitacion.toLowerCase().includes(filtro.toLowerCase()) ||
        reserva.estado.toLowerCase().includes(filtro.toLowerCase()) ||
        reserva.id.toLowerCase().includes(filtro.toLowerCase())
    );

    const getEstadoBadge = (estado) => {
        switch (estado.toLowerCase()) {
            case 'confirmada':
                return <Badge bg="success">Confirmada</Badge>;
            case 'pendiente':
                return <Badge bg="warning" text="dark">Pendiente</Badge>;
            case 'cancelada':
                return <Badge bg="danger">Cancelada</Badge>;
            case 'completada':
                return <Badge bg="info">Completada</Badge>;
            default:
                return <Badge bg="secondary">{estado}</Badge>;
        }
    };

    return (
        <Container fluid className="py-4">
            <Row className="mb-4 align-items-center">
                <Col>
                    <h1 className="mb-1">Mis Reservas</h1>
                    <p className="text-muted mb-0">
                        Gestione todas sus reservas en el Hotel Yadran
                    </p>
                </Col>
                <Col xs="auto">
                    <Link to="/cliente/reservas/nueva" className="btn btn-primary d-flex align-items-center">
                        <PlusCircle size={18} className="me-2" />
                        Nueva Reserva
                    </Link>
                </Col>
            </Row>

            <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white py-3">
                    <Row className="align-items-center">
                        <Col>
                            <div className="d-flex align-items-center">
                                <CalendarCheck size={20} className="text-primary me-2" />
                                <h5 className="mb-0">Historial de Reservas</h5>
                            </div>
                        </Col>
                        <Col xs="auto">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar reserva..."
                                    value={filtro}
                                    onChange={(e) => setFiltro(e.target.value)}
                                />
                                <Search size={16} className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                            </div>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className="p-0">
                    {cargando ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-3 text-muted">Cargando sus reservas...</p>
                        </div>
                    ) : reservasFiltradas.length === 0 ? (
                        <div className="text-center py-5">
                            <div className="mb-3">
                                <CalendarCheck size={48} className="text-muted" />
                            </div>
                            <h5>No se encontraron reservas</h5>
                            <p className="text-muted">
                                {filtro ? 'No hay resultados para su búsqueda' : 'Aún no tiene reservas registradas'}
                            </p>
                            {!filtro && (
                                <Link to="/cliente/reservas/nueva" className="btn btn-outline-primary">
                                    <PlusCircle size={18} className="me-2" />
                                    Realizar una reserva
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <Table hover className="align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th>ID Reserva</th>
                                        <th>Habitación</th>
                                        <th>Fecha Entrada</th>
                                        <th>Fecha Salida</th>
                                        <th>Huéspedes</th>
                                        <th>Precio</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservasFiltradas.map((reserva) => (
                                        <tr key={reserva.id}>
                                            <td>
                                                <span className="fw-medium">{reserva.id}</span>
                                            </td>
                                            <td>{reserva.habitacion}</td>
                                            <td>{formatearFecha(reserva.fechaEntrada)}</td>
                                            <td>{formatearFecha(reserva.fechaSalida)}</td>
                                            <td>{reserva.huespedes}</td>
                                            <td>
                                                <span className="fw-medium">
                                                    {formatearMoneda(reserva.precio)}
                                                </span>
                                            </td>
                                            <td>{getEstadoBadge(reserva.estado)}</td>
                                            <td>
                                                <Button 
                                                    variant="outline-primary" 
                                                    size="sm"
                                                    className="me-2"
                                                >
                                                    Ver Detalles
                                                </Button>
                                                {reserva.estado.toLowerCase() === 'pendiente' && (
                                                    <Button 
                                                        variant="outline-danger" 
                                                        size="sm"
                                                    >
                                                        Cancelar
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Reservas;