import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Form, InputGroup, Badge, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Search, Plus, ThreeDots, Funnel, FunnelFill, ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import { habitacionesApi } from '../../../config/api/habitacionesApi';
import { formatearMoneda } from '../../../config/utils/formatUtils';
import { obtenerEstado, ESTADOS_HABITACION } from '../../../config/utils/estadosConfig';
import { usarPaginacion } from '../../../config/hooks/usePaginacion';
import { useAlertMixin } from '../../../config/mixins/AlertMixin';

const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [filtrosAvanzados, setFiltrosAvanzados] = useState(false);
    const [filtros, setFiltros] = useState({
        tipo: '',
        estado: '',
        capacidad: ''
    });
    
    const { showSuccessAlert, showErrorAlert, AlertComponent } = useAlertMixin();
    
    const {
        paginadorInfo,
        cambiarPagina,
        filtro: busqueda,
        setFiltro: setBusqueda,
        ordenarPor,
        ordenarPorCampo
    } = usarPaginacion(habitaciones, 10);
    
    useEffect(() => {
        const cargarHabitaciones = async () => {
            try {
                setCargando(true);
                // En implementación real, usaríamos esto:
                // const datos = await habitacionesApi.obtenerHabitaciones();
                
                // Para desarrollo, simulamos datos de ejemplo
                const datosEjemplo = [
                    {
                        id: '1',
                        nombre: 'Suite Ejecutiva',
                        tipo: 'suite',
                        capacidad: 2,
                        precio: 150000,
                        estado: ESTADOS_HABITACION.DISPONIBLE,
                        numero: '101',
                        imgsHabitacion: {
                            img: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070']
                        }
                    },
                    {
                        id: '2',
                        nombre: 'Habitación Doble Deluxe',
                        tipo: 'doble',
                        capacidad: 2,
                        precio: 95000,
                        estado: ESTADOS_HABITACION.OCUPADA,
                        numero: '102',
                        imgsHabitacion: {
                            img: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070']
                        }
                    },
                    {
                        id: '3',
                        nombre: 'Habitación Individual Estándar',
                        tipo: 'individual',
                        capacidad: 1,
                        precio: 65000,
                        estado: ESTADOS_HABITACION.DISPONIBLE,
                        numero: '103',
                        imgsHabitacion: {
                            img: ['https://images.unsplash.com/photo-1631049552240-59c37f38802b?q=80&w=2070']
                        }
                    },
                    {
                        id: '4',
                        nombre: 'Suite Familiar',
                        tipo: 'familiar',
                        capacidad: 4,
                        precio: 180000,
                        estado: ESTADOS_HABITACION.MANTENIMIENTO,
                        numero: '104',
                        imgsHabitacion: {
                            img: ['https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=2070']
                        }
                    },
                    {
                        id: '5',
                        nombre: 'Habitación con Vista al Mar',
                        tipo: 'doble',
                        capacidad: 2,
                        precio: 110000,
                        estado: ESTADOS_HABITACION.DISPONIBLE,
                        numero: '105',
                        imgsHabitacion: {
                            img: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070']
                        }
                    }
                ];
                
                setHabitaciones(datosEjemplo);
            } catch (error) {
                console.error('Error al cargar habitaciones:', error);
                showErrorAlert('No se pudieron cargar las habitaciones. Por favor intente nuevamente.', {
                    title: 'Error',
                    autoClose: true
                });
            } finally {
                setCargando(false);
            }
        };
        
        cargarHabitaciones();
    }, []);
    
    const cambiarEstadoHabitacion = async (id, nuevoEstado) => {
        try {
            // En implementación real:
            // await habitacionesApi.actualizarEstadoHabitacion(id, nuevoEstado);
            
            // Para desarrollo:
            // Actualizar el estado local
            setHabitaciones(prev => 
                prev.map(hab => 
                    hab.id === id ? { ...hab, estado: nuevoEstado } : hab
                )
            );
            
            showSuccessAlert(`Estado de la habitación actualizado a "${nuevoEstado}"`, {
                title: 'Actualización exitosa',
                autoClose: true
            });
        } catch (error) {
            console.error('Error al cambiar estado de habitación:', error);
            showErrorAlert('Error al actualizar el estado de la habitación', {
                title: 'Error',
                autoClose: true
            });
        }
    };
    
    const eliminarHabitacion = async (id) => {
        if (!window.confirm('¿Está seguro que desea eliminar esta habitación? Esta acción no se puede deshacer.')) {
            return;
        }
        
        try {
            // En implementación real:
            // await habitacionesApi.eliminarHabitacion(id);
            
            // Para desarrollo:
            // Actualizar el estado local
            setHabitaciones(prev => prev.filter(hab => hab.id !== id));
            
            showSuccessAlert('Habitación eliminada correctamente', {
                title: 'Eliminación exitosa',
                autoClose: true
            });
        } catch (error) {
            console.error('Error al eliminar habitación:', error);
            showErrorAlert('Error al eliminar la habitación', {
                title: 'Error',
                autoClose: true
            });
        }
    };
    
    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
    };
    
    const aplicarFiltros = (item) => {
        // Si no hay filtros activos, mostrar todos
        if (!filtros.tipo && !filtros.estado && !filtros.capacidad) {
            return true;
        }
        
        // Aplicar filtros
        if (filtros.tipo && item.tipo !== filtros.tipo) {
            return false;
        }
        
        if (filtros.estado && item.estado !== filtros.estado) {
            return false;
        }
        
        if (filtros.capacidad && item.capacidad !== parseInt(filtros.capacidad)) {
            return false;
        }
        
        return true;
    };
    
    // Datos filtrados para la paginación
    const datosFiltrados = paginadorInfo.itemsEnPaginaActual.filter(aplicarFiltros);
    
    const limpiarFiltros = () => {
        setFiltros({
            tipo: '',
            estado: '',
            capacidad: ''
        });
        setBusqueda('');
    };
    
    const tiposHabitacion = [
        { valor: 'individual', etiqueta: 'Individual' },
        { valor: 'doble', etiqueta: 'Doble' },
        { valor: 'suite', etiqueta: 'Suite' },
        { valor: 'familiar', etiqueta: 'Familiar' }
    ];
    
    const estadosHabitacion = Object.values(ESTADOS_HABITACION);
    
    const capacidades = [1, 2, 3, 4, 5, 6];
    
    return (
        <div className="admin-habitaciones-page">
            <div className="page-header d-flex flex-wrap justify-content-between align-items-center mb-4">
                <div className="mb-3 mb-sm-0">
                    <h1 className="mb-1">Gestión de Habitaciones</h1>
                    <p className="text-muted mb-0">Administrar las habitaciones del hotel</p>
                </div>
                
                <Button 
                    as={Link} 
                    to="/admin/habitaciones/crear" 
                    variant="primary"
                >
                    <Plus className="me-2" />
                    Nueva Habitación
                </Button>
            </div>
            
            <AlertComponent />
            
            <Card className="border-0 shadow-sm">
                <Card.Body>
                    <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
                        <div className="d-flex mb-3 mb-md-0">
                            <InputGroup className="search-input me-2" style={{ width: '300px' }}>
                                <Form.Control
                                    placeholder="Buscar habitaciones..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                />
                                <InputGroup.Text>
                                    <Search />
                                </InputGroup.Text>
                            </InputGroup>
                            
                            <Button 
                                variant={filtrosAvanzados ? "primary" : "outline-secondary"}
                                onClick={() => setFiltrosAvanzados(!filtrosAvanzados)}
                                className="d-flex align-items-center"
                            >
                                {filtrosAvanzados ? <FunnelFill className="me-2" /> : <Funnel className="me-2" />}
                                Filtros
                            </Button>
                        </div>
                        
                        {(busqueda || filtros.tipo || filtros.estado || filtros.capacidad) && (
                            <Button 
                                variant="outline-danger" 
                                onClick={limpiarFiltros}
                                className="align-self-start align-self-md-center"
                            >
                                Limpiar Filtros
                            </Button>
                        )}
                    </div>
                    
                    {filtrosAvanzados && (
                        <div className="filtros-avanzados mb-4 p-3 bg-light rounded">
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Tipo de Habitación</Form.Label>
                                        <Form.Select 
                                            name="tipo" 
                                            value={filtros.tipo} 
                                            onChange={handleFiltroChange}
                                        >
                                            <option value="">Todos los tipos</option>
                                            {tiposHabitacion.map(tipo => (
                                                <option key={tipo.valor} value={tipo.valor}>
                                                    {tipo.etiqueta}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Select 
                                            name="estado" 
                                            value={filtros.estado} 
                                            onChange={handleFiltroChange}
                                        >
                                            <option value="">Todos los estados</option>
                                            {estadosHabitacion.map(estado => (
                                                <option key={estado} value={estado}>
                                                    {estado}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Capacidad</Form.Label>
                                        <Form.Select 
                                            name="capacidad" 
                                            value={filtros.capacidad} 
                                            onChange={handleFiltroChange}
                                        >
                                            <option value="">Cualquier capacidad</option>
                                            {capacidades.map(cap => (
                                                <option key={cap} value={cap}>
                                                    {cap} {cap === 1 ? 'persona' : 'personas'}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {cargando ? (
                        <div className="text-center p-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-2 text-muted">Cargando habitaciones...</p>
                        </div>
                    ) : (
                        <>
                            {datosFiltrados.length === 0 ? (
                                <div className="text-center p-5">
                                    <div className="mb-3">
                                        <i className="bi bi-search display-6 text-muted"></i>
                                    </div>
                                    <h4>No se encontraron habitaciones</h4>
                                    <p className="text-muted">No hay habitaciones que coincidan con los criterios de búsqueda</p>
                                    {(busqueda || filtros.tipo || filtros.estado || filtros.capacidad) && (
                                        <Button 
                                            variant="primary" 
                                            onClick={limpiarFiltros}
                                        >
                                            Limpiar Filtros
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="table-responsive">
                                        <Table hover className="align-middle">
                                            <thead>
                                                <tr>
                                                    <th onClick={() => ordenarPorCampo('numero')} className="sortable-header">
                                                        <div className="d-flex align-items-center">
                                                            N° Habitación
                                                            {ordenarPor.campo === 'numero' && (
                                                                ordenarPor.direccion === 'asc' 
                                                                    ? <ArrowUp size={12} className="ms-1" /> 
                                                                    : <ArrowDown size={12} className="ms-1" />
                                                            )}
                                                        </div>
                                                    </th>
                                                    <th onClick={() => ordenarPorCampo('nombre')} className="sortable-header">
                                                        <div className="d-flex align-items-center">
                                                            Nombre
                                                            {ordenarPor.campo === 'nombre' && (
                                                                ordenarPor.direccion === 'asc' 
                                                                    ? <ArrowUp size={12} className="ms-1" /> 
                                                                    : <ArrowDown size={12} className="ms-1" />
                                                            )}
                                                        </div>
                                                    </th>
                                                    <th>Tipo</th>
                                                    <th>Estado</th>
                                                    <th onClick={() => ordenarPorCampo('capacidad')} className="sortable-header">
                                                        <div className="d-flex align-items-center">
                                                            Capacidad
                                                            {ordenarPor.campo === 'capacidad' && (
                                                                ordenarPor.direccion === 'asc' 
                                                                    ? <ArrowUp size={12} className="ms-1" /> 
                                                                    : <ArrowDown size={12} className="ms-1" />
                                                            )}
                                                        </div>
                                                    </th>
                                                    <th onClick={() => ordenarPorCampo('precio')} className="sortable-header">
                                                        <div className="d-flex align-items-center">
                                                            Precio/Noche
                                                            {ordenarPor.campo === 'precio' && (
                                                                ordenarPor.direccion === 'asc' 
                                                                    ? <ArrowUp size={12} className="ms-1" /> 
                                                                    : <ArrowDown size={12} className="ms-1" />
                                                            )}
                                                        </div>
                                                    </th>
                                                    <th className="text-end">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {datosFiltrados.map((habitacion) => (
                                                    <tr key={habitacion.id}>
                                                        <td>{habitacion.numero}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div 
                                                                    className="habitacion-thumb me-2"
                                                                    style={{ 
                                                                        width: "40px", 
                                                                        height: "40px", 
                                                                        backgroundImage: `url(${getImagenPrincipal(habitacion)})`,
                                                                        backgroundSize: 'cover',
                                                                        backgroundPosition: 'center',
                                                                        borderRadius: '4px'
                                                                    }}
                                                                ></div>
                                                                <div>
                                                                    <Link 
                                                                        to={`/admin/habitaciones/editar/${habitacion.id}`}
                                                                        className="fw-medium text-decoration-none"
                                                                    >
                                                                        {habitacion.nombre || `Habitación ${habitacion.numero}`}
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {getTipoHabitacion(habitacion.tipo)}
                                                        </td>
                                                        <td>
                                                            <Badge 
                                                                bg={getEstadoBadgeClass(habitacion.estado)}
                                                                className="badge-estado"
                                                            >
                                                                {habitacion.estado}
                                                            </Badge>
                                                        </td>
                                                        <td>{habitacion.capacidad} personas</td>
                                                        <td>
                                                            {formatearMoneda(habitacion.precio)}
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="d-flex justify-content-end">
                                                                <Button 
                                                                    as={Link}
                                                                    to={`/admin/habitaciones/editar/${habitacion.id}`}
                                                                    variant="outline-primary" 
                                                                    size="sm"
                                                                    className="me-2"
                                                                >
                                                                    Editar
                                                                </Button>
                                                                
                                                                <Dropdown>
                                                                    <Dropdown.Toggle 
                                                                        variant="light" 
                                                                        size="sm"
                                                                        id={`dropdown-habitacion-${habitacion.id}`}
                                                                    >
                                                                        <ThreeDots />
                                                                    </Dropdown.Toggle>
                                                                    
                                                                    <Dropdown.Menu align="end">
                                                                        <Dropdown.Header>Cambiar Estado</Dropdown.Header>
                                                                        {estadosHabitacion.map(estado => (
                                                                            <Dropdown.Item 
                                                                                key={estado}
                                                                                onClick={() => cambiarEstadoHabitacion(habitacion.id, estado)}
                                                                                active={habitacion.estado === estado}
                                                                            >
                                                                                {estado}
                                                                            </Dropdown.Item>
                                                                        ))}
                                                                        <Dropdown.Divider />
                                                                        <Dropdown.Item 
                                                                            onClick={() => eliminarHabitacion(habitacion.id)}
                                                                            className="text-danger"
                                                                        >
                                                                            Eliminar
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    
                                    {/* Paginador */}
                                    {paginadorInfo.totalPaginas > 1 && (
                                        <div className="d-flex justify-content-between align-items-center mt-4">
                                            <div>
                                                <small className="text-muted">
                                                    Mostrando {paginadorInfo.indiceInicio + 1} a {paginadorInfo.indiceFin} de {paginadorInfo.totalItems} resultados
                                                </small>
                                            </div>
                                            <ul className="pagination mb-0">
                                                <li className={`page-item ${paginadorInfo.paginaActual === 1 ? 'disabled' : ''}`}>
                                                    <button 
                                                        className="page-link" 
                                                        onClick={() => cambiarPagina(paginadorInfo.paginaActual - 1)}
                                                    >
                                                        Anterior
                                                    </button>
                                                </li>
                                                
                                                {[...Array(paginadorInfo.totalPaginas)].map((_, index) => (
                                                    <li 
                                                        key={index + 1} 
                                                        className={`page-item ${paginadorInfo.paginaActual === index + 1 ? 'active' : ''}`}
                                                    >
                                                        <button 
                                                            className="page-link" 
                                                            onClick={() => cambiarPagina(index + 1)}
                                                        >
                                                            {index + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                                
                                                <li className={`page-item ${paginadorInfo.paginaActual === paginadorInfo.totalPaginas ? 'disabled' : ''}`}>
                                                    <button 
                                                        className="page-link" 
                                                        onClick={() => cambiarPagina(paginadorInfo.paginaActual + 1)}
                                                    >
                                                        Siguiente
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

// Función auxiliar para obtener la imagen principal de una habitación
const getImagenPrincipal = (habitacion) => {
    if (habitacion.imgsHabitacion?.img && habitacion.imgsHabitacion.img.length > 0) {
        return habitacion.imgsHabitacion.img[0];
    } else if (habitacion.imgsHabitacion?.imgHabitacion && habitacion.imgsHabitacion.imgHabitacion.length > 0) {
        return habitacion.imgsHabitacion.imgHabitacion[0];
    } else {
        return "https://placehold.co/600x400/1e4d6b/fff?text=Habitación";
    }
};

// Función auxiliar para obtener el nombre del tipo de habitación
const getTipoHabitacion = (tipo) => {
    const TIPOS = {
        'individual': 'Individual',
        'doble': 'Doble',
        'suite': 'Suite',
        'familiar': 'Familiar'
    };
    return TIPOS[tipo] || tipo;
};

// Función auxiliar para obtener la clase de la insignia de estado
const getEstadoBadgeClass = (estado) => {
    switch (estado) {
        case ESTADOS_HABITACION.DISPONIBLE:
            return 'success';
        case ESTADOS_HABITACION.OCUPADA:
            return 'danger';
        case ESTADOS_HABITACION.MANTENIMIENTO:
            return 'warning';
        case ESTADOS_HABITACION.RESERVADA:
            return 'primary';
        case ESTADOS_HABITACION.LIMPIEZA:
            return 'info';
        default:
            return 'secondary';
    }
};

export default Habitaciones;
