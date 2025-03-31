import React from 'react';
import {
    CheckCircle,
    XCircle,
    Wrench,
    Clock,
    Calendar,
    UserX,
    CreditCard,
    BedDouble,
    Coffee
} from 'lucide-react';

export const TAMAÑO_ICONO = 18;

/**
 * Configuración de estados para diferentes entidades del sistema
 */

// Estados de habitación
export const ESTADOS_HABITACION = {
    DISPONIBLE: 'Disponible',
    OCUPADA: 'Ocupada',
    MANTENIMIENTO: 'Mantenimiento',
    RESERVADA: 'Reservada',
    LIMPIEZA: 'Limpieza',
    INACTIVA: 'Inactiva'
};

// Estados de reserva
export const ESTADOS_RESERVA = {
    PENDIENTE: 'Pendiente',
    CONFIRMADA: 'Confirmada',
    CANCELADA: 'Cancelada',
    COMPLETADA: 'Completada',
    NO_SHOW: 'No Show'
};

// Estados de usuario/cliente
export const ESTADOS_USUARIO = {
    ACTIVO: 'Activo',
    INACTIVO: 'Inactivo',
    BLOQUEADO: 'Bloqueado',
    PENDIENTE: 'Pendiente'
};

// Estados de servicio
export const ESTADOS_SERVICIO = {
    ACTIVO: 'Activo',
    INACTIVO: 'Inactivo',
    TEMPORADA: 'Temporada'
};

// Configuración para mostrar estados con colores e iconos
export const obtenerEstado = (estado, tipo = 'habitacion') => {
    // Configuración de estados para habitaciones
    if (tipo === 'habitacion') {
        switch (estado) {
            case ESTADOS_HABITACION.DISPONIBLE:
                return {
                    etiqueta: 'Disponible',
                    variante: 'success',
                    icono: '✓'
                };
            case ESTADOS_HABITACION.OCUPADA:
                return {
                    etiqueta: 'Ocupada',
                    variante: 'danger',
                    icono: '×'
                };
            case ESTADOS_HABITACION.MANTENIMIENTO:
                return {
                    etiqueta: 'Mantenimiento',
                    variante: 'warning',
                    icono: '⚠'
                };
            case ESTADOS_HABITACION.RESERVADA:
                return {
                    etiqueta: 'Reservada',
                    variante: 'info',
                    icono: '🔒'
                };
            case ESTADOS_HABITACION.LIMPIEZA:
                return {
                    etiqueta: 'Limpieza',
                    variante: 'primary',
                    icono: '🧹'
                };
            case ESTADOS_HABITACION.INACTIVA:
                return {
                    etiqueta: 'Inactiva',
                    variante: 'secondary',
                    icono: '⚫'
                };
            default:
                return {
                    etiqueta: estado || 'Desconocido',
                    variante: 'secondary',
                    icono: null
                };
        }
    }

    // Configuración de estados para reservas
    if (tipo === 'reserva') {
        switch (estado) {
            case ESTADOS_RESERVA.PENDIENTE:
                return {
                    etiqueta: 'Pendiente',
                    variante: 'warning',
                    icono: '⌛'
                };
            case ESTADOS_RESERVA.CONFIRMADA:
                return {
                    etiqueta: 'Confirmada',
                    variante: 'success',
                    icono: '✓'
                };
            case ESTADOS_RESERVA.CANCELADA:
                return {
                    etiqueta: 'Cancelada',
                    variante: 'danger',
                    icono: '×'
                };
            case ESTADOS_RESERVA.COMPLETADA:
                return {
                    etiqueta: 'Completada',
                    variante: 'info',
                    icono: '✓✓'
                };
            case ESTADOS_RESERVA.NO_SHOW:
                return {
                    etiqueta: 'No Show',
                    variante: 'dark',
                    icono: '!'
                };
            default:
                return {
                    etiqueta: estado || 'Desconocido',
                    variante: 'secondary',
                    icono: null
                };
        }
    }

    // Configuración para otros tipos
    return {
        etiqueta: estado || 'Desconocido',
        variante: 'secondary',
        icono: null
    };
};