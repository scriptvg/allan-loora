import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usuariosApi } from '../api/usuariosApi';
import { useAlertMixin } from '../mixins/AlertMixin';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useLocalStorage('usuario', null);
    const [token, setToken] = useLocalStorage('token', null);
    const [cargando, setCargando] = useState(true);
    const { showSuccessAlert, showErrorAlert } = useAlertMixin();

    const estaAutenticado = !!token;

    // Verificar autenticación al cargar la aplicación
    useEffect(() => {
        const verificarAuth = async () => {
            if (token) {
                try {
                    // Aquí iría la verificación del token con el backend
                    // Por ahora solo verificamos que exista el token y un usuario
                    setCargando(false);
                } catch (error) {
                    console.error('Error al verificar autenticación:', error);
                    cerrarSesion();
                    setCargando(false);
                }
            } else {
                setCargando(false);
            }
        };

        verificarAuth();
    }, [token]);

    const iniciarSesion = async (email, contrasenia) => {
        try {
            const respuesta = await usuariosApi.iniciarSesion(email, contrasenia);
            setToken(respuesta.token);
            setUsuario(respuesta.usuario);
            showSuccessAlert('Sesión iniciada correctamente', {
                title: 'Bienvenido',
                autoClose: true
            });
            return respuesta.usuario;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            showErrorAlert('Email o contraseña incorrectos', {
                title: 'Error de autenticación',
                autoClose: true
            });
            throw error;
        }
    };

    const registrarUsuario = async (datosUsuario) => {
        try {
            const respuesta = await usuariosApi.registrarUsuario(datosUsuario);
            showSuccessAlert('Usuario registrado correctamente. Ya puede iniciar sesión.', {
                title: 'Registro exitoso',
                autoClose: true
            });
            return respuesta;
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            
            if (error.response?.data?.message) {
                showErrorAlert(error.response.data.message, {
                    title: 'Error de registro',
                    autoClose: true
                });
            } else {
                showErrorAlert('Error al registrar usuario. Por favor intente nuevamente.', {
                    title: 'Error de registro',
                    autoClose: true
                });
            }
            
            throw error;
        }
    };

    const cerrarSesion = () => {
        setToken(null);
        setUsuario(null);
        showSuccessAlert('Has cerrado sesión correctamente', {
            autoClose: true
        });
    };

    const actualizarUsuario = async (id, datosUsuario) => {
        try {
            const usuarioActualizado = await usuariosApi.actualizarUsuario(id, datosUsuario);
            setUsuario(usuarioActualizado);
            showSuccessAlert('Perfil actualizado correctamente', {
                title: 'Actualización exitosa',
                autoClose: true
            });
            return usuarioActualizado;
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            showErrorAlert('Error al actualizar perfil', {
                title: 'Error',
                autoClose: true
            });
            throw error;
        }
    };

    const cambiarContrasenia = async (id, contraseniaActual, nuevaContrasenia) => {
        try {
            await usuariosApi.cambiarContrasenia(id, contraseniaActual, nuevaContrasenia);
            showSuccessAlert('Contraseña actualizada correctamente', {
                title: 'Actualización exitosa',
                autoClose: true
            });
        } catch (error) {
            console.error('Error al cambiar contraseña:', error);
            
            if (error.response?.status === 401) {
                showErrorAlert('La contraseña actual es incorrecta', {
                    title: 'Error',
                    autoClose: true
                });
            } else {
                showErrorAlert('Error al cambiar contraseña', {
                    title: 'Error',
                    autoClose: true
                });
            }
            
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                token,
                estaAutenticado,
                cargando,
                iniciarSesion,
                registrarUsuario,
                cerrarSesion,
                actualizarUsuario,
                cambiarContrasenia
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const usarAutenticacion = () => useContext(AuthContext);