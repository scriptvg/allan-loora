const BASE_URL = 'http://localhost:3001';

export const reservasApi = {
    obtenerReservas: async () => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas`);
            return await respuesta.json();
        } catch (error) {
            console.error('Error al obtener reservas:', error);
            throw error;
        }
    },

    obtenerReservaPorId: async (id) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas/${id}`);
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al obtener reserva con ID ${id}:`, error);
            throw error;
        }
    },

    crearReserva: async (datosReserva) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosReserva)
            });
            return await respuesta.json();
        } catch (error) {
            console.error('Error al crear reserva:', error);
            throw error;
        }
    },

    actualizarReserva: async (id, datosReserva) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosReserva)
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al actualizar reserva con ID ${id}:`, error);
            throw error;
        }
    },

    eliminarReserva: async (id) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas/${id}`, {
                method: 'DELETE'
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al eliminar reserva con ID ${id}:`, error);
            throw error;
        }
    },

    actualizarEstadoReserva: async (id, nuevoEstado) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas/${id}/estado`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al actualizar estado de reserva con ID ${id}:`, error);
            throw error;
        }
    },

    verificarDisponibilidad: async (idHabitacion, fechaEntrada, fechaSalida) => {
        try {
            const params = new URLSearchParams({ idHabitacion, fechaEntrada, fechaSalida });
            const respuesta = await fetch(`${BASE_URL}/reservas/disponibilidad?${params}`);
            return await respuesta.json();
        } catch (error) {
            console.error('Error al verificar disponibilidad:', error);
            throw error;
        }
    },

    obtenerReservasPorFecha: async (fechaInicio, fechaFin) => {
        try {
            const params = new URLSearchParams({ fechaInicio, fechaFin });
            const respuesta = await fetch(`${BASE_URL}/reservas/fecha?${params}`);
            return await respuesta.json();
        } catch (error) {
            console.error('Error al obtener reservas por fecha:', error);
            throw error;
        }
    },

    obtenerEstadisticasReservas: async () => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas/estadisticas`);
            return await respuesta.json();
        } catch (error) {
            console.error('Error al obtener estadísticas de reservas:', error);
            throw error;
        }
    },

    agregarComentario: async (idReserva, comentario) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas/${idReserva}/comentario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comentario })
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al agregar comentario a la reserva con ID ${idReserva}:`, error);
            throw error;
        }
    },

    agregarServicioAdicional: async (idReserva, idServicio) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas/${idReserva}/servicio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idServicio })
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al agregar servicio a la reserva con ID ${idReserva}:`, error);
            throw error;
        }
    },

    eliminarServicioAdicional: async (idReserva, idServicio) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/reservas/${idReserva}/servicio/${idServicio}`, {
                method: 'DELETE'
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al eliminar servicio de la reserva con ID ${idReserva}:`, error);
            throw error;
        }
    }
};
