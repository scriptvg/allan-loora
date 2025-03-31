import React, { useState } from 'react';
import { Navbar, Container, Dropdown, Badge, Button } from 'react-bootstrap';
import { List, Bell, Envelope, Search, X, Person, Gear, BoxArrowLeft, CalendarCheck } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { usarAutenticacion } from '../../config/context/AuthContext';

const AdminHeader = ({ toggleSidebar, sidebarVisible }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { usuario, cerrarSesion } = usarAutenticacion();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        // Implementar búsqueda global
        console.log('Búsqueda:', searchQuery);
    };

    return (
        <Navbar bg="white" className="admin-header shadow-sm">
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
                        Dashboard
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    {showSearch ? (
                        <form onSubmit={handleSearch} className="search-form">
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Buscar..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                                <Button type="submit" variant="primary">
                                    <Search size={18} />
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowSearch(false)}
                                >
                                    <X size={18} />
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <Button
                            variant="light"
                            className="btn-icon me-2"
                            onClick={() => setShowSearch(true)}
                        >
                            <Search size={18} />
                        </Button>
                    )}

                    <Dropdown align="end" className="me-2">
                        <Dropdown.Toggle variant="light" className="btn-icon position-relative">
                            <Bell size={18} />
                            <Badge bg="danger" className="notification-badge">2</Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu-end notification-dropdown">
                            <Dropdown.Header>Notificaciones (2)</Dropdown.Header>
                            <Dropdown.Item className="notification-item">
                                <div className="notification-icon bg-primary">
                                    <CalendarCheck size={16} />
                                </div>
                                <div className="notification-content">
                                    <p className="mb-0">Nueva reserva creada</p>
                                    <small className="text-muted">Hace 10 minutos</small>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item className="notification-item">
                                <div className="notification-icon bg-success">
                                    <Person size={16} />
                                </div>
                                <div className="notification-content">
                                    <p className="mb-0">Nuevo cliente registrado</p>
                                    <small className="text-muted">Hace 2 horas</small>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item className="text-center">
                                Ver todas las notificaciones
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown align="end" className="me-2">
                        <Dropdown.Toggle variant="light" className="btn-icon position-relative">
                            <Envelope size={18} />
                            <Badge bg="danger" className="notification-badge">1</Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu-end">
                            <Dropdown.Header>Mensajes (1)</Dropdown.Header>
                            <Dropdown.Item className="message-item">
                                <div className="message-avatar">
                                    <img src="/avatar.jpg" alt="Usuario" />
                                </div>
                                <div className="message-content">
                                    <p className="mb-0">Juan Pérez</p>
                                    <small className="text-muted">Consulta sobre habitación...</small>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item className="text-center">
                                Ver todos los mensajes
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown align="end">
                        <Dropdown.Toggle className="user-dropdown" variant="light">
                            <div className="user-avatar-sm">
                                {usuario?.imgPerfil ? (
                                    <img src={usuario.imgPerfil} alt={usuario.nombre} />
                                ) : (
                                    <div className="avatar-placeholder-sm">{usuario?.nombre?.charAt(0) || 'A'}</div>
                                )}
                            </div>
                            <span className="ms-2 d-none d-md-inline">{usuario?.nombre || 'Admin'}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu-end">
                            <Dropdown.Item onClick={() => navigate('/admin/perfil')}>
                                <Person size={16} className="me-2" />
                                Mi Perfil
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/admin/configuracion')}>
                                <Gear size={16} className="me-2" />
                                Configuración
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={cerrarSesion}>
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

export default AdminHeader;
