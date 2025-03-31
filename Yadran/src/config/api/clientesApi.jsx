const BASE_URL = 'http://localhost:3001';

export const clientesApi = {
    obtenerClientes: async () => {
        try {
            const respuesta = await fetch(`${BASE_URL}/clientes`);
            return await respuesta.json();
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            throw error;
        }
    },

    obtenerClientePorId: async (id) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/clientes/${id}`);
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al obtener cliente con ID ${id}:`, error);
            throw error;
        }
    },

    obtenerClientePorEmail: async (email) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/clientes/email/${email}`);
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al obtener cliente con email ${email}:`, error);
            throw error;
        }
    },

    crearCliente: async (datosCliente) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/clientes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosCliente)
            });
            return await respuesta.json();
        } catch (error) {
            console.error('Error al crear cliente:', error);
            throw error;
        }
    },

    actualizarCliente: async (id, datosCliente) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/clientes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosCliente)
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al actualizar cliente con ID ${id}:`, error);
            throw error;
        }
    },

    eliminarCliente: async (id) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/clientes/${id}`, {
                method: 'DELETE'
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al eliminar cliente con ID ${id}:`, error);
            throw error;
        }
    },

    actualizarEstadoCliente: async (id, nuevoEstado) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/clientes/${id}/estado`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al actualizar estado de cliente con ID ${id}:`, error);
            throw error;
        }
    },

    subirImagenPerfil: async (id, formData) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/clientes/${id}/imagen`, {
                method: 'POST',
                body: formData
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al subir imagen de perfil para cliente con ID ${id}:`, error);
            throw error;
        }
    },

    obtenerReservasCliente: async (id) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/clientes/${id}/reservas`);
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al obtener reservas del cliente con ID ${id}:`, error);
            throw error;
        }
    }
};
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})