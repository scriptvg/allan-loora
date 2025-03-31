import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { People, Door } from 'react-bootstrap-icons';

const HabitacionCard = ({ habitacion }) => {
    // Manejar imagen predeterminada si no hay imágenes disponibles
    const obtenerImagenPrincipal = () => {
        if (habitacion.imgsHabitacion?.img && habitacion.imgsHabitacion.img.length > 0) {
            return habitacion.imgsHabitacion.img[0];
        } else if (habitacion.imgsHabitacion?.imgHabitacion && habitacion.imgsHabitacion.imgHabitacion.length > 0) {
            return habitacion.imgsHabitacion.imgHabitacion[0];
        } else {
            return "https://placehold.co/600x400/1e4d6b/fff?text=Habitación";
        }
    };

    // Función para obtener el nombre del tipo de habitación
    const obtenerTipoHabitacion = (tipo) => {
        const TIPOS = {
            'individual': 'Individual',
            'doble': 'Doble',
            'suite': 'Suite',
            'familiar': 'Familiar'
        };
        return TIPOS[tipo] || tipo;
    };

    // Función para obtener la clase de la insignia de estado
    const obtenerClaseEstado = (estado) => {
        if (estado === 'Disponible') return 'success';
        if (estado === 'Ocupada') return 'danger';
        if (estado === 'Mantenimiento') return 'warning';
        return 'secondary';
    };

    return (
        <Card className="habitacion-card h-100 border-0 shadow-sm">
            <div className="image-container">
                <Card.Img
                    variant="top"
                    src={obtenerImagenPrincipal()}
                    alt={habitacion.nombre || "Habitación"}
                    className="habitacion-img"
                />
                <Badge
                    bg={obtenerClaseEstado(habitacion.estado)}
                    className="estado-badge"
                >
                    {habitacion.estado || "No disponible"}
                </Badge>
            </div>

            <Card.Body className="p-4">
                <div className="tipo-habitacion small mb-2">
                    {obtenerTipoHabitacion(habitacion.tipo)}
                </div>

                <Card.Title className="mb-2 habitacion-titulo">
                    {habitacion.nombre || `Habitación ${habitacion.numero || habitacion.id}`}
                </Card.Title>

                <Card.Text className="habitacion-descripcion mb-3">
                    {habitacion.descripcion
                        ? habitacion.descripcion.length > 100
                            ? habitacion.descripcion.substring(0, 100) + '...'
                            : habitacion.descripcion
                        : "Sin descripción disponible."}
                </Card.Text>

                <div className="caracteristicas mb-3">
                    <div className="caracteristica">
                        <People className="me-2" />
                        <span>Capacidad: {habitacion.capacidad} pers.</span>
                    </div>

                    {habitacion.tamaño && (
                        <div className="caracteristica">
                            <i className="bi bi-rulers me-2"></i>
                            <span>Tamaño: {habitacion.tamaño} m²</span>
                        </div>
                    )}

                    {habitacion.numero && (
                        <div className="caracteristica">
                            <Door className="me-2" />
                            <span>Habitación N°: {habitacion.numero}</span>
                        </div>
                    )}
                </div>

                <div className="d-flex align-items-center justify-content-between mt-auto">
                    <div className="precio">
                        <span className="monto">${habitacion.precio}</span>
                        <span className="periodo">/noche</span>
                    </div>

                    <Link
                        to={`/habitaciones/${habitacion.id}`}
                        className="btn btn-sm btn-outline-primary ver-mas-btn"
                    >
                        Ver detalles
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default HabitacionCard;
