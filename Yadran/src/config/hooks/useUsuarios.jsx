import { useState, useEffect } from 'react';
/* import { generarAvatarPlaceholder } from '../utils/ImageUtils.jsx'; */
import useGeneradorId from './useGeneradorId.jsx';

const URL_API = 'http://localhost:3001/usuarios';

const useUsuarios = () => {
    const [usuarios, establecerUsuarios] = useState([]);
    const [cargando, establecerCargando] = useState(true);
    const [error, establecerError] = useState(null);
    const { id, regenerarId } = useGeneradorId();

    // Obtener todos los usuarios
    const obtenerUsuarios = async () => {
        try {
            establecerCargando(true);
            const respuesta = await fetch(URL_API);
            if (!respuesta.ok) {
                throw new Error('Error al obtener los usuarios');
            }
            const datos = await respuesta.json();
            establecerUsuarios(datos);
        } catch (error) {
            establecerError(error.message);
        } finally {
            establecerCargando(false);
        }
    };

    // Crear un nuevo usuario
    const crearUsuario = async (datosUsuario) => {
        try {
            regenerarId(); // Generar un nuevo ID único
/*             const imgPerfil = datosUsuario.imgPerfil || generarAvatarPlaceholder(datosUsuario.nombre); */

            const nuevoUsuario = {
                id,
                email: datosUsuario.email,
                password: datosUsuario.password,
                role: datosUsuario.rol || "cliente",
                token: "active",
                datos: {
                    nombre: datosUsuario.nombre,
                    apellido: datosUsuario.apellidos || "",
                    telefono: datosUsuario.telefono || "",
                    direccion: datosUsuario.direccion || ""
                },
                imgsUsuario: {
                    imgPerfil,
                    img: imgPerfil
                }
            };

            const existeCorreo = await verificarCorreoExistente(datosUsuario.email);
            if (existeCorreo) {
                throw new Error('El correo electrónico ya está registrado');
            }

            const respuesta = await fetch(URL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoUsuario),
            });

            if (!respuesta.ok) {
                const error = await respuesta.json();
                throw new Error(error.message || 'Error al crear el usuario');
            }

            obtenerUsuarios(); // Actualizamos el listado de usuarios después de la creación.
        } catch (error) {
            establecerError(error.message);
        }
    };

    // Actualizar un usuario existente
    const actualizarUsuario = async (id, datosActualizados) => {
        try {
            const usuarioActual = await obtenerUsuarioPorId(id);

            if (datosActualizados.email && datosActualizados.email !== usuarioActual.email) {
                const existeCorreo = await verificarCorreoExistente(datosActualizados.email);
                if (existeCorreo) {
                    throw new Error('El correo electrónico ya está en uso');
                }
            }

            const usuarioActualizado = {
                ...usuarioActual,
                email: datosActualizados.email || usuarioActual.email,
                ...(datosActualizados.password && { password: datosActualizados.password }),
                datos: {
                    ...usuarioActual.datos,
                    nombre: datosActualizados.nombre || usuarioActual.datos.nombre,
                    apellido: datosActualizados.apellidos || usuarioActual.datos.apellido,
                    telefono: datosActualizados.telefono || usuarioActual.datos.telefono,
                    direccion: datosActualizados.direccion || usuarioActual.datos.direccion
                },
                imgsUsuario: {
                    ...usuarioActual.imgsUsuario,
                    ...(datosActualizados.imgPerfil && { imgPerfil: datosActualizados.imgPerfil }),
                    ...(datosActualizados.imgPerfil && { img: datosActualizados.imgPerfil })
                }
            };

            const respuesta = await fetch(`${URL_API}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioActualizado),
            });

            if (!respuesta.ok) {
                const error = await respuesta.json();
                throw new Error(error.message || 'Error al actualizar el usuario');
            }

            obtenerUsuarios(); // Actualizamos el listado de usuarios después de la actualización.
        } catch (error) {
            establecerError(error.message);
        }
    };

    // Eliminar un usuario
    const eliminarUsuario = async (id) => {
        try {
            const respuesta = await fetch(`${URL_API}/${id}`, {
                method: 'DELETE',
            });

            if (!respuesta.ok) {
                const error = await respuesta.json();
                throw new Error(error.message || 'Error al eliminar el usuario');
            }

            obtenerUsuarios(); // Actualizamos el listado de usuarios después de la eliminación.
        } catch (error) {
            establecerError(error.message);
        }
    };

    // Verificar si un correo ya está registrado
    const verificarCorreoExistente = async (email) => {
        try {
            const respuesta = await fetch(`${URL_API}?email=${email}`);
            if (!respuesta.ok) {
                throw new Error('Error al verificar el correo');
            }

            const usuarios = await respuesta.json();
            return usuarios.length > 0;
        } catch (error) {
            establecerError(error.message);
        }
    };

    // Iniciar sesión de un usuario
    const iniciarSesion = async (credenciales) => {
        try {
            const correoCodificado = encodeURIComponent(credenciales.email);
            const url = `${URL_API}?email=${correoCodificado}`;

            const respuesta = await fetch(url);

            if (!respuesta.ok) {
                throw new Error('Error en el servidor');
            }

            const usuarios = await respuesta.json();

            if (usuarios.length === 0) {
                throw new Error('Usuario no encontrado');
            }

            const usuario = usuarios[0];

            if (usuario.password !== credenciales.password) {
                throw new Error('Contraseña incorrecta');
            }

            return formatearDatosUsuario(usuario);
        } catch (error) {
            establecerError(error.message);
        }
    };

    const formatearDatosUsuario = (usuario) => {
        return {
            id: usuario.id,
            nombre: usuario.datos?.nombre || '',
            apellido: usuario.datos?.apellido || '',
            email: usuario.email,
            rol: usuario.role,
            imgPerfil: usuario.imgsUsuario?.imgPerfil || usuario.imgsUsuario?.img || '',
            token: usuario.token,
            imgsUsuario: usuario.imgsUsuario || {},
            datos: usuario.datos || {}
        };
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    return {
        usuarios,
        cargando,
        error,
        obtenerUsuarios,
        crearUsuario,
        actualizarUsuario,
        eliminarUsuario,
        iniciarSesion
    };
};

export default useUsuarios;
