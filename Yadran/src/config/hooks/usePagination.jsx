import { useState, useEffect, useMemo } from 'react';

export const usarPaginacion = (items = [], itemsPorPagina = 10) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [filtro, setFiltro] = useState('');
    const [ordenarPor, setOrdenarPor] = useState({ campo: '', direccion: 'asc' });

    const itemsFiltrados = useMemo(() => {
        if (!filtro.trim()) return items;

        return items.filter(item => {
            return Object.values(item).some(val =>
                String(val).toLowerCase().includes(filtro.toLowerCase())
            );
        });
    }, [items, filtro]);

    const itemsOrdenados = useMemo(() => {
        if (!ordenarPor.campo) return itemsFiltrados;

        return [...itemsFiltrados].sort((a, b) => {
            const valA = a[ordenarPor.campo];
            const valB = b[ordenarPor.campo];

            if (valA === undefined || valB === undefined) return 0;

            let comparacion;

            if (typeof valA === 'string' && typeof valB === 'string') {
                comparacion = valA.localeCompare(valB);
            } else {
                comparacion = valA < valB ? -1 : valA > valB ? 1 : 0;
            }

            return ordenarPor.direccion === 'asc' ? comparacion : -comparacion;
        });
    }, [itemsFiltrados, ordenarPor]);

    const paginadorInfo = useMemo(() => {
        const totalItems = itemsOrdenados.length;
        const totalPaginas = Math.ceil(totalItems / itemsPorPagina);
        const paginaActualAjustada = Math.min(Math.max(1, paginaActual), Math.max(1, totalPaginas));

        if (paginaActualAjustada !== paginaActual) {
            setPaginaActual(paginaActualAjustada);
        }

        const indiceInicio = (paginaActualAjustada - 1) * itemsPorPagina;
        const indiceFin = Math.min(indiceInicio + itemsPorPagina, totalItems);

        return {
            totalItems,
            totalPaginas,
            paginaActual: paginaActualAjustada,
            indiceInicio,
            indiceFin,
            itemsEnPaginaActual: itemsOrdenados.slice(indiceInicio, indiceFin)
        };
    }, [itemsOrdenados, paginaActual, itemsPorPagina]);

    const cambiarPagina = (numeroPagina) => {
        if (numeroPagina >= 1 && numeroPagina <= paginadorInfo.totalPaginas) {
            setPaginaActual(numeroPagina);
        }
    };

    const ordenarPorCampo = (campo) => {
        setOrdenarPor(prev => {
            if (prev.campo === campo) {
                return { campo, direccion: prev.direccion === 'asc' ? 'desc' : 'asc' };
            }
            return { campo, direccion: 'asc' };
        });
    };

    useEffect(() => {
        setPaginaActual(1);
    }, [filtro, itemsPorPagina]);

    return {
        paginadorInfo,
        cambiarPagina,
        filtro,
        setFiltro,
        ordenarPor,
        ordenarPorCampo
    };
};
