import React, { useState, useEffect, useCallback } from 'react'
import { Navbar, Container, Nav, Button, Image, NavDropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { usarAutenticacion } from '../../config/context/AuthContext.jsx';
import { useScrollPosition } from '../../config/hooks/useScrollPosition.jsx';
import { useWindowSize } from '../../config/hooks/useWindowSize.jsx';
import logo from '../../assets/img/logo.jpg';
import './styles/Header.css';

function Header() {
    const { usuario, estaAutenticado, cerrarSesion } = usarAutenticacion();
    const navigate = useNavigate();
    const location = useLocation();
    const [expanded, setExpanded] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);

    // Usar hook de scroll position para detectar scroll
    const { isScrolled } = useScrollPosition(50);

    // Usar hook de window size para detectar el tamaño de la ventana
    const { isMobile } = useWindowSize();

    // Determinar si la página actual necesita navbar transparente
    const transparentNavbarPages = ['/'];
    const shouldBeTransparent = transparentNavbarPages.includes(location.pathname);
    const isTransparent = shouldBeTransparent && !isScrolled;

    // Efecto para cerrar navbar al cambiar de ruta
    useEffect(() => {
        setExpanded(false);
    }, [location.pathname]);

    // Verificar ruta activa (memoizado para evitar cálculos innecesarios)
    const isActive = useCallback((path) => {
        if (path === '/') {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    }, [location.pathname]);

    // Manejar cierre de sesión
    const handleLogout = () => {
        setExpanded(false);
        cerrarSesion();
        navigate('/');
    };

    // Para controlar el accordion del dashboard dentro del dropdown
    const toggleDashboard = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDashboard(!showDashboard);
    };

    // Renderizar las opciones del dashboard
    const renderDashboardOptions = () => {
        const dashboardLinks = [
            { path: '/admin/habitaciones', icon: 'house-door', label: 'Gestionar Habitaciones' },
            { path: '/admin/servicios', icon: 'stars', label: 'Gestionar Servicios' },
            { path: '/admin/clientes', icon: 'people', label: 'Gestionar Clientes' },
            { path: '/admin/reservas', icon: 'calendar-check', label: 'Gestionar Reservas' },
            { path: '/admin', icon: 'speedometer2', label: 'Panel Principal', exact: true }
        ];

        return dashboardLinks.map((link, index) => (
            <Link
                key={index}
                to={link.path}
                className={`accordion-item ${link.exact ? location.pathname === link.path : isActive(link.path) ? 'active' : ''}`}
                onClick={() => setExpanded(false)}
            >
                <i className={`bi bi-${link.icon} me-2`}></i>
                {link.label}
            </Link>
        ));
    };

    // Renderizar el avatar del usuario
    const renderUserAvatar = () => {
        if (usuario?.imgPerfil) {
            return (
                <Image
                    src={usuario.imgPerfil}
                    roundedCircle
                    className="user-avatar me-2"
                    alt={usuario?.nombre || 'Usuario'}
                />
            );
        }

        return (
            <div className="user-avatar-placeholder me-2">
                {usuario?.nombre?.charAt(0) || 'U'}
            </div>
        );
    };

    return (
        <Navbar
            expand="lg"
            className={`site-navbar ${isTransparent ? 'navbar-transparent' : ''} ${isScrolled ? 'scrolled' : ''}`}
            expanded={expanded}
            onToggle={(isExpanded) => setExpanded(isExpanded)}
            fixed="top"
            variant={isTransparent ? "dark" : "light"}
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="navbar-brand" onClick={() => setExpanded(false)}>
                    <Image src={logo} width={48} height={48} className="me-2" roundedCircle alt="Yadran Hotel" />
                    <span className={isTransparent ? "text-white" : ""}>Yadran</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon custom-toggler"></span>
                </Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        {[
                            { path: '/', label: 'Inicio', exact: true },
                            { path: '/habitaciones', label: 'Habitaciones' },
                            { path: '/servicios', label: 'Servicios' },
                            { path: '/contacto', label: 'Contacto' },
                            { path: '/acerca', label: 'Acerca' }
                        ].map((item, index) => (
                            <Nav.Link
                                key={index}
                                as={Link}
                                to={item.path}
                                className={`${item.exact ? (location.pathname === item.path ? 'active' : '') : (isActive(item.path) ? 'active' : '')} ${isTransparent ? 'nav-link-light' : ''}`}
                                onClick={() => setExpanded(false)}
                            >
                                {item.label}
                            </Nav.Link>
                        ))}
                    </Nav>

                    <div className="nav-right-section">
                        {estaAutenticado ? (
                            <NavDropdown
                                title={
                                    <div className="d-inline-flex align-items-center">
                                        {renderUserAvatar()}
                                        <span className={`d-none d-md-inline ${isTransparent ? "text-white" : ""}`}>
                                            {usuario?.nombre || 'Usuario'}
                                        </span>
                                    </div>
                                }
                                id="user-dropdown"
                                align="end"
                                className={`user-dropdown no-hover-animation ${isTransparent ? 'dropdown-light' : ''}`}
                            >
                                <NavDropdown.Item as={Link} to="/perfil" onClick={() => setExpanded(false)}>
                                    <i className="bi bi-person"></i>
                                    Mi Perfil
                                </NavDropdown.Item>

                                {usuario?.rol !== 'admin' && (
                                    <NavDropdown.Item as={Link} to="/mis-reservas" onClick={() => setExpanded(false)}>
                                        <i className="bi bi-calendar-check"></i>
                                        Mis Reservas
                                    </NavDropdown.Item>
                                )}

                                {/* Dashboard Accordion para administradores */}
                                {usuario?.rol === 'admin' && (
                                    <>
                                        <NavDropdown.Divider />

                                        <div className={`accordion-header ${showDashboard ? 'active' : ''}`} onClick={toggleDashboard}>
                                            <i className="bi bi-gear-fill"></i>
                                            Dashboard
                                            <i className="ms-auto bi bi-chevron-down"></i>
                                        </div>

                                        {showDashboard && (
                                            <div className="accordion-content">
                                                {renderDashboardOptions()}
                                            </div>
                                        )}
                                    </>
                                )}

                                <NavDropdown.Divider />

                                <NavDropdown.Item onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right"></i>
                                    Cerrar Sesión
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <div className="d-flex flex-column flex-lg-row auth-buttons">
                                <Nav.Link
                                    as={Link}
                                    to="/iniciar-sesion"
                                    className={`nav-btn-outline ${isTransparent ? 'nav-btn-outline-light' : ''}`}
                                    onClick={() => setExpanded(false)}
                                >
                                    <i className="bi bi-box-arrow-in-right me-1"></i>
                                    Login
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/registrarse"
                                    className={`nav-btn-primary ${isTransparent ? 'nav-btn-primary-light' : ''}`}
                                    onClick={() => setExpanded(false)}
                                >
                                    <i className="bi bi-person-plus me-1"></i>
                                    Registro
                                </Nav.Link>
                            </div>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;