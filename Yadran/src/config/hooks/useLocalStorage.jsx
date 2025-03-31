import { useState, useEffect } from 'react';

/**
 * Hook para manejar localStorage con React
 * @param {string} clave - Clave para guardar en localStorage
 * @param {any} valorInicial - Valor inicial
 * @returns {Array} [valorAlmacenado, setValorAlmacenado] - Estado almacenado y función para actualizarlo
 */
export function useLocalStorage(clave, valorInicial) {
    // Estado para almacenar nuestro valor
    const [valorAlmacenado, setValorAlmacenado] = useState(() => {
        try {
            // Obtener de localStorage por clave
            const item = window.localStorage.getItem(clave);
            // Parsear JSON almacenado o usar valorInicial
            return item ? JSON.parse(item) : valorInicial;
        } catch (error) {
            console.error(`Error al obtener ${clave} de localStorage:`, error);
            return valorInicial;
        }
    });

    // Efecto para sincronizar con localStorage cuando cambia la clave o el valor
    useEffect(() => {
        try {
            // Guardar en localStorage
            window.localStorage.setItem(clave, JSON.stringify(valorAlmacenado));
        } catch (error) {
            console.error(`Error al guardar ${clave} en localStorage:`, error);
        }
    }, [clave, valorAlmacenado]);

    return [valorAlmacenado, setValorAlmacenado];
}
