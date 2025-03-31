import React from 'react';
import { Navbar, Container, Nav, Image, Dropdown } from 'react-bootstrap';
import { UserCircle, Menu, LogOut, User, Settings } from 'lucide-react';
import { useNavigate, Link, NavLink, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../../config/hooks/useScrollPosition';
import logo from './../../assets/img/logo.jpg';
import './styles/Header.css';

function HeaderUser() {
    const navigate = useNavigate();
    const location = useLocation();

    // Usar hook de scroll position para detectar scroll
    const { isScrolled } = useScrollPosition(50);

    // Verificar si una ruta está activa
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Simular cierre de sesión
    const handleLogout = () => {
        // Implementación futura de cierre de sesión
        navigate('/');
    };

    return (
        <Navbar
            expand="lg"
            className={`site-navbar ${isScrolled ? 'scrolled' : ''}`}
            fixed="top"
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="navbar-brand">
                    <Image
                        src={logo}
                        width={48}
                        height={48}
                        className="me-2 brand-logo"
                        roundedCircle
                        alt="Yadran Hotel"
                    />
                    <span className="brand-text">Yadran</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-user">
                    <Menu size={24} />
                </Navbar.Toggle>

                <Navbar.Collapse id="navbar-user">
                    <Nav className="mx-auto main-nav">
                        <Nav.Link
                            as={NavLink}
                            to="/habitaciones"
                            active={isActive('/habitaciones')}
                            className="nav-link"
                        >
                            Habitaciones
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/servicios"
                            active={isActive('/servicios')}
                            className="nav-link"
                        >
                            Servicios
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/contacto"
                            active={isActive('/contacto')}
                            className="nav-link"
                        >
                            Contacto
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/acerca"
                            active={isActive('/acerca')}
                            className="nav-link"
                        >
                            Acerca
                        </Nav.Link>
                    </Nav>

                    <div className="user-dropdown-container">
                        <Dropdown align="end">
                            <Dropdown.Toggle
                                variant="light"
                                id="dropdown-user"
                                className="user-dropdown-toggle rounded-pill"
                            >
                                <UserCircle size={24} className="user-icon" />
                                <span className="d-none d-md-inline ms-2">Admin</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="user-dropdown-menu shadow-lg border-0">
                                <Dropdown.Item className="user-dropdown-item">
                                    <User size={16} className="dropdown-icon" />
                                    <span>Mi perfil</span>
                                </Dropdown.Item>

                                <Dropdown.Item className="user-dropdown-item" as={Link} to="/admin">
                                    <Settings size={16} className="dropdown-icon" />
                                    <span>Panel de Administración</span>
                                </Dropdown.Item>

                                <Dropdown.Divider />

                                <Dropdown.Item
                                    className="user-dropdown-item text-danger"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={16} className="dropdown-icon" />
                                    <span>Cerrar Sesión</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderUser;