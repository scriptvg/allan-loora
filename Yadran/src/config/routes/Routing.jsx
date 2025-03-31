import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { usarAutenticacion } from '../context/AuthContext';

// Layouts
import PublicLayout from '../../components/layout/PublicLayout';
import AdminLayout from '../../components/layout/AdminLayout';
import ClienteLayout from '../../components/layout/ClienteLayout';

// Páginas públicas
import Home from '../../pages/home/Home';
import Habitaciones from '../../pages/home/Habitaciones';
import DetalleHabitacion from '../../pages/home/DetalleHabitacion';
import Servicios from '../../pages/home/Servicios';
import Contacto from '../../pages/home/Contacto';
import Acerca from '../../pages/home/Acerca';
import Login from '../../pages/auth/Login';
import Registro from '../../pages/auth/Registro';
import RecuperarContrasenia from '../../pages/auth/RecuperarContrasenia';
import NotFound from '../../pages/NotFound';

// Páginas administrativas
import AdminDashboard from '../../pages/admin/Dashboard';
import AdminHabitaciones from '../../pages/admin/habitaciones/Habitaciones';
import AdminHabitacionesForm from '../../pages/admin/habitaciones/HabitacionForm';
import AdminServicios from '../../pages/admin/servicios/Servicios';
import AdminServiciosForm from '../../pages/admin/servicios/ServicioForm';
import AdminClientes from '../../pages/admin/clientes/Clientes';
import AdminClientesForm from '../../pages/admin/clientes/ClienteForm';
import AdminReservas from '../../pages/admin/reservas/Reservas';
import AdminReservasForm from '../../pages/admin/reservas/ReservaForm';
import AdminConfiguracion from '../../pages/admin/Configuracion';

// Páginas cliente
import ClienteDashboard from '../../pages/cliente/Dashboard';
import ClienteReservas from '../../pages/cliente/reservas/Reservas';
import ClienteNuevaReserva from '../../pages/cliente/reservas/NuevaReserva';
import ClienteServicios from '../../pages/cliente/servicios/Servicios';
import ClientePerfil from '../../pages/cliente/Perfil';

// Componentes para rutas protegidas
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { estaAutenticado, usuario } = usarAutenticacion();

    if (!estaAutenticado) {
        return <Navigate to="/iniciar-sesion" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(usuario.rol)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const AdminRoute = ({ children }) => (
    <ProtectedRoute allowedRoles={['admin']}>
        {children}
    </ProtectedRoute>
);

const ClienteRoute = ({ children }) => (
    <ProtectedRoute allowedRoles={['cliente']}>
        {children}
    </ProtectedRoute>
);

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="habitaciones" element={<Habitaciones />} />
                    <Route path="habitaciones/:id" element={<DetalleHabitacion />} />
                    <Route path="servicios" element={<Servicios />} />
                    <Route path="contacto" element={<Contacto />} />
                    <Route path="acerca" element={<Acerca />} />
                    <Route path="iniciar-sesion" element={<Login />} />
                    <Route path="registrarse" element={<Registro />} />
                    <Route path="recuperar-contrasenia" element={<RecuperarContrasenia />} />
                </Route>

                {/* Rutas Admin */}
                <Route path="/admin" element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }>
                    <Route index element={<AdminDashboard />} />
                    <Route path="habitaciones" element={<AdminHabitaciones />} />
                    <Route path="habitaciones/crear" element={<AdminHabitacionesForm />} />
                    <Route path="habitaciones/editar/:id" element={<AdminHabitacionesForm />} />
                    <Route path="servicios" element={<AdminServicios />} />
                    <Route path="servicios/crear" element={<AdminServiciosForm />} />
                    <Route path="servicios/editar/:id" element={<AdminServiciosForm />} />
                    <Route path="clientes" element={<AdminClientes />} />
                    <Route path="clientes/crear" element={<AdminClientesForm />} />
                    <Route path="clientes/editar/:id" element={<AdminClientesForm />} />
                    <Route path="reservas" element={<AdminReservas />} />
                    <Route path="reservas/crear" element={<AdminReservasForm />} />
                    <Route path="reservas/editar/:id" element={<AdminReservasForm />} />
                    <Route path="configuracion" element={<AdminConfiguracion />} />
                </Route>

                {/* Rutas Cliente */}
                <Route path="/cliente" element={
                    <ClienteRoute>
                        <ClienteLayout />
                    </ClienteRoute>
                }>
                    <Route index element={<ClienteDashboard />} />
                    <Route path="reservas" element={<ClienteReservas />} />
                    <Route path="reservas/nueva" element={<ClienteNuevaReserva />} />
                    <Route path="servicios" element={<ClienteServicios />} />
                    <Route path="perfil" element={<ClientePerfil />} />
                </Route>

                {/* Ruta para manejar 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;