import { useState, useEffect, useCallback } from 'react';
import { serviciosApi } from '../api/serviciosApi';
import { useAlertMixin } from '../mixins/AlertMixin';

export const usarServicios = () => {
    const [servicios, setServicios] = useState([]);
    const [servicio, setServicio] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const { showSuccessAlert, showErrorAlert } = useAlertMixin();

    const obtenerServicios = useCallback(async () => {
        try {
            setCargando(true);
            setError(null);
            const datos = await serviciosApi.obtenerServicios();
            setServicios(datos);
            return datos;
        } catch (error) {
            console.error('Error al obtener servicios:', error);
            setError('No se pudieron cargar los servicios');
            showErrorAlert('Error al cargar los servicios', {
                title: 'Error',
                autoClose: true
            });
            return [];
        } finally {
            setCargando(false);
        }
    }, [showErrorAlert]);

    const obtenerServicioPorId = useCallback(async (id) => {
        try {
            setCargando(true);
            setError(null);
            const datos = await serviciosApi.obtenerServicioPorId(id);
            setServicio(datos);
            return datos;
        } catch (error) {
            console.error(`Error al obtener servicio con ID ${id}:`, error);
            setError(`No se pudo cargar el servicio con ID ${id}`);
            showErrorAlert(`Error al cargar el servicio #${id}`, {
                title: 'Error',
                autoClose: true
            });
            return null;
        } finally {
            setCargando(false);
        }
    }, [showErrorAlert]);

    const crearServicio = useCallback(async (datosServicio) => {
        try {
            setCargando(true);
            setError(null);
            const nuevoServicio = await serviciosApi.crearServicio(datosServicio);
            setServicios(prev => [...prev, nuevoServicio]);
            showSuccessAlert('Servicio creado exitosamente', {
                title: 'Éxito',
                autoClose: true
            });
            return nuevoServicio;
        } catch (error) {
            console.error('Error al crear servicio:', error);
            setError('No se pudo crear el servicio');
            showErrorAlert('Error al crear el servicio', {
                title: 'Error',
                autoClose: true
            });
            throw error;
        } finally {
            setCargando(false);
        }
    }, [showSuccessAlert, showErrorAlert]);

    const actualizarServicio = useCallback(async (id, datosServicio) => {
        try {
            setCargando(true);
            setError(null);
            const servicioActualizado = await serviciosApi.actualizarServicio(id, datosServicio);

            setServicios(prev =>
                prev.map(s => s.id === id ? servicioActualizado : s)
            );

            setServicio(servicioActualizado);

            showSuccessAlert('Servicio actualizado exitosamente', {
                title: 'Éxito',
                autoClose: true
            });

            return servicioActualizado;
        } catch (error) {
            console.error(`Error al actualizar servicio con ID ${id}:`, error);
            setError(`No se pudo actualizar el servicio con ID ${id}`);

            showErrorAlert('Error al actualizar el servicio', {
                title: 'Error',
                autoClose: true
            });

            throw error;
        } finally {
            setCargando(false);
        }
    }, [showSuccessAlert, showErrorAlert]);

    const eliminarServicio = useCallback(async (id) => {
        try {
            setCargando(true);
            setError(null);
            await serviciosApi.eliminarServicio(id);

            setServicios(prev => prev.filter(s => s.id !== id));

            if (servicio && servicio.id === id) {
                setServicio(null);
            }

            showSuccessAlert('Servicio eliminado exitosamente', {
                title: 'Éxito',
                autoClose: true
            });

            return true;
        } catch (error) {
            console.error(`Error al eliminar servicio con ID ${id}:`, error);
            setError(`No se pudo eliminar el servicio con ID ${id}`);

            showErrorAlert('Error al eliminar el servicio', {
                title: 'Error',
                autoClose: true
            });

            throw error;
        } finally {
            setCargando(false);
        }
    }, [servicio, showSuccessAlert, showErrorAlert]);

    const actualizarEstadoServicio = useCallback(async (id, nuevoEstado) => {
        try {
            setCargando(true);
            setError(null);
            const servicioActualizado = await serviciosApi.actualizarEstadoServicio(id, nuevoEstado);

            setServicios(prev =>
                prev.map(s => s.id === id ? servicioActualizado : s)
            );

            if (servicio && servicio.id === id) {
                setServicio(servicioActualizado);
            }

            showSuccessAlert(`Estado del servicio actualizado a "${nuevoEstado}"`, {
                title: 'Éxito',
                autoClose: true
            });

            return servicioActualizado;
        } catch (error) {
            console.error(`Error al actualizar estado del servicio con ID ${id}:`, error);
            setError(`No se pudo actualizar el estado del servicio con ID ${id}`);

            showErrorAlert('Error al actualizar el estado del servicio', {
                title: 'Error',
                autoClose: true
            });

            throw error;
        } finally {
            setCargando(false);
        }
    }, [servicio, showSuccessAlert, showErrorAlert]);

    const marcarDestacado = useCallback(async (id, esDestacado) => {
        try {
            setCargando(true);
            setError(null);
            const servicioActualizado = await serviciosApi.marcarDestacado(id, esDestacado);

            setServicios(prev =>
                prev.map(s => s.id === id ? servicioActualizado : s)
            );

            if (servicio && servicio.id === id) {
                setServicio(servicioActualizado);
            }

            showSuccessAlert(`Servicio ${esDestacado ? 'marcado como destacado' : 'desmarcado como destacado'}`, {
                title: 'Éxito',
                autoClose: true
            });

            return servicioActualizado;
        } catch (error) {
            console.error(`Error al marcar servicio con ID ${id} como destacado:`, error);
            setError(`No se pudo marcar el servicio con ID ${id} como destacado`);

            showErrorAlert('Error al marcar servicio como destacado', {
                title: 'Error',
                autoClose: true
            });

            throw error;
        } finally {
            setCargando(false);
        }
    }, [servicio, showSuccessAlert, showErrorAlert]);

    const obtenerServiciosDestacados = useCallback(async () => {
        try {
            setCargando(true);
            setError(null);
            const datos = await serviciosApi.obtenerServiciosDestacados();
            return datos;
        } catch (error) {
            console.error('Error al obtener servicios destacados:', error);
            setError('No se pudieron cargar los servicios destacados');

            showErrorAlert('Error al cargar los servicios destacados', {
                title: 'Error',
                autoClose: true
            });

            return [];
        } finally {
            setCargando(false);
        }
    }, [showErrorAlert]);

    const subirImagenServicio = useCallback(async (id, archivo) => {
        try {
            setCargando(true);
            setError(null);

            const formData = new FormData();
            formData.append('imagen', archivo);

            const servicioActualizado = await serviciosApi.subirImagenServicio(id, formData);

            setServicios(prev =>
                prev.map(s => s.id === id ? servicioActualizado : s)
            );

            if (servicio && servicio.id === id) {
                setServicio(servicioActualizado);
            }

            showSuccessAlert('Imagen del servicio actualizada exitosamente', {
                title: 'Éxito',
                autoClose: true
            });

            return servicioActualizado;
        } catch (error) {
            console.error(`Error al subir imagen para servicio con ID ${id}:`, error);
            setError(`No se pudo subir la imagen para el servicio con ID ${id}`);

            showErrorAlert('Error al subir la imagen del servicio', {
                title: 'Error',
                autoClose: true
            });

            throw error;
        } finally {
            setCargando(false);
        }
    }, [servicio, showSuccessAlert, showErrorAlert]);

    return {
        servicios,
        servicio,
        cargando,
        error,
        obtenerServicios,
        obtenerServicioPorId,
        crearServicio,
        actualizarServicio,
        eliminarServicio,
        actualizarEstadoServicio,
        marcarDestacado,
        obtenerServiciosDestacados,
        subirImagenServicio
    };
};

export default usarServicios;
