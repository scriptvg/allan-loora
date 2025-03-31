import React from 'react';
import { Button } from 'react-bootstrap';

const NoResults = ({ resetFiltros }) => {
    return (
        <div className="text-center py-5 no-results">
            <i className="bi bi-search fs-1 text-muted"></i>
            <h3 className="mt-3 font-medium">No se encontraron habitaciones</h3>
            <p className="text-muted">No hay habitaciones que coincidan con los filtros seleccionados.</p>
            <Button variant="outline-primary" onClick={resetFiltros} className="mt-2 hover-lift">
                <i className="bi bi-arrow-repeat me-2"></i>
                Limpiar filtros
            </Button>
        </div>
    );
};

export default NoResults;