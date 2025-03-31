import React, { useState } from 'react';
import { Card, Row, Col, Form, Badge, Button, Collapse } from 'react-bootstrap';
import { LISTA_ESTADOS } from '../../../../../../config/utils/estadosConfig.jsx';

const HabitacionesFiltros = ({
    filtros,
    ordenarPor,
    handleFilterChange,
    setOrdenarPor,
    resetFiltros,
    cantidadResultados
}) => {
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    // Filtrar solo los estados relevantes para habitaciones
    const estadosHabitacion = LISTA_ESTADOS.filter(e =>
        ["Disponible", "No disponible", "Mantenimiento", "Reservado"].includes(e.valor)
    );

    const getTipoHabitacion = (tipo) => {
        const tipos = {
            'indi': 'Individual',
            'doble': 'Doble',
            'suite': 'Suite',
            'family': 'Familiar'
        };
        return tipos[tipo] || tipo;
    };

    // Verificar si hay filtros activos
    const hayFiltrosActivos = Object.values(filtros).some(val => val !== "");

    return (
        <Card className="mb-5 border-0 shadow-sm filter-card">
            <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                        <div className="filter-icon-container me-3">
                            <i className="bi bi-funnel-fill"></i>
                        </div>
                        <div>
                            <h5 className="mb-0 filter-title">Filtros de Búsqueda</h5>
                            <p className="text-muted mb-0 small">Encuentra la habitación perfecta para tu estancia</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="toggle-filters-btn"
                            onClick={() => setMostrarFiltros(!mostrarFiltros)}
                        >
                            {mostrarFiltros ? "Ocultar filtros" : "Mostrar filtros"}
                            <i className={`bi bi-chevron-${mostrarFiltros ? 'up' : 'down'} ms-1`}></i>
                        </Button>
                        {hayFiltrosActivos && (
                            <Button
                                variant="outline-danger"
                                size="sm"
                                className="reset-filters-btn"
                                onClick={resetFiltros}
                            >
                                <i className="bi bi-x-circle me-1"></i>
                                Limpiar
                            </Button>
                        )}
                    </div>
                </div>

                <Collapse in={mostrarFiltros}>
                    <div className="filter-content">
                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label-sm fw-semibold">
                                        <i className="bi bi-house me-1"></i>
                                        Tipo de habitación
                                    </Form.Label>
                                    <Form.Select
                                        name="tipo"
                                        size="sm"
                                        value={filtros.tipo}
                                        onChange={handleFilterChange}
                                        className="form-select-custom"
                                    >
                                        <option value="">Todos los tipos</option>
                                        <option value="indi">Individual</option>
                                        <option value="doble">Doble</option>
                                        <option value="suite">Suite</option>
                                        <option value="family">Familiar</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label-sm fw-semibold">
                                        <i className="bi bi-toggle-on me-1"></i>
                                        Estado
                                    </Form.Label>
                                    <Form.Select
                                        name="estado"
                                        size="sm"
                                        value={filtros.estado}
                                        onChange={handleFilterChange}
                                        className="form-select-custom"
                                    >
                                        <option value="">Todos los estados</option>
                                        {estadosHabitacion.map(estado => (
                                            <option key={estado.valor} value={estado.valor}>
                                                {estado.etiqueta}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label-sm fw-semibold">
                                        <i className="bi bi-currency-dollar me-1"></i>
                                        Precio mínimo
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        size="sm"
                                        placeholder="Desde $"
                                        name="precioMin"
                                        value={filtros.precioMin}
                                        onChange={handleFilterChange}
                                        className="form-control-custom"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label-sm fw-semibold">
                                        <i className="bi bi-currency-dollar me-1"></i>
                                        Precio máximo
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        size="sm"
                                        placeholder="Hasta $"
                                        name="precioMax"
                                        value={filtros.precioMax}
                                        onChange={handleFilterChange}
                                        className="form-control-custom"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label-sm fw-semibold">
                                        <i className="bi bi-people me-1"></i>
                                        Capacidad
                                    </Form.Label>
                                    <Form.Select
                                        name="capacidad"
                                        size="sm"
                                        value={filtros.capacidad}
                                        onChange={handleFilterChange}
                                        className="form-select-custom"
                                    >
                                        <option value="">Cualquiera</option>
                                        <option value="1">1+ persona</option>
                                        <option value="2">2+ personas</option>
                                        <option value="3">3+ personas</option>
                                        <option value="4">4+ personas</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label-sm fw-semibold">
                                        <i className="bi bi-sort-alpha-down me-1"></i>
                                        Ordenar por
                                    </Form.Label>
                                    <Form.Select
                                        size="sm"
                                        value={ordenarPor}
                                        onChange={(e) => setOrdenarPor(e.target.value)}
                                        className="form-select-custom"
                                    >
                                        <option value="">Por defecto</option>
                                        <option value="precio-asc">Precio: Menor a mayor</option>
                                        <option value="precio-desc">Precio: Mayor a menor</option>
                                        <option value="capacidad">Mayor capacidad</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Collapse>

                {/* Resultados de filtrado */}
                <div className="d-flex justify-content-between align-items-center mt-3 filter-results">
                    <div>
                        <Badge bg="light" text="dark" className="px-3 py-2 results-badge">
                            <i className="bi bi-list-ul me-2"></i>
                            <span className="fw-semibold">{cantidadResultados}</span> habitaciones encontradas
                        </Badge>
                    </div>

                    {hayFiltrosActivos && (
                        <div className="d-flex gap-2 flex-wrap active-filters">
                            {filtros.tipo && (
                                <Badge bg="primary" className="px-3 py-2 filter-badge">
                                    <i className="bi bi-house me-1"></i>
                                    {getTipoHabitacion(filtros.tipo)}
                                    <button
                                        className="bg-transparent border-0 text-white ms-2 p-0 filter-remove-btn"
                                        onClick={() => handleFilterChange({ target: { name: 'tipo', value: '' } })}
                                        aria-label="Quitar filtro de tipo"
                                    >
                                        <i className="bi bi-x"></i>
                                    </button>
                                </Badge>
                            )}

                            {filtros.estado && (
                                <Badge bg="primary" className="px-3 py-2 filter-badge">
                                    <i className="bi bi-toggle-on me-1"></i>
                                    {estadosHabitacion.find(e => e.valor === filtros.estado)?.etiqueta || filtros.estado}
                                    <button
                                        className="bg-transparent border-0 text-white ms-2 p-0 filter-remove-btn"
                                        onClick={() => handleFilterChange({ target: { name: 'estado', value: '' } })}
                                        aria-label="Quitar filtro de estado"
                                    >
                                        <i className="bi bi-x"></i>
                                    </button>
                                </Badge>
                            )}

                            {filtros.precioMin && (
                                <Badge bg="primary" className="px-3 py-2 filter-badge">
                                    <i className="bi bi-currency-dollar me-1"></i>
                                    Desde ${filtros.precioMin}
                                    <button
                                        className="bg-transparent border-0 text-white ms-2 p-0 filter-remove-btn"
                                        onClick={() => handleFilterChange({ target: { name: 'precioMin', value: '' } })}
                                        aria-label="Quitar filtro de precio mínimo"
                                    >
                                        <i className="bi bi-x"></i>
                                    </button>
                                </Badge>
                            )}

                            {filtros.precioMax && (
                                <Badge bg="primary" className="px-3 py-2 filter-badge">
                                    <i className="bi bi-currency-dollar me-1"></i>
                                    Hasta ${filtros.precioMax}
                                    <button
                                        className="bg-transparent border-0 text-white ms-2 p-0 filter-remove-btn"
                                        onClick={() => handleFilterChange({ target: { name: 'precioMax', value: '' } })}
                                        aria-label="Quitar filtro de precio máximo"
                                    >
                                        <i className="bi bi-x"></i>
                                    </button>
                                </Badge>
                            )}

                            {filtros.capacidad && (
                                <Badge bg="primary" className="px-3 py-2 filter-badge">
                                    <i className="bi bi-people me-1"></i>
                                    {filtros.capacidad}+ personas
                                    <button
                                        className="bg-transparent border-0 text-white ms-2 p-0 filter-remove-btn"
                                        onClick={() => handleFilterChange({ target: { name: 'capacidad', value: '' } })}
                                        aria-label="Quitar filtro de capacidad"
                                    >
                                        <i className="bi bi-x"></i>
                                    </button>
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default HabitacionesFiltros;