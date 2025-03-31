// useHabitaciones.jsx
import { useState, useEffect } from 'react';
import useGeneradorId from './useGeneradorId.jsx';

const URL_API = 'http://localhost:3001/habitaciones';

const useHabitaciones = () => {
    const [habitaciones, establecerHabitaciones] = useState([]);
    const [cargando, establecerCargando] = useState(true);
    const [error, establecerError] = useState(null);
    const { id, regenerarId } = useGeneradorId();

    // Obtener todas las habitaciones
    const obtenerHabitaciones = async () => {
        try {
            establecerCargando(true);
            const respuesta = await fetch(URL_API);
            if (!respuesta.ok) {
                throw new Error('Error al obtener las habitaciones');
            }
            const datos = await respuesta.json();
            establecerHabitaciones(datos);
        } catch (error) {
            establecerError(error.message);
        } finally {
            establecerCargando(false);
        }
    };

    // Obtener una habitación por su ID
    const obtenerHabitacionPorId = async (id) => {
        try {
            establecerCargando(true);
            const respuesta = await fetch(`${URL_API}/${id}`);
            if (!respuesta.ok) {
                throw new Error('Error al obtener la habitación');
            }
            return await respuesta.json();
        } catch (error) {
            establecerError(error.message);
            return null;
        } finally {
            establecerCargando(false);
        }
    };

    // Crear una nueva habitación
    const crearHabitacion = async (datosHabitacion) => {
        try {
            regenerarId(); // Generar un nuevo ID único

            const nuevaHabitacion = {
                id,
                nombre: datosHabitacion.nombre || `Habitación ${id.substring(0, 6)}`,
                numero: datosHabitacion.numero,
                tipo: datosHabitacion.tipo || "doble",
                descripcion: datosHabitacion.descripcion || "",
                precio: datosHabitacion.precio || 0,
                capacidad: datosHabitacion.capacidad || 1,
                estado: datosHabitacion.estado || "Disponible",
                tamaño: datosHabitacion.tamaño || 25,
                servicios: datosHabitacion.servicios || [],
                imgsHabitacion: {
                    img: datosHabitacion.imagenes || [],
                    imgHabitacion: datosHabitacion.imagenesHabitacion || []
                }
            };

            // Verificar si ya existe una habitación con el mismo número
            const existeNumero = await verificarNumeroExistente(datosHabitacion.numero);
            if (existeNumero) {
                throw new Error('El número de habitación ya está registrado');
            }

            const respuesta = await fetch(URL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaHabitacion),
            });

            if (!respuesta.ok) {
                const error = await respuesta.json();
                throw new Error(error.message || 'Error al crear la habitación');
            }

            obtenerHabitaciones(); // Actualizamos el listado de habitaciones después de la creación.
            return nuevaHabitacion;
        } catch (error) {
            establecerError(error.message);
            throw error;
        }
    };

    // Actualizar una habitación existente
    const actualizarHabitacion = async (id, datosActualizados) => {
        try {
            const habitacionActual = await obtenerHabitacionPorId(id);

            if (!habitacionActual) {
                throw new Error('Habitación no encontrada');
            }

            if (datosActualizados.numero && datosActualizados.numero !== habitacionActual.numero) {
                const existeNumero = await verificarNumeroExistente(datosActualizados.numero);
                if (existeNumero) {
                    throw new Error('El número de habitación ya está en uso');
                }
            }

            const habitacionActualizada = {
                ...habitacionActual,
                nombre: datosActualizados.nombre || habitacionActual.nombre,
                numero: datosActualizados.numero || habitacionActual.numero,
                tipo: datosActualizados.tipo || habitacionActual.tipo,
                descripcion: datosActualizados.descripcion || habitacionActual.descripcion,
                precio: datosActualizados.precio !== undefined ? datosActualizados.precio : habitacionActual.precio,
                capacidad: datosActualizados.capacidad !== undefined ? datosActualizados.capacidad : habitacionActual.capacidad,
                estado: datosActualizados.estado || habitacionActual.estado,
                tamaño: datosActualizados.tamaño || habitacionActual.tamaño,
                servicios: datosActualizados.servicios || habitacionActual.servicios,
                imgsHabitacion: {
                    img: datosActualizados.imagenes || habitacionActual.imgsHabitacion?.img || [],
                    imgHabitacion: datosActualizados.imagenesHabitacion || habitacionActual.imgsHabitacion?.imgHabitacion || []
                }
            };

            const respuesta = await fetch(`${URL_API}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(habitacionActualizada),
            });

            if (!respuesta.ok) {
                const error = await respuesta.json();
                throw new Error(error.message || 'Error al actualizar la habitación');
            }

            obtenerHabitaciones(); // Actualizamos el listado de habitaciones después de la actualización.
            return habitacionActualizada;
        } catch (error) {
            establecerError(error.message);
            throw error;
        }
    };

    // Eliminar una habitación
    const eliminarHabitacion = async (id) => {
        try {
            const respuesta = await fetch(`${URL_API}/${id}`, {
                method: 'DELETE',
            });

            if (!respuesta.ok) {
                const error = await respuesta.json();
                throw new Error(error.message || 'Error al eliminar la habitación');
            }

            obtenerHabitaciones(); // Actualizamos el listado de habitaciones después de la eliminación.
            return { success: true, message: 'Habitación eliminada correctamente' };
        } catch (error) {
            establecerError(error.message);
            throw error;
        }
    };

    // Verificar si un número de habitación ya está registrado
    const verificarNumeroExistente = async (numero) => {
        try {
            const respuesta = await fetch(`${URL_API}?numero=${numero}`);
            if (!respuesta.ok) {
                throw new Error('Error al verificar el número de habitación');
            }

            const habitaciones = await respuesta.json();
            return habitaciones.length > 0;
        } catch (error) {
            establecerError(error.message);
            return false;
        }
    };

    // Cambiar el estado de una habitación
    const cambiarEstadoHabitacion = async (id, nuevoEstado) => {
        try {
            const habitacion = await obtenerHabitacionPorId(id);
            if (!habitacion) {
                throw new Error('Habitación no encontrada');
            }

            const respuesta = await fetch(`${URL_API}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: nuevoEstado }),
            });

            if (!respuesta.ok) {
                throw new Error('Error al cambiar el estado de la habitación');
            }

            obtenerHabitaciones();
            return { success: true, message: 'Estado de habitación actualizado correctamente' };
        } catch (error) {
            establecerError(error.message);
            throw error;
        }
    };

    // Buscar habitaciones por filtros
    const buscarHabitaciones = async (filtros = {}) => {
        try {
            establecerCargando(true);
            
            // Construir query string
            const queryParams = Object.entries(filtros)
                .filter(([_, valor]) => valor !== undefined && valor !== '')
                .map(([key, valor]) => `${key}=${encodeURIComponent(valor)}`)
                .join('&');
            
            const url = queryParams ? `${URL_API}?${queryParams}` : URL_API;
            
            const respuesta = await fetch(url);
            if (!respuesta.ok) {
                throw new Error('Error al buscar habitaciones');
            }
            
            const datos = await respuesta.json();
            return datos;
        } catch (error) {
            establecerError(error.message);
            return [];
        } finally {
            establecerCargando(false);
        }
    };

    useEffect(() => {
        obtenerHabitaciones();
    }, []);

    return {
        habitaciones,
        cargando,
        error,
        obtenerHabitaciones,
        obtenerHabitacionPorId,
        crearHabitacion,
        actualizarHabitacion,
        eliminarHabitacion,
        cambiarEstadoHabitacion,
        buscarHabitaciones
    };
};

export default useHabitaciones;