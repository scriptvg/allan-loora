const BASE_URL = 'http://localhost:3001';

export const reservasServiciosApi = {
    obtenerReservasServicios: async () => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas-servicios`);
            return await respuesta.json();
        } catch (error) {
            console.error('Error al obtener reservas de servicios:', error);
            throw error;
        }
    },

    obtenerReservaServicioPorId: async (id) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas-servicios/${id}`);
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al obtener reserva de servicio con ID ${id}:`, error);
            throw error;
        }
    },

    crearReservaServicio: async (datosReservaServicio) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas-servicios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosReservaServicio)
            });
            return await respuesta.json();
        } catch (error) {
            console.error('Error al crear reserva de servicio:', error);
            throw error;
        }
    },

    actualizarReservaServicio: async (id, datosReservaServicio) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas-servicios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosReservaServicio)
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al actualizar reserva de servicio con ID ${id}:`, error);
            throw error;
        }
    },

    eliminarReservaServicio: async (id) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas-servicios/${id}`, {
                method: 'DELETE'
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al eliminar reserva de servicio con ID ${id}:`, error);
            throw error;
        }
    },

    actualizarEstadoReservaServicio: async (id, nuevoEstado) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas-servicios/${id}/estado`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al actualizar estado de reserva de servicio con ID ${id}:`, error);
            throw error;
        }
    },

    obtenerReservasServiciosPorUsuario: async (usuarioId) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas-servicios/usuario/${usuarioId}`);
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al obtener reservas de servicios del usuario con ID ${usuarioId}:`, error);
            throw error;
        }
    },

    obtenerReservasServiciosPorServicio: async (servicioId) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas-servicios/servicio/${servicioId}`);
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al obtener reservas del servicio con ID ${servicioId}:`, error);
            throw error;
        }
    },

    verificarDisponibilidadServicio: async (servicioId, fecha, hora) => {
        try {
            const params = new URLSearchParams({ servicioId, fecha, hora });
            const respuesta = await fetch(`${BASE_URL}/reservas-servicios/disponibilidad?${params}`);
            return await respuesta.json();
        } catch (error) {
            console.error('Error al verificar disponibilidad del servicio:', error);
            throw error;
        }
    }
};