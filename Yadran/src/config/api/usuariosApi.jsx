const BASE_URL = 'http://localhost:3001';

export const usuariosApi = {
    obtenerUsuarios: async () => {
        try {
            const respuesta = await fetch(`${BASE_URL}/usuarios`);
            return await respuesta.json();
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    },

    obtenerUsuarioPorId: async (id) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/usuarios/${id}`);
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al obtener usuario con ID ${id}:`, error);
            throw error;
        }
    },

    iniciarSesion: async (email, contrasenia) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, contrasenia })
            });
            return await respuesta.json();
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    },

    registrarUsuario: async (datosUsuario) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuario)
            });
            return await respuesta.json();
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error;
        }
    },

    actualizarUsuario: async (id, datosUsuario) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuario)
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al actualizar usuario con ID ${id}:`, error);
            throw error;
        }
    },

    cambiarContrasenia: async (id, contraseniaActual, nuevaContrasenia) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/usuarios/${id}/contrasenia`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contraseniaActual, nuevaContrasenia })
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al cambiar contraseña del usuario con ID ${id}:`, error);
            throw error;
        }
    },

    eliminarUsuario: async (id) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/usuarios/${id}`, {
                method: 'DELETE'
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al eliminar usuario con ID ${id}:`, error);
            throw error;
        }
    },

    actualizarRol: async (id, nuevoRol) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/usuarios/${id}/rol`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rol: nuevoRol })
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al actualizar rol del usuario con ID ${id}:`, error);
            throw error;
        }
    },

    recuperarContrasenia: async (email) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/auth/recuperar-contrasenia`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al enviar correo de recuperación a ${email}:`, error);
            throw error;
        }
    },

    resetearContrasenia: async (token, nuevaContrasenia) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/auth/resetear-contrasenia`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, nuevaContrasenia })
            });
            return await respuesta.json();
        } catch (error) {
            console.error('Error al resetear contraseña:', error);
            throw error;
        }
    },

    verificarToken: async (token) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/auth/verificar-token/${token}`);
            return await respuesta.json();
        } catch (error) {
            console.error('Error al verificar token:', error);
            throw error;
        }
    },

    subirImagenPerfil: async (id, formData) => {
        try {
            const respuesta = await fetch(`${BASE_URL}/usuarios/${id}/imagen`, {
                method: 'POST',
                body: formData
            });
            return await respuesta.json();
        } catch (error) {
            console.error(`Error al subir imagen de perfil para usuario con ID ${id}:`, error);
            throw error;
        }
    }
};
