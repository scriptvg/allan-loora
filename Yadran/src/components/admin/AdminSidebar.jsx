import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { usarAutenticacion } from '../../config/context/AuthContext';
import { Speedometer2, Building, Stars, People, CalendarCheck, Gear, BoxArrowLeft, House } from 'react-bootstrap-icons';

const AdminSidebar = ({ visible }) => {
    const { usuario, cerrarSesion } = usarAutenticacion();
    const location = useLocation();

    const menuItems = [
        { path: '/admin', icon: <Speedometer2 size={18} />, label: 'Dashboard', exact: true },
        { path: '/admin/habitaciones', icon: <Building size={18} />, label: 'Habitaciones' },
        { path: '/admin/servicios', icon: <Stars size={18} />, label: 'Servicios' },
        { path: '/admin/clientes', icon: <People size={18} />, label: 'Clientes' },
        { path: '/admin/reservas', icon: <CalendarCheck size={18} />, label: 'Reservas' },
        { path: '/admin/configuracion', icon: <Gear size={18} />, label: 'Configuración' }
    ];

    const isActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <aside className={`admin-sidebar ${visible ? 'visible' : 'hidden'}`}>
            <div className="sidebar-header">
                <div className="logo-container">
                    <img src="/logo.jpg" alt="Yadran Logo" className="sidebar-logo" />
                    <span className="logo-text">Yadran Admin</span>
                </div>
            </div>

            <div className="user-info">
                <div className="user-avatar">
                    {usuario?.imgPerfil ? (
                        <img src={usuario.imgPerfil} alt={usuario.nombre} />
                    ) : (
                        <div className="avatar-placeholder">{usuario?.nombre?.charAt(0) || 'A'}</div>
                    )}
                </div>
                <div className="user-details">
                    <h5 className="user-name">{usuario?.nombre || 'Administrador'}</h5>
                    <p className="user-role">Administrador</p>
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

export default AdminSidebar;
