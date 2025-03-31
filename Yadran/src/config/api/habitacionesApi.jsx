const BASE_URL = 'http://localhost:3001';

export const habitacionesApi = {
    obtenerHabitaciones: async () => {
        try {
            const respuesta = await fetch(`${BASE_URL}/habitaciones`);
            return await respuesta.json();
        } catch (error) {
            console.error('Error al obtener habitaciones:', error);
            throw error;
        }
    },

    obtenerHabitacionPorId: async (id) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/habitaciones/${id}`);
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al obtener habitación con ID ${id}:`, error);
            throw error;
        }
    },

    crearHabitacion: async (datosHabitacion) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/habitaciones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosHabitacion)
            });
            return await respuesta.json();
        } catch (error) {
            console.error('Error al crear habitación:', error);
            throw error;
        }
    },

    actualizarHabitacion: async (id, datosHabitacion) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/habitaciones/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosHabitacion)
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al actualizar habitación con ID ${id}:`, error);
            throw error;
        }
    },

    eliminarHabitacion: async (id) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/habitaciones/${id}`, {
                method: 'DELETE'
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al eliminar habitación con ID ${id}:`, error);
            throw error;
        }
    },

    actualizarEstadoHabitacion: async (id, nuevoEstado) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/habitaciones/${id}/estado`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al actualizar estado de habitación con ID ${id}:`, error);
            throw error;
        }
    },

    subirImagenesHabitacion: async (id, formData) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/habitaciones/${id}/imagenes`, {
                method: 'POST',
                body: formData
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al subir imágenes para habitación con ID ${id}:`, error);
            throw error;
        }
    },

    eliminarImagenHabitacion: async (id, imgUrl) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/habitaciones/${id}/imagenes`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imagenUrl: imgUrl })
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al eliminar imagen de habitación con ID ${id}:`, error);
            throw error;
        }
    },

    filtrarHabitaciones: async (filtros) => {
        try {
            const queryParams = new URLSearchParams(filtros).toString();
            const respuesta = await fetch(`${BASE_URL}/habitaciones/filtrar?${queryParams}`);
            return await respuesta.json();
        } catch (error) {
            console.error('Error al filtrar habitaciones:', error);
            throw error;
        }
    }
};
