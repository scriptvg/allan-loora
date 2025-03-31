import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import HabitacionCard from './HabitacionCard.jsx';

const HabitacionesList = ({ habitaciones }) => {
    if (!habitaciones || habitaciones.length === 0) {
        return (
            <Alert variant="info" className="text-center py-5">
                <i className="bi bi-info-circle-fill me-2"></i>
                No se encontraron habitaciones con los criterios seleccionados.
                <br />
                <small className="mt-2 d-block">Intenta cambiar los filtros de búsqueda.</small>
            </Alert>
        );
    }

    return (
        <div className="habitaciones-grid">
            <Row xs={1} md={2} lg={3} className="g-4 animate-grid">
                {habitaciones.map((habitacion, index) => (
                    <Col key={habitacion.id} className="mb-4" style={{ animationDelay: `${index * 0.1}s` }}>
                        <HabitacionCard habitacion={habitacion} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default HabitacionesList;