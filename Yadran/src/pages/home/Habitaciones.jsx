import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Search, FilterSquare, XCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import HabitacionCard from './components/habitaciones/components/HabitacionCard';
import HabitacionesFiltros from './components/habitaciones/components/HabitacionesFiltros';
import { habitacionesApi } from '../../config/api/habitacionesApi';
import './components/habitaciones/styles/Habitaciones.css';

const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacionesFiltradas, setHabitacionesFiltradas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [filtros, setFiltros] = useState({
        tipo: [],
        precio: { min: '', max: '' },
        capacidad: [],
        servicios: []
    });

    // Cargar habitaciones
    useEffect(() => {
        const obtenerHabitaciones = async () => {
            try {
                setCargando(true);
                const datos = await habitacionesApi.obtenerHabitaciones();
                setHabitaciones(datos);
                setHabitacionesFiltradas(datos);
            } catch (error) {
                console.error("Error al obtener habitaciones:", error);
                setError("No se pudieron cargar las habitaciones. Por favor, intente de nuevo más tarde.");
            } finally {
                setCargando(false);
            }
        };

        obtenerHabitaciones();
    }, []);

    // Aplicar filtros cuando cambian
    useEffect(() => {
        aplicarFiltros();
    }, [busqueda, filtros, habitaciones]);

    const aplicarFiltros = () => {
        let resultado = [...habitaciones];

        // Filtrar por búsqueda
        if (busqueda.trim()) {
            const busquedaLower = busqueda.toLowerCase();
            resultado = resultado.filter(hab =>
                hab.nombre?.toLowerCase().includes(busquedaLower) ||
                hab.descripcion?.toLowerCase().includes(busquedaLower) ||
                hab.tipo?.toLowerCase().includes(busquedaLower)
            );
        }

        // Filtrar por tipo
        if (filtros.tipo.length > 0) {
            resultado = resultado.filter(hab => filtros.tipo.includes(hab.tipo));
        }

        // Filtrar por precio
        if (filtros.precio.min) {
            resultado = resultado.filter(hab => hab.precio >= parseInt(filtros.precio.min));
        }
        if (filtros.precio.max) {
            resultado = resultado.filter(hab => hab.precio <= parseInt(filtros.precio.max));
        }

        // Filtrar por capacidad
        if (filtros.capacidad.length > 0) {
            resultado = resultado.filter(hab => filtros.capacidad.includes(hab.capacidad.toString()));
        }

        // Filtrar por servicios
        if (filtros.servicios.length > 0) {
            resultado = resultado.filter(hab =>
                filtros.servicios.every(servicio =>
                    hab.servicios && hab.servicios.includes(servicio)
                )
            );
        }

        setHabitacionesFiltradas(resultado);
    };

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const toggleFiltros = () => {
        setMostrarFiltros(!mostrarFiltros);
    };

    const handleFiltroChange = (nuevosFiltros) => {
        setFiltros(nuevosFiltros);
    };

    const resetearFiltros = () => {
        setFiltros({
            tipo: [],
            precio: { min: '', max: '' },
            capacidad: [],
            servicios: []
        });
        setBusqueda('');
    };

    const tieneFiltrosActivos = () => {
        return busqueda.trim() !== '' ||
            filtros.tipo.length > 0 ||
            filtros.precio.min !== '' ||
            filtros.precio.max !== '' ||
            filtros.capacidad.length > 0 ||
            filtros.servicios.length > 0;
    };

    if (cargando) {
        return (
            <div className="habitaciones-page">
                <Container className="py-5">
                    <div className="text-center my-5">
                        <Spinner animation="border" variant="primary" className="mb-3" />
                        <p>Cargando habitaciones...</p>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="habitaciones-page">
                <Container className="py-5">
                    <div className="text-center my-5">
                        <div className="error-icon mb-3">
                            <i className="bi bi-exclamation-triangle-fill text-danger"></i>
                        </div>
                        <h3>¡Ups! Algo salió mal</h3>
                        <p className="text-muted">{error}</p>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => window.location.reload()}
                        >
                            Intentar nuevamente
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="habitaciones-page">
            <div className="habitaciones-hero">
                <Container>
                    <h1 className="text-center">Nuestras Habitaciones</h1>
                    <p className="text-center lead">Descubra el confort y elegancia de nuestras habitaciones</p>
                </Container>
            </div>

            <Container className="py-5">
                <Row className="mb-4">
                    <Col md={8}>
                        <InputGroup>
                            <Form.Control
                                placeholder="Buscar habitaciones..."
                                value={busqueda}
                                onChange={handleBusquedaChange}
                            />
                            <InputGroup.Text>
                                <Search />
                            </InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <div className="d-flex justify-content-md-end mt-3 mt-md-0">
                            <button
                                className={`btn ${mostrarFiltros ? 'btn-primary' : 'btn-outline-primary'} toggle-filters-btn`}
                                onClick={toggleFiltros}
                            >
                                <FilterSquare className="me-1" />
                                {mostrarFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                            </button>
                            {tieneFiltrosActivos() && (
                                <button
                                    className="btn btn-outline-secondary ms-2 reset-filters-btn"
                                    onClick={resetearFiltros}
                                >
                                    <XCircle className="me-1" />
                                    Resetear
                                </button>
                            )}
                        </div>
                    </Col>
                </Row>

                {mostrarFiltros && (
                    <Row className="mb-4">
                        <Col>
                            <Card className="filter-card shadow-sm">
                                <Card.Body>
                                    <HabitacionesFiltros
                                        filtros={filtros}
                                        onChange={handleFiltroChange}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                {tieneFiltrosActivos() && (
                    <Row className="mb-4">
                        <Col>
                            <div className="filter-results">
                                <span className="results-badge">
                                    {habitacionesFiltradas.length}
                                    {habitacionesFiltradas.length === 1 ? ' habitación encontrada' : ' habitaciones encontradas'}
                                </span>

                                {busqueda.trim() && (
                                    <span className="filter-badge">
                                        Búsqueda: {busqueda}
                                        <button
                                            className="filter-remove-btn"
                                            onClick={() => setBusqueda('')}
                                        >
                                            <XCircle size={14} />
                                        </button>
                                    </span>
                                )}

                                {filtros.tipo.map(tipo => (
                                    <span key={tipo} className="filter-badge">
                                        Tipo: {tipo}
                                        <button
                                            className="filter-remove-btn"
                                            onClick={() => setFiltros({
                                                ...filtros,
                                                tipo: filtros.tipo.filter(t => t !== tipo)
                                            })}
                                        >
                                            <XCircle size={14} />
                                        </button>
                                    </span>
                                ))}

                                {filtros.precio.min && (
                                    <span className="filter-badge">
                                        Precio mínimo: ${filtros.precio.min}
                                        <button
                                            className="filter-remove-btn"
                                            onClick={() => setFiltros({
                                                ...filtros,
                                                precio: { ...filtros.precio, min: '' }
                                            })}
                                        >
                                            <XCircle size={14} />
                                        </button>
                                    </span>
                                )}

                                {filtros.precio.max && (
                                    <span className="filter-badge">
                                        Precio máximo: ${filtros.precio.max}
                                        <button
                                            className="filter-remove-btn"
                                            onClick={() => setFiltros({
                                                ...filtros,
                                                precio: { ...filtros.precio, max: '' }
                                            })}
                                        >
                                            <XCircle size={14} />
                                        </button>
                                    </span>
                                )}

                                {filtros.capacidad.map(cap => (
                                    <span key={cap} className="filter-badge">
                                        Capacidad: {cap} personas
                                        <button
                                            className="filter-remove-btn"
                                            onClick={() => setFiltros({
                                                ...filtros,
                                                capacidad: filtros.capacidad.filter(c => c !== cap)
                                            })}
                                        >
                                            <XCircle size={14} />
                                        </button>
                                    </span>
                                ))}

                                {filtros.servicios.map(serv => (
                                    <span key={serv} className="filter-badge">
                                        Servicio: {serv.replace(/_/g, ' ')}
                                        <button
                                            className="filter-remove-btn"
                                            onClick={() => setFiltros({
                                                ...filtros,
                                                servicios: filtros.servicios.filter(s => s !== serv)
                                            })}
                                        >
                                            <XCircle size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </Col>
                    </Row>
                )}

                <Row className="animate-grid">
                    {habitacionesFiltradas.length > 0 ? (
                        habitacionesFiltradas.map(habitacion => (
                            <Col key={habitacion.id} md={6} lg={4} className="mb-4">
                                <HabitacionCard habitacion={habitacion} />
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center py-5">
                            <div className="no-results">
                                <div className="no-results-icon mb-3">
                                    <i className="bi bi-search"></i>
                                </div>
                                <h3>No se encontraron habitaciones</h3>
                                <p className="text-muted">Intente con diferentes criterios de búsqueda o filtros</p>
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={resetearFiltros}
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Habitaciones;
