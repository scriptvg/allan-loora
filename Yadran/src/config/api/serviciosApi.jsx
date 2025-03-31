export const serviciosApi = {
    obtenerServicios: async () => {
        try {
            const response = await fetch(`${API_URL}/servicios`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al obtener servicios:', error);
            throw error;
        }
    },

    obtenerServicioPorId: async (id) => {
        try {
            const response = await fetch(`${API_URL}/servicios/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error al obtener servicio con ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Crea un nuevo servicio
     * @param {Object} servicio Datos del nuevo servicio
     * @returns {Promise<Object>} Servicio creado
     */
    crearServicio: async (servicio) => {
        try {
            const response = await fetch(`${API_URL}/servicios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(servicio)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al crear servicio:', error);
            throw error;
        }
    },

    /**
     * Actualiza un servicio existente
     * @param {string} id ID del servicio a actualizar
     * @param {Object} servicio Datos actualizados del servicio
     * @returns {Promise<Object>} Servicio actualizado
     */
    actualizarServicio: async (id, servicio) => {
        try {
            const response = await fetch(`${API_URL}/servicios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(servicio)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error al actualizar servicio con ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Elimina un servicio
     * @param {string} id ID del servicio a eliminar
     * @returns {Promise<void>}
     */
    eliminarServicio: async (id) => {
        try {
            const response = await fetch(`${API_URL}/servicios/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error(`Error al eliminar servicio con ID ${id}:`, error);
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
    },

    /**
     * Actualiza el estado de un servicio
     * @param {string} id ID del servicio
     * @param {string} estado Nuevo estado
     * @returns {Promise<Object>} Servicio actualizado
     */
    actualizarEstadoServicio: async (id, estado) => {
        try {
            const response = await fetch(`${API_URL}/servicios/${id}/estado`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error al actualizar estado del servicio con ID ${id}:`, error);
            throw error;
        }
    }
};

export default serviciosApi;
