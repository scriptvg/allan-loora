import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { usarAutenticacion } from '../../config/context/AuthContext';
import { LayoutTextWindow, CalendarCheck, Star, PersonFill, CreditCard, BoxArrowLeft, House } from 'react-bootstrap-icons';

const ClienteSidebar = ({ visible }) => {
    const { usuario, cerrarSesion } = usarAutenticacion();
    const location = useLocation();

    const menuItems = [
        { path: '/cliente', icon: <LayoutTextWindow size={18} />, label: 'Inicio', exact: true },
        { path: '/cliente/reservas', icon: <CalendarCheck size={18} />, label: 'Mis Reservas' },
        { path: '/cliente/servicios', icon: <Star size={18} />, label: 'Servicios' },
        { path: '/cliente/perfil', icon: <PersonFill size={18} />, label: 'Mi Perfil' }
    ];

    const isActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <aside className={`cliente-sidebar ${visible ? 'visible' : 'hidden'}`}>
            <div className="sidebar-header">
                <div className="logo-container">
                    <img src="/logo.jpg" alt="Yadran Logo" className="sidebar-logo" />
                    <span className="logo-text">Portal Cliente</span>
                </div>
            </div>

            <div className="user-info">
                <div className="user-avatar">
                    {usuario?.imgPerfil ? (
                        <img src={usuario.imgPerfil} alt={usuario.nombre} />
                    ) : (
                        <div className="avatar-placeholder">{usuario?.nombre?.charAt(0) || 'C'}</div>
                    )}
                </div>
                <div className="user-details">
                    <h5 className="user-name">{usuario?.nombre || 'Cliente'}</h5>
                    <p className="user-role">Cliente</p>
                </div>
            </div>

            <nav className="sidebar-menu">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                className={`sidebar-link ${isActive(item.path, item.exact) ? 'active' : ''}`}
                            >
                                <span className="icon">{item.icon}</span>
                                <span className="label">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}

                    <li className="divider"></li>

                    <li>
                        <NavLink to="/" className="sidebar-link">
                            <span className="icon"><House size={18} /></span>
                            <span className="label">Ir a Sitio Web</span>
                        </NavLink>
                    </li>

                    <li>
                        <button
                            className="sidebar-link logout-btn"
                            onClick={cerrarSesion}
                        >
                            <span className="icon"><BoxArrowLeft size={18} /></span>
                            <span className="label">Cerrar Sesión</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default ClienteSidebar;
