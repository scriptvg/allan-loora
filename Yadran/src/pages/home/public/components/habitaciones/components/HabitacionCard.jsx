import React, { useState } from 'react';
import { Card, Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { obtenerEstado } from '../../../../../../config/utils/estadosConfig.jsx';

const HabitacionCard = ({ habitacion }) => {
    const [isHovered, setIsHovered] = useState(false);
    // Obtener información de estado
    const estadoInfo = obtenerEstado(habitacion.estado);

    // Función para obtener tipo de habitación en formato legible
    const getTipoHabitacion = (tipo) => {
        const tipos = {
            'indi': 'Individual',
            'doble': 'Doble',
            'suite': 'Suite',
            'family': 'Familiar'
        };
        return tipos[tipo] || tipo;
    };

    // Mapeo de nombres de servicios a iconos
    const getServicioIcono = (servicio) => {
        const servicioIconos = {
            'bano_privado': 'water',
            'vista_al_mar': 'binoculars',
            'tv': 'tv',
            'wifi': 'wifi',
            'aire_acondicionado': 'thermometer-snow',
            'minibar': 'cup-hot',
            'caja_fuerte': 'safe',
            'escritorio': 'laptop',
            'desayuno': 'egg-fried',
            'limpieza_diaria': 'brush',
            'telefono': 'telephone',
            'secador_pelo': 'wind'
        };

        return servicioIconos[servicio] || 'check-circle';
    };

    // Obtener la primera imagen disponible
    const obtenerImagenPrincipal = () => {
        if (habitacion.imgsHabitacion?.img && habitacion.imgsHabitacion.img.length > 0) {
            return habitacion.imgsHabitacion.img[0];
        } else if (habitacion.imgsHabitacion?.imgHabitacion && habitacion.imgsHabitacion.imgHabitacion.length > 0) {
            return habitacion.imgsHabitacion.imgHabitacion[0];
        }
        return "https://placehold.co/600x400/1e4d6b/fff?text=Habitación";
    };

    return (
        <Card
            className="h-100 border-0 shadow-sm room-card animation-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="position-relative">
                <Card.Img
                    variant="top"
                    src={obtenerImagenPrincipal()}
                    style={{ height: "220px", objectFit: "cover" }}
                    className="room-image"
                />

                <div className={`room-image-overlay ${isHovered ? 'visible' : ''}`}>
                    <Button
                        as={Link}
                        to={`/habitaciones/${habitacion.id}`}
                        variant="light"
                        className="quick-view-btn"
                        disabled={habitacion.estado !== "Disponible"}
                    >
                        <i className="bi bi-eye me-2"></i>
                        Vista Rápida
                    </Button>
                </div>

                <Badge
                    bg={estadoInfo.variante}
                    className="position-absolute top-0 start-0 m-3 px-3 py-2 status-badge d-flex align-items-center"
                >
                    {estadoInfo.icono}
                    <span className="ms-1">{estadoInfo.etiqueta}</span>
                </Badge>

                <Badge
                    bg="primary"
                    className="position-absolute top-0 end-0 m-3 px-3 py-2 tipo-badge"
                >
                    {getTipoHabitacion(habitacion.tipo)}
                </Badge>

                {habitacion.precio && (
                    <div className="precio-tag">
                        <span className="precio-valor">${habitacion.precio}</span>
                        <span className="precio-periodo">/noche</span>
                    </div>
                )}
            </div>

            <Card.Body className="p-4">
                <Card.Title className="fs-4 font-medium mb-3">
                    {habitacion.nombre || `Habitación ${habitacion.id.split('-')[1]}`}
                </Card.Title>

                <div className="d-flex align-items-center mb-3 capacity-info">
                    <i className="bi bi-people-fill me-2 text-primary"></i>
                    <span>Capacidad para <strong>{habitacion.capacidad}</strong> personas</span>
                </div>

                <Card.Text className="text-muted mb-4 description">
                    {habitacion.descripcion || "Sin descripción disponible"}
                </Card.Text>

                {habitacion.servicios && habitacion.servicios.length > 0 && (
                    <div className="servicios-container mb-4">
                        <h6 className="font-medium mb-2">
                            <i className="bi bi-check-circle-fill me-2 text-success"></i>
                            Incluye:
                        </h6>
                        <div className="d-flex flex-wrap gap-2">
                            {habitacion.servicios.slice(0, 4).map((servicio, index) => (
                                <OverlayTrigger
                                    key={index}
                                    placement="top"
                                    overlay={<Tooltip>{servicio.replace(/_/g, ' ')}</Tooltip>}
                                >
                                    <div className="servicio-badge">
                                        <i className={`bi bi-${getServicioIcono(servicio)}`}></i>
                                    </div>
                                </OverlayTrigger>
                            ))}
                            {habitacion.servicios.length > 4 && (
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            {habitacion.servicios.slice(4).map(s => s.replace(/_/g, ' ')).join(', ')}
                                        </Tooltip>
                                    }
                                >
                                    <div className="servicio-badge servicio-badge-more">
                                        +{habitacion.servicios.length - 4}
                                    </div>
                                </OverlayTrigger>
                            )}
                        </div>
                    </div>
                )}
            </Card.Body>

            <Card.Footer className="bg-white border-0 p-4 pt-0">
                <div className="d-grid">
                    <Button
                        variant={habitacion.estado === "Disponible" ? "primary" : "secondary"}
                        className="py-2 rounded-pill reserve-btn hover-lift"
                        as={Link}
                        to={`/habitaciones/${habitacion.id}`}
                        disabled={habitacion.estado !== "Disponible"}
                    >
                        {habitacion.estado === "Disponible" ? (
                            <>
                                <i className="bi bi-calendar-check me-2"></i>
                                Reservar Ahora
                            </>
                        ) : (
                            <>
                                <i className="bi bi-x-circle me-2"></i>
                                No Disponible
                            </>
                        )}
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default HabitacionCard;