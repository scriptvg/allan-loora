import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const clientesApi = {
    obtenerClientes: async () => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/clientes`);
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            throw error;
        }
    },

    obtenerClientePorId: async (id) => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/clientes/${id}`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al obtener cliente con ID ${id}:`, error);
            throw error;
        }
    },

    obtenerClientePorEmail: async (email) => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/clientes/email/${email}`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al obtener cliente con email ${email}:`, error);
            throw error;
        }
    },

    crearCliente: async (datosCliente) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/clientes`, datosCliente);
            return respuesta.data;
        } catch (error) {
            console.error('Error al crear cliente:', error);
            throw error;
        }
    },

    actualizarCliente: async (id, datosCliente) => {
        try {
            const respuesta = await axios.put(`${BASE_URL}/clientes/${id}`, datosCliente);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al actualizar cliente con ID ${id}:`, error);
            throw error;
        }
    },

    eliminarCliente: async (id) => {
        try {
            const respuesta = await axios.delete(`${BASE_URL}/clientes/${id}`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al eliminar cliente con ID ${id}:`, error);
            throw error;
        }
    },

    actualizarEstadoCliente: async (id, nuevoEstado) => {
        try {
            const respuesta = await axios.patch(`${BASE_URL}/clientes/${id}/estado`, { estado: nuevoEstado });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al actualizar estado de cliente con ID ${id}:`, error);
            throw error;
        }
    },

    subirImagenPerfil: async (id, formData) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/clientes/${id}/imagen`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al subir imagen de perfil para cliente con ID ${id}:`, error);
            throw error;
        }
    },

    obtenerReservasCliente: async (id) => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/clientes/${id}/reservas`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al obtener reservas del cliente con ID ${id}:`, error);
            throw error;
        }
    }
};
