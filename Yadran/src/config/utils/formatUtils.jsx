/**
 * Formatea un número como precio en moneda local
 * @param {number} valor - Valor a formatear
 * @param {string} regionLocal - Configuración regional (por defecto 'es-CL')
 * @param {string} moneda - Moneda (por defecto 'CLP')
 * @returns {string} Valor formateado como precio
 */
export const formatearMoneda = (valor, regionLocal = 'es-CL', moneda = 'CLP') => {
    if (valor === null || valor === undefined) return '';

    try {
        return new Intl.NumberFormat(regionLocal, {
            style: 'currency',
            currency: moneda,
            minimumFractionDigits: 0
        }).format(valor);
    } catch (error) {
        console.error('Error al formatear moneda:', error);
        return `${valor}`;
    }
};

/**
 * Formatea una fecha a un formato específico
 * @param {Date|string} fecha - Fecha a formatear
 * @param {string} formato - Formato deseado ('long', 'short', 'numeric', personalizado)
 * @param {string} regionLocal - Configuración regional (por defecto 'es-CL')
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (fecha, formato = 'short', regionLocal = 'es-CL') => {
    if (!fecha) return '';

    try {
        const objetoFecha = typeof fecha === 'string' ? new Date(fecha) : fecha;

        if (isNaN(objetoFecha.getTime())) {
            throw new Error('Fecha inválida');
        }

        switch (formato) {
            case 'long':
                return objetoFecha.toLocaleDateString(regionLocal, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            case 'short':
                return objetoFecha.toLocaleDateString(regionLocal, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            case 'numeric':
                return objetoFecha.toLocaleDateString(regionLocal, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
            case 'time':
                return objetoFecha.toLocaleTimeString(regionLocal, {
                    hour: '2-digit',
                    minute: '2-digit'
                });
            case 'datetime':
                return `${objetoFecha.toLocaleDateString(regionLocal)} ${objetoFecha.toLocaleTimeString(regionLocal, {
                    hour: '2-digit',
                    minute: '2-digit'
                })}`;
            default:
                return objetoFecha.toLocaleDateString(regionLocal);
        }
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return String(fecha);
    }
};

/**
 * Trunca un texto a una longitud máxima y añade puntos suspensivos
 * @param {string} texto - Texto a truncar
 * @param {number} longitudMaxima - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncarTexto = (texto, longitudMaxima = 100) => {
    if (!texto) return '';

    if (texto.length <= longitudMaxima) return texto;

    return texto.substring(0, longitudMaxima).trim() + '...';
};
