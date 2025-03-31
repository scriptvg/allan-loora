import { useState, useEffect, useMemo } from 'react';

export const usarPaginacion = (items = [], itemsPorPagina = 10) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [itemsFiltrados, setItemsFiltrados] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [ordenarPor, setOrdenarPor] = useState({ campo: '', direccion: 'asc' });
    
    // Filtrar items según el texto de búsqueda
    useEffect(() => {
        if (!filtro.trim()) {
            setItemsFiltrados(items);
            return;
        }
        
        const filtroLowerCase = filtro.toLowerCase();
        
        const filtrados = items.filter(item => {
            // Buscar en todas las propiedades del item
            return Object.keys(item).some(key => {
                const valor = item[key];
                if (typeof valor === 'string') {
                    return valor.toLowerCase().includes(filtroLowerCase);
                }
                if (typeof valor === 'number') {
                    return valor.toString().includes(filtroLowerCase);
                }
                return false;
            });
        });
        
        setItemsFiltrados(filtrados);
        setPaginaActual(1); // Resetear a primera página al filtrar
    }, [filtro, items]);
    
    // Ordenar items
    const itemsOrdenados = useMemo(() => {
        if (!ordenarPor.campo) return itemsFiltrados;
        
        return [...itemsFiltrados].sort((a, b) => {
            if (a[ordenarPor.campo] === undefined || b[ordenarPor.campo] === undefined) {
                return 0;
            }
            
            let valorA = a[ordenarPor.campo];
            let valorB = b[ordenarPor.campo];
            
            // Convertir a minúsculas si son strings
            if (typeof valorA === 'string') {
                valorA = valorA.toLowerCase();
            }
            if (typeof valorB === 'string') {
                valorB = valorB.toLowerCase();
            }
            
            if (valorA < valorB) {
                return ordenarPor.direccion === 'asc' ? -1 : 1;
            }
            if (valorA > valorB) {
                return ordenarPor.direccion === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [itemsFiltrados, ordenarPor]);
    
    // Cambiar página
    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };
    
    // Ordenar por campo
    const ordenarPorCampo = (campo) => {
        setOrdenarPor(prev => {
            if (prev.campo === campo) {
                return {
                    campo,
                    direccion: prev.direccion === 'asc' ? 'desc' : 'asc'
                };
            }
            return {
                campo,
                direccion: 'asc'
            };
        });
    };
    
    // Calcular índices y paginación
    const totalItems = itemsOrdenados.length;
    const totalPaginas = Math.ceil(totalItems / itemsPorPagina);
    
    // Asegurar que la página actual es válida
    const paginaSegura = Math.min(Math.max(1, paginaActual), Math.max(1, totalPaginas));
    
    // Calcular índices para slice
    const indiceInicio = (paginaSegura - 1) * itemsPorPagina;
    const indiceFin = Math.min(indiceInicio + itemsPorPagina - 1, totalItems - 1);
    
    // Items en la página actual
    const itemsEnPaginaActual = itemsOrdenados.slice(indiceInicio, indiceFin + 1);
    
    // Información del paginador
    const paginadorInfo = {
        paginaActual: paginaSegura,
        totalPaginas,
        itemsPorPagina,
        totalItems,
        indiceInicio,
        indiceFin,
        itemsEnPaginaActual
    };
    
    return {
        paginadorInfo,
        cambiarPagina,
        filtro,
        setFiltro,
        ordenarPor,
        ordenarPorCampo
    };
};

export default usarPaginacion;
