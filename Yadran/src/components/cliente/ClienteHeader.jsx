import React from 'react';
import { Navbar, Container, Dropdown, Badge, Button } from 'react-bootstrap';
import { List, Bell, BoxArrowLeft, Gear, Person, Plus, CalendarCheck } from 'react-bootstrap-icons';
import { usarAutenticacion } from '../../config/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ClienteHeader = ({ toggleSidebar, sidebarVisible }) => {
    const { usuario, cerrarSesion } = usarAutenticacion();
    const navigate = useNavigate();
    
    return (
        <Navbar bg="white" className="cliente-header shadow-sm">
            <Container fluid>
                <div className="d-flex align-items-center">
                    <Button 
                        variant="link" 
                        className="sidebar-toggle p-0 me-3"
                        onClick={toggleSidebar}
                    >
                        <List size={24} />
                    </Button>
                    
                    <div className="page-title d-none d-md-block">
                        Portal Cliente
                    </div>
                </div>
                
                <div className="d-flex align-items-center">
                    <Dropdown align="end" className="me-3">
                        <Dropdown.Toggle variant="light" className="btn-icon position-relative">
                            <Bell size={18} />
                            <Badge bg="danger" className="notification-badge">1</Badge>
                        </Dropdown.Toggle>
                        
                        <Dropdown.Menu className="dropdown-menu-end notification-dropdown">
                            <Dropdown.Header>Notificaciones (1)</Dropdown.Header>
                            <Dropdown.Item className="notification-item">
                                <div className="notification-icon bg-primary">
                                    <CalendarCheck size={16} />
                                </div>
                                <div className="notification-content">
                                    <p className="mb-0">Recordatorio de reserva</p>
                                    <small className="text-muted">Su reserva es mañana</small>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item className="text-center">
                                Ver todas las notificaciones
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    <Button 
                        variant="success" 
                        className="me-3 d-none d-md-block"
                        onClick={() => navigate('/cliente/reservas/nueva')}
                    >
                        <Plus size={18} className="me-1" />
                        Nueva Reserva
                    </Button>
                    
                    <Dropdown align="end">
                        <Dropdown.Toggle className="user-dropdown" variant="light">
                            <div className="user-avatar-sm">
                                {usuario?.imgPerfil ? (
                                    <img src={usuario.imgPerfil} alt={usuario.nombre} />
                                ) : (
                                    <div className="avatar-placeholder-sm">{usuario?.nombre?.charAt(0) || 'C'}</div>
                                )}
                            </div>
                            <span className="ms-2 d-none d-md-inline">{usuario?.nombre || 'Cliente'}</span>
                        </Dropdown.Toggle>
                        
                        <Dropdown.Menu className="dropdown-menu-end">
                            <Dropdown.Item onClick={() => navigate('/cliente/perfil')}>
                                <Person size={16} className="me-2" />
                                Mi Perfil
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => cerrarSesion()}>
                                <BoxArrowLeft size={16} className="me-2" />
                                Cerrar Sesión
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Container>
        </Navbar>
    );
};

export default ClienteHeader;
