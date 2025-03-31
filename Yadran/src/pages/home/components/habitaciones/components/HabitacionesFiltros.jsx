import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const HabitacionesFiltros = ({ filtros, onChange }) => {
    const actualizarFiltro = (grupo, valor) => {
        let nuevosFiltros = { ...filtros };

        // Precio (rango)
        if (grupo === 'precio') {
            nuevosFiltros.precio = { ...nuevosFiltros.precio, ...valor };
        } 
        // Tipos y capacidades (arrays)
        else if (grupo === 'tipo' || grupo === 'capacidad' || grupo === 'servicios') {
            if (nuevosFiltros[grupo].includes(valor)) {
                nuevosFiltros[grupo] = nuevosFiltros[grupo].filter(item => item !== valor);
            } else {
                nuevosFiltros[grupo] = [...nuevosFiltros[grupo], valor];
            }
        }
        
        onChange(nuevosFiltros);
    };

    // Opciones de tipo de habitación
    const tiposHabitacion = [
        { valor: 'individual', etiqueta: 'Individual' },
        { valor: 'doble', etiqueta: 'Doble' },
        { valor: 'suite', etiqueta: 'Suite' },
        { valor: 'familiar', etiqueta: 'Familiar' }
    ];

    // Opciones de capacidad
    const capacidades = [
        { valor: '1', etiqueta: '1 persona' },
        { valor: '2', etiqueta: '2 personas' },
        { valor: '3', etiqueta: '3 personas' },
        { valor: '4', etiqueta: '4 personas' },
        { valor: '5', etiqueta: '5+ personas' }
    ];
    
    // Opciones de servicios
    const serviciosOpciones = [
        { valor: 'wifi', etiqueta: 'WiFi' },
        { valor: 'tv', etiqueta: 'Televisión' },
        { valor: 'aire_acondicionado', etiqueta: 'Aire acondicionado' },
        { valor: 'minibar', etiqueta: 'Minibar' },
        { valor: 'vista_al_mar', etiqueta: 'Vista al mar' },
        { valor: 'bano_privado', etiqueta: 'Baño privado' }
    ];

    return (
        <div className="filtros-container">
            <Row>
                <Col md={3}>
                    <h6 className="filtro-titulo">Tipo de habitación</h6>
                    <div className="filtro-opciones">
                        {tiposHabitacion.map(tipo => (
                            <Form.Check
                                key={tipo.valor}
                                type="checkbox"
                                label={tipo.etiqueta}
                                checked={filtros.tipo.includes(tipo.valor)}
                                onChange={() => actualizarFiltro('tipo', tipo.valor)}
                                className="filtro-checkbox"
                            />
                        ))}
                    </div>
                </Col>
                
                <Col md={3}>
                    <h6 className="filtro-titulo">Precio por noche</h6>
                    <Form.Group className="mb-3">
                        <Form.Label>Mínimo ($)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Precio mínimo"
                            value={filtros.precio.min}
                            onChange={(e) => actualizarFiltro('precio', { min: e.target.value })}
                            min="0"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Máximo ($)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Precio máximo"
                            value={filtros.precio.max}
                            onChange={(e) => actualizarFiltro('precio', { max: e.target.value })}
                            min={filtros.precio.min || "0"}
                        />
                    </Form.Group>
                </Col>
                
                <Col md={3}>
                    <h6 className="filtro-titulo">Capacidad</h6>
                    <div className="filtro-opciones">
                        {capacidades.map(cap => (
                            <Form.Check
                                key={cap.valor}
                                type="checkbox"
                                label={cap.etiqueta}
                                checked={filtros.capacidad.includes(cap.valor)}
                                onChange={() => actualizarFiltro('capacidad', cap.valor)}
                                className="filtro-checkbox"
                            />
                        ))}
                    </div>
                </Col>
                
                <Col md={3}>
                    <h6 className="filtro-titulo">Servicios</h6>
                    <div className="filtro-opciones">
                        {serviciosOpciones.map(servicio => (
                            <Form.Check
                                key={servicio.valor}
                                type="checkbox"
                                label={servicio.etiqueta}
                                checked={filtros.servicios.includes(servicio.valor)}
                                onChange={() => actualizarFiltro('servicios', servicio.valor)}
                                className="filtro-checkbox"
                            />
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HabitacionesFiltros;
