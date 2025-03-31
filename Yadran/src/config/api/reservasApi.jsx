import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const reservasApi = {
    obtenerReservas: async () => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/reservas`);
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener reservas:', error);
            throw error;
        }
    },

    obtenerReservaPorId: async (id) => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/reservas/${id}`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al obtener reserva con ID ${id}:`, error);
            throw error;
        }
    },

    crearReserva: async (datosReserva) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/reservas`, datosReserva);
            return respuesta.data;
        } catch (error) {
            console.error('Error al crear reserva:', error);
            throw error;
        }
    },

    actualizarReserva: async (id, datosReserva) => {
        try {
            const respuesta = await axios.put(`${BASE_URL}/reservas/${id}`, datosReserva);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al actualizar reserva con ID ${id}:`, error);
            throw error;
        }
    },

    eliminarReserva: async (id) => {
        try {
            const respuesta = await axios.delete(`${BASE_URL}/reservas/${id}`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al eliminar reserva con ID ${id}:`, error);
            throw error;
        }
    },

    actualizarEstadoReserva: async (id, nuevoEstado) => {
        try {
            const respuesta = await axios.patch(`${BASE_URL}/reservas/${id}/estado`, { estado: nuevoEstado });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al actualizar estado de reserva con ID ${id}:`, error);
            throw error;
        }
    },

    verificarDisponibilidad: async (idHabitacion, fechaEntrada, fechaSalida) => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/reservas/disponibilidad`, {
                params: { idHabitacion, fechaEntrada, fechaSalida }
            });
            return respuesta.data;
        } catch (error) {
            console.error('Error al verificar disponibilidad:', error);
            throw error;
        }
    },

    obtenerReservasPorFecha: async (fechaInicio, fechaFin) => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/reservas/fecha`, {
                params: { fechaInicio, fechaFin }
            });
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener reservas por fecha:', error);
            throw error;
        }
    },

    obtenerEstadisticasReservas: async () => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/reservas/estadisticas`);
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener estadísticas de reservas:', error);
            throw error;
        }
    },

    agregarComentario: async (idReserva, comentario) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/reservas/${idReserva}/comentario`, { comentario });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al agregar comentario a la reserva con ID ${idReserva}:`, error);
            throw error;
        }
    },

    agregarServicioAdicional: async (idReserva, idServicio) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/reservas/${idReserva}/servicio`, { idServicio });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al agregar servicio a la reserva con ID ${idReserva}:`, error);
            throw error;
        }
    },

    eliminarServicioAdicional: async (idReserva, idServicio) => {
        try {
            const respuesta = await axios.delete(`${BASE_URL}/reservas/${idReserva}/servicio/${idServicio}`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al eliminar servicio de la reserva con ID ${idReserva}:`, error);
            throw error;
        }
    }
};
