import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ message = "Cargando..." }) => {
    return (
        <div className="loading-spinner-container">
            <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
            <p className="text-muted mt-3">{message}</p>
        </div>
    );
};

export default LoadingSpinner;