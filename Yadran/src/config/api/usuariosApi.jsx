import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const usuariosApi = {
    obtenerUsuarios: async () => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/usuarios`);
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    },

    obtenerUsuarioPorId: async (id) => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/usuarios/${id}`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al obtener usuario con ID ${id}:`, error);
            throw error;
        }
    },

    iniciarSesion: async (email, contrasenia) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/auth/login`, { email, contrasenia });
            return respuesta.data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    },

    registrarUsuario: async (datosUsuario) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/auth/register`, datosUsuario);
            return respuesta.data;
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error;
        }
    },

    actualizarUsuario: async (id, datosUsuario) => {
        try {
            const respuesta = await axios.put(`${BASE_URL}/usuarios/${id}`, datosUsuario);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al actualizar usuario con ID ${id}:`, error);
            throw error;
        }
    },

    cambiarContrasenia: async (id, contraseniaActual, nuevaContrasenia) => {
        try {
            const respuesta = await axios.patch(`${BASE_URL}/usuarios/${id}/contrasenia`, {
                contraseniaActual,
                nuevaContrasenia
            });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al cambiar contraseña del usuario con ID ${id}:`, error);
            throw error;
        }
    },

    eliminarUsuario: async (id) => {
        try {
            const respuesta = await axios.delete(`${BASE_URL}/usuarios/${id}`);
            return respuesta.data;
        } catch (error) {
            console.error(`Error al eliminar usuario con ID ${id}:`, error);
            throw error;
        }
    },

    actualizarRol: async (id, nuevoRol) => {
        try {
            const respuesta = await axios.patch(`${BASE_URL}/usuarios/${id}/rol`, { rol: nuevoRol });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al actualizar rol del usuario con ID ${id}:`, error);
            throw error;
        }
    },

    recuperarContrasenia: async (email) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/auth/recuperar-contrasenia`, { email });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al enviar correo de recuperación a ${email}:`, error);
            throw error;
        }
    },

    resetearContrasenia: async (token, nuevaContrasenia) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/auth/resetear-contrasenia`, {
                token,
                nuevaContrasenia
            });
            return respuesta.data;
        } catch (error) {
            console.error('Error al resetear contraseña:', error);
            throw error;
        }
    },

    verificarToken: async (token) => {
        try {
            const respuesta = await axios.get(`${BASE_URL}/auth/verificar-token/${token}`);
            return respuesta.data;
        } catch (error) {
            console.error('Error al verificar token:', error);
            throw error;
        }
    },

    subirImagenPerfil: async (id, formData) => {
        try {
            const respuesta = await axios.post(`${BASE_URL}/usuarios/${id}/imagen`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return respuesta.data;
        } catch (error) {
            console.error(`Error al subir imagen de perfil para usuario con ID ${id}:`, error);
            throw error;
        }
    }
};
