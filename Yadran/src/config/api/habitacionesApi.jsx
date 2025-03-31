import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const habitacionesApi = {
    obtenerHabitaciones: async () => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/habitaciones`);
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener habitaciones:', error);
            throw error;
        }
    },

    obtenerHabitacionPorId: async (id) => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/habitaciones/${id}`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al obtener habitación con ID ${id}:`, error);
            throw error;
        }
    },

    crearHabitacion: async (datosHabitacion) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/habitaciones`, datosHabitacion);
            return respuesta.data;
        } catch (error) {
            console.error('Error al crear habitación:', error);
            throw error;
        }
    },

    actualizarHabitacion: async (id, datosHabitacion) => {
        try {
            const respuesta = await axios.put(`${BASE_URL}/habitaciones/${id}`, datosHabitacion);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al actualizar habitación con ID ${id}:`, error);
            throw error;
        }
    },

    eliminarHabitacion: async (id) => {
        try {
            const respuesta = await axios.delete(`${BASE_URL}/habitaciones/${id}`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al eliminar habitación con ID ${id}:`, error);
            throw error;
        }
    },

    actualizarEstadoHabitacion: async (id, nuevoEstado) => {
        try {
            const respuesta = await axios.patch(`${BASE_URL}/habitaciones/${id}/estado`, { estado: nuevoEstado });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al actualizar estado de habitación con ID ${id}:`, error);
            throw error;
        }
    },

    subirImagenesHabitacion: async (id, formData) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/habitaciones/${id}/imagenes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al subir imágenes para habitación con ID ${id}:`, error);
            throw error;
        }
    },

    eliminarImagenHabitacion: async (id, imgUrl) => {
        try {
            const respuesta = await axios.delete(`${BASE_URL}/habitaciones/${id}/imagenes`, {
                data: { imagenUrl: imgUrl }
            });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al eliminar imagen de habitación con ID ${id}:`, error);
            throw error;
        }
    },

    filtrarHabitaciones: async (filtros) => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/habitaciones/filtrar`, { params: filtros });
            return respuesta.data;
        } catch (error) {
            console.error('Error al filtrar habitaciones:', error);
            throw error;
        }
    }
};
