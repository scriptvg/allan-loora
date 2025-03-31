import React from 'react';
import { Badge } from 'react-bootstrap';
import { CheckCircle, XCircle, Wrench, FilePlus, X } from 'lucide-react';

const EstadoBadge = ({ estado, size = 'md' }) => {
    // Configuración adaptada a los valores reales de estado en el JSON
    const getEstadoInfo = (estado) => {
        switch (estado) {
            case "Disponible":
                return {
                    color: 'success',
                    label: 'Disponible',
                    icon: <CheckCircle size={size === 'lg' ? 18 : 14} className="me-1" />
                };
            case "Reservado":
                return {
                    color: 'warning',
                    label: 'Reservado',
                    icon: <FilePlus size={size === 'lg' ? 18 : 14} className="me-1" />
                };
            case "Mantenimiento":
                return {
                    color: 'danger',
                    label: 'En Mantenimiento',
                    icon: <Wrench size={size === 'lg' ? 18 : 14} className="me-1" />
                };
            case "No disponible":
                return {
                    color: 'secondary',
                    label: 'No Disponible',
                    icon: <XCircle size={size === 'lg' ? 18 : 14} className="me-1" />
                };
            case "Cancelado":
                return {
                    color: 'dark',
                    label: 'Cancelado',
                    icon: <X size={size === 'lg' ? 18 : 14} className="me-1" />
                };
            default:
                return {
                    color: 'light',
                    label: estado || 'Desconocido',
                    icon: <CheckCircle size={size === 'lg' ? 18 : 14} className="me-1" />
                };
        }
    };

    const { color, label, icon } = getEstadoInfo(estado);

    const badgeClass = size === 'lg' ? 'px-3 py-2' : '';

    return (
        <Badge
            bg={color}
            className={`d-inline-flex align-items-center ${badgeClass}`}
        >
            {icon}
            {label}
        </Badge>
    );
};

export default EstadoBadge;