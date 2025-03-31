import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const serviciosApi = {
    obtenerServicios: async () => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/servicios`);
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener servicios:', error);
            throw error;
        }
    },

    obtenerServicioPorId: async (id) => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/servicios/${id}`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al obtener servicio con ID ${id}:`, error);
            throw error;
        }
    },

    crearServicio: async (datosServicio) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/servicios`, datosServicio);
            return respuesta.data;
        } catch (error) {
            console.error('Error al crear servicio:', error);
            throw error;
        }
    },

    actualizarServicio: async (id, datosServicio) => {
        try {
            const respuesta = await axios.put(`${BASE_URL}/servicios/${id}`, datosServicio);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al actualizar servicio con ID ${id}:`, error);
            throw error;
        }
    },

    eliminarServicio: async (id) => {
        try {
            const respuesta = await axios.delete(`${BASE_URL}/servicios/${id}`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al eliminar servicio con ID ${id}:`, error);
            throw error;
        }
    },

    actualizarEstadoServicio: async (id, nuevoEstado) => {
        try {
            const respuesta = await axios.patch(`${BASE_URL}/servicios/${id}/estado`, { estado: nuevoEstado });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al actualizar estado de servicio con ID ${id}:`, error);
            throw error;
        }
    },

    marcarDestacado: async (id, esDestacado) => {
        try {
            const respuesta = await axios.patch(`${BASE_URL}/servicios/${id}/destacado`, { destacado: esDestacado });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al marcar servicio con ID ${id} como destacado:`, error);
            throw error;
        }
    },

    obtenerServiciosDestacados: async () => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/servicios/destacados`);
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener servicios destacados:', error);
            throw error;
        }
    },

    subirImagenServicio: async (id, formData) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/servicios/${id}/imagen`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al subir imagen para servicio con ID ${id}:`, error);
            throw error;
        }
    }
};
