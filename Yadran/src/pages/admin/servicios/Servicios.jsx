import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Form, InputGroup, Badge, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Search, Plus, ThreeDots, Funnel, FunnelFill, ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import { serviciosApi } from '../../../config/api/serviciosApi';
import { ESTADOS_SERVICIO } from '../../../config/utils/estadosConfig';
import { usarPaginacion } from '../../../config/hooks/usePaginacion';
import { useAlertMixin } from '../../../config/mixins/AlertMixin';

const Servicios = () => {
    const [servicios, setServicios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [filtrosAvanzados, setFiltrosAvanzados] = useState(false);
    const [filtros, setFiltros] = useState({
        categoria: '',
        estado: '',
        destacado: ''
    });

    const { showSuccessAlert, showErrorAlert, AlertComponent } = useAlertMixin();

    const {
        paginadorInfo,
        cambiarPagina,
        filtro: busqueda,
        setFiltro: setBusqueda,
        ordenarPor,
        ordenarPorCampo
    } = usarPaginacion(servicios, 10);

    useEffect(() => {
        const cargarServicios = async () => {
            try {
                setCargando(true);
                // Datos de ejemplo para desarrollo
                const datosEjemplo = [
                    {
                        id: '1',
                        title: 'Restaurante Gourmet',
                        description: 'Disfrute de una experiencia culinaria excepcional con nuestra cocina internacional y platos locales preparados por nuestros chefs de renombre.',
                        icon: 'cup-hot-fill',
                        imgSrc: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070',
                        horario: '7:00 AM - 11:00 PM',
                        destacado: true,
                        variante: 'warning',
                        estado: ESTADOS_SERVICIO.ACTIVO,
                        caracteristicas: [
                            'Cocina internacional',
                            'Chef especializado',
                            'Vistas panorámicas',
                            'Reserva anticipada'
                        ]
                    },
                    {
                        id: '2',
                        title: 'Spa & Bienestar',
                        description: 'Rejuvenezca cuerpo y mente en nuestro spa de lujo con tratamientos exclusivos, masajes terapéuticos y rituales de relajación.',
                        icon: 'water',
                        imgSrc: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070',
                        horario: '9:00 AM - 8:00 PM',
                        destacado: true,
                        variante: 'success',
                        estado: ESTADOS_SERVICIO.ACTIVO,
                        caracteristicas: [
                            'Masajes terapéuticos',
                            'Tratamientos faciales',
                            'Sauna y baño turco',
                            'Sesiones de yoga'
                        ]
                    },
                    {
                        id: '3',
                        title: 'Gimnasio Equipado',
                        description: 'Mantenga su rutina de ejercicios en nuestro moderno gimnasio con equipos de última generación y entrenadores personales disponibles.',
                        icon: 'bicycle',
                        imgSrc: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070',
                        horario: '6:00 AM - 10:00 PM',
                        destacado: false,
                        variante: 'success',
                        estado: ESTADOS_SERVICIO.ACTIVO,
                        caracteristicas: [
                            'Máquinas cardiovasculares',
                            'Área de pesas libres',
                            'Clases grupales',
                            'Entrenadores personales'
                        ]
                    },
                    {
                        id: '4',
                        title: 'Piscina Climatizada',
                        description: 'Relájese en nuestra piscina climatizada con vistas panorámicas, tumbonas premium y servicio de bar junto a la piscina.',
                        icon: 'water',
                        imgSrc: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070',
                        horario: '7:00 AM - 9:00 PM',
                        destacado: true,
                        variante: 'info',
                        estado: ESTADOS_SERVICIO.ACTIVO,
                        caracteristicas: [
                            'Temperatura controlada',
                            'Áreas para niños',
                            'Tumbonas exclusivas',
                            'Servicio de bebidas'
                        ]
                    },
                    {
                        id: '5',
                        title: 'Servicio de Transporte',
                        description: 'Ofrecemos transporte privado desde y hacia el aeropuerto, así como servicios de traslado a los principales puntos de interés.',
                        icon: 'car-front-fill',
                        imgSrc: 'https://images.unsplash.com/photo-1560861245-e9ea9bc9a59c?q=80&w=2070',
                        horario: 'Bajo petición',
                        destacado: false,
                        variante: 'dark',
                        estado: ESTADOS_SERVICIO.TEMPORADA,
                        caracteristicas: [
                            'Traslados aeropuerto-hotel',
                            'Excursiones guiadas',
                            'Vehículos premium',
                            'Choferes profesionales'
                        ]
                    }
                ];

                setServicios(datosEjemplo);
            } catch (error) {
                console.error('Error al cargar servicios:', error);
                showErrorAlert('Error al cargar los servicios', {
                    title: 'Error',
                    autoClose: true
                });
            } finally {
                setCargando(false);
            }
        };

        cargarServicios();
    }, []);

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
    };

    const aplicarFiltros = (item) => {
        // Si no hay filtros activos, mostrar todos
        if (!filtros.categoria && !filtros.estado && !filtros.destacado) {
            return true;
        }

        // Aplicar filtros
        if (filtros.categoria && item.variante !== filtros.categoria) {
            return false;
        }

        if (filtros.estado && item.estado !== filtros.estado) {
            return false;
        }

        if (filtros.destacado) {
            if (filtros.destacado === 'true' && !item.destacado) {
                return false;
            }
            if (filtros.destacado === 'false' && item.destacado) {
                return false;
            }
        }

        return true;
    };

    // Datos filtrados
    const datosFiltrados = paginadorInfo.itemsEnPaginaActual.filter(aplicarFiltros);

    const limpiarFiltros = () => {
        setFiltros({
            categoria: '',
            estado: '',
            destacado: ''
        });
        setBusqueda('');
    };

    const categoriasServicio = [
        { valor: 'primary', etiqueta: 'Principal' },
        { valor: 'success', etiqueta: 'Bienestar' },
        { valor: 'info', etiqueta: 'Recreativo' },
        { valor: 'warning', etiqueta: 'Gastronómico' },
        { valor: 'danger', etiqueta: 'Premium' },
        { valor: 'dark', etiqueta: 'Exclusivo' }
    ];

    const estadosServicio = Object.values(ESTADOS_SERVICIO);

    const eliminarServicio = async (id) => {
        if (window.confirm('¿Está seguro que desea eliminar este servicio? Esta acción no se puede deshacer.')) {
            try {
                // En implementación real: await serviciosApi.eliminarServicio(id);
                setServicios(prev => prev.filter(serv => serv.id !== id));
                showSuccessAlert('Servicio eliminado correctamente', {
                    title: 'Éxito',
                    autoClose: true
                });
            } catch (error) {
                console.error('Error al eliminar servicio:', error);
                showErrorAlert('Error al eliminar el servicio', {
                    title: 'Error',
                    autoClose: true
                });
            }
        }
    };

    const cambiarEstadoServicio = async (id, nuevoEstado) => {
        try {
            // En implementación real: await serviciosApi.actualizarEstadoServicio(id, nuevoEstado);
            setServicios(prev =>
                prev.map(serv =>
                    serv.id === id ? { ...serv, estado: nuevoEstado } : serv
                )
            );

            showSuccessAlert(`Estado del servicio actualizado a "${nuevoEstado}"`, {
                title: 'Actualización exitosa',
                autoClose: true
            });
        } catch (error) {
            console.error('Error al cambiar estado del servicio:', error);
            showErrorAlert('Error al actualizar el estado del servicio', {
                title: 'Error',
                autoClose: true
            });
        }
    };

    return (
        <div className="admin-servicios-page">
            <div className="page-header d-flex flex-wrap justify-content-between align-items-center mb-4">
                <div className="mb-3 mb-sm-0">
                    <h1 className="mb-1">Gestión de Servicios</h1>
                    <p className="text-muted mb-0">Administrar los servicios del hotel</p>
                </div>

                <Button
                    as={Link}
                    to="/admin/servicios/crear"
                    variant="primary"
                >
                    <Plus className="me-2" />
                    Nuevo Servicio
                </Button>
            </div>

            <AlertComponent />

            <Card className="border-0 shadow-sm">
                <Card.Body>
                    <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
                        <div className="d-flex mb-3 mb-md-0">
                            <InputGroup className="search-input me-2" style={{ width: '300px' }}>
                                <Form.Control
                                    placeholder="Buscar servicios..."
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

                        {(busqueda || filtros.categoria || filtros.estado || filtros.destacado) && (
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
                                        <Form.Label>Categoría</Form.Label>
                                        <Form.Select
                                            name="categoria"
                                            value={filtros.categoria}
                                            onChange={handleFiltroChange}
                                        >
                                            <option value="">Todas las categorías</option>
                                            {categoriasServicio.map(cat => (
                                                <option key={cat.valor} value={cat.valor}>
                                                    {cat.etiqueta}
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
                                            {estadosServicio.map(estado => (
                                                <option key={estado} value={estado}>
                                                    {estado}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Destacado</Form.Label>
                                        <Form.Select
                                            name="destacado"
                                            value={filtros.destacado}
                                            onChange={handleFiltroChange}
                                        >
                                            <option value="">Todos</option>
                                            <option value="true">Destacados</option>
                                            <option value="false">No destacados</option>
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
                            <p className="mt-2 text-muted">Cargando servicios...</p>
                        </div>
                    ) : (
                        <>
                            {datosFiltrados.length === 0 ? (
                                <div className="text-center p-5">
                                    <div className="mb-3">
                                        <i className="bi bi-search display-6 text-muted"></i>
                                    </div>
                                    <h4>No se encontraron servicios</h4>
                                    <p className="text-muted">No hay servicios que coincidan con los criterios de búsqueda</p>
                                    {(busqueda || filtros.categoria || filtros.estado || filtros.destacado) && (
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
                                                    <th onClick={() => ordenarPorCampo('title')} className="sortable-header">
                                                        <div className="d-flex align-items-center">
                                                            Nombre
                                                            {ordenarPor.campo === 'title' && (
                                                                ordenarPor.direccion === 'asc'
                                                                    ? <ArrowUp size={12} className="ms-1" />
                                                                    : <ArrowDown size={12} className="ms-1" />
                                                            )}
                                                        </div>
                                                    </th>
                                                    <th>Categoría</th>
                                                    <th>Estado</th>
                                                    <th>Destacado</th>
                                                    <th>Horario</th>
                                                    <th className="text-end">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {datosFiltrados.map((servicio) => (
                                                    <tr key={servicio.id}>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div
                                                                    className="servicio-thumb me-3"
                                                                    style={{
                                                                        width: "40px",
                                                                        height: "40px",
                                                                        backgroundImage: `url(${servicio.imgSrc})`,
                                                                        backgroundSize: 'cover',
                                                                        backgroundPosition: 'center',
                                                                        borderRadius: '4px'
                                                                    }}
                                                                ></div>
                                                                <div>
                                                                    <Link
                                                                        to={`/admin/servicios/editar/${servicio.id}`}
                                                                        className="fw-medium text-decoration-none"
                                                                    >
                                                                        {servicio.title}
                                                                    </Link>
                                                                    <div className="small text-muted text-truncate" style={{ maxWidth: '250px' }}>
                                                                        {servicio.description.substring(0, 60)}...
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Badge
                                                                bg={servicio.variante}
                                                                className="text-white"
                                                            >
                                                                {getCategoriaLabel(servicio.variante, categoriasServicio)}
                                                            </Badge>
                                                        </td>
                                                        <td>
                                                            <Badge
                                                                bg={getEstadoBadgeClass(servicio.estado)}
                                                                className="badge-estado"
                                                            >
                                                                {servicio.estado}
                                                            </Badge>
                                                        </td>
                                                        <td>
                                                            {servicio.destacado ? (
                                                                <Badge bg="success">Destacado</Badge>
                                                            ) : (
                                                                <Badge bg="secondary">No</Badge>
                                                            )}
                                                        </td>
                                                        <td>{servicio.horario}</td>
                                                        <td className="text-end">
                                                            <div className="d-flex justify-content-end">
                                                                <Button
                                                                    as={Link}
                                                                    to={`/admin/servicios/editar/${servicio.id}`}
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
                                                                        id={`dropdown-servicio-${servicio.id}`}
                                                                    >
                                                                        <ThreeDots />
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu align="end">
                                                                        <Dropdown.Header>Cambiar Estado</Dropdown.Header>
                                                                        {estadosServicio.map(estado => (
                                                                            <Dropdown.Item
                                                                                key={estado}
                                                                                onClick={() => cambiarEstadoServicio(servicio.id, estado)}
                                                                                active={servicio.estado === estado}
                                                                            >
                                                                                {estado}
                                                                            </Dropdown.Item>
                                                                        ))}
                                                                        <Dropdown.Divider />
                                                                        <Dropdown.Item
                                                                            onClick={() => eliminarServicio(servicio.id)}
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
                                                    Mostrando {paginadorInfo.indiceInicio + 1} a {paginadorInfo.indiceFin + 1} de {paginadorInfo.totalItems} resultados
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

// Función auxiliar para obtener la etiqueta de categoría
const getCategoriaLabel = (variante, categorias) => {
    const categoria = categorias.find(cat => cat.valor === variante);
    return categoria ? categoria.etiqueta : variante;
};

// Función auxiliar para obtener la clase del badge de estado
const getEstadoBadgeClass = (estado) => {
    switch (estado) {
        case ESTADOS_SERVICIO.ACTIVO:
            return 'success';
        case ESTADOS_SERVICIO.INACTIVO:
            return 'danger';
        case ESTADOS_SERVICIO.TEMPORADA:
            return 'warning';
        default:
            return 'secondary';
    }
};

export default Servicios;
