import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { serviciosApi } from '../../../config/api/serviciosApi';
import { ESTADOS_SERVICIO } from '../../../config/utils/estadosConfig';
import { useAlertMixin } from '../../../config/mixins/AlertMixin';
import ImageUploader from '../../../components/common/ImageUploader';

const ServicioForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSuccessAlert, showErrorAlert, AlertComponent } = useAlertMixin();
    const isEditando = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'star-fill',
        horario: '',
        variante: 'primary',
        estado: ESTADOS_SERVICIO.ACTIVO,
        destacado: false,
        caracteristicas: ['']
    });

    const [imagen, setImagen] = useState('');
    const [cargando, setCargando] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState(null);
    const [validado, setValidado] = useState(false);

    useEffect(() => {
        if (isEditando) {
            const cargarServicio = async () => {
                try {
                    setCargando(true);
                    // En una implementación real:
                    // const servicio = await serviciosApi.obtenerServicioPorId(id);

                    // Para desarrollo, simulamos datos
                    const servicio = {
                        id: id,
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
                    };

                    setFormData({
                        title: servicio.title || '',
                        description: servicio.description || '',
                        icon: servicio.icon || 'star-fill',
                        horario: servicio.horario || '',
                        variante: servicio.variante || 'primary',
                        estado: servicio.estado || ESTADOS_SERVICIO.ACTIVO,
                        destacado: servicio.destacado || false,
                        caracteristicas: servicio.caracteristicas || ['']
                    });

                    // Cargar imagen si existe
                    if (servicio.imgSrc) {
                        setImagen(servicio.imgSrc);
                    }
                } catch (error) {
                    console.error('Error al cargar servicio:', error);
                    setError('No se pudo cargar la información del servicio');
                    showErrorAlert('Error al cargar los datos del servicio', {
                        title: 'Error',
                        autoClose: true
                    });
                } finally {
                    setCargando(false);
                }
            };

            cargarServicio();
        }
    }, [id, isEditando, showErrorAlert]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCaracteristicaChange = (index, valor) => {
        const nuevasCaracteristicas = [...formData.caracteristicas];
        nuevasCaracteristicas[index] = valor;
        setFormData({
            ...formData,
            caracteristicas: nuevasCaracteristicas
        });
    };

    const agregarCaracteristica = () => {
        setFormData({
            ...formData,
            caracteristicas: [...formData.caracteristicas, '']
        });
    };

    const eliminarCaracteristica = (index) => {
        const nuevasCaracteristicas = [...formData.caracteristicas];
        nuevasCaracteristicas.splice(index, 1);
        setFormData({
            ...formData,
            caracteristicas: nuevasCaracteristicas
        });
    };

    const handleImagenChange = (nuevasImagenes) => {
        if (nuevasImagenes.length > 0) {
            setImagen(nuevasImagenes[0]);
        } else {
            setImagen('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidado(true);
            return;
        }

        try {
            setGuardando(true);
            setError(null);

            // Filtrar características vacías
            const caracteristicasFiltradas = formData.caracteristicas.filter(c => c.trim() !== '');

            const datosGuardar = {
                ...formData,
                caracteristicas: caracteristicasFiltradas,
                imgSrc: imagen
            };

            if (isEditando) {
                // En implementación real: 
                // await serviciosApi.actualizarServicio(id, datosGuardar);
                showSuccessAlert('Servicio actualizado correctamente', {
                    title: 'Éxito',
                    autoClose: true
                });
            } else {
                // En implementación real: 
                // await serviciosApi.crearServicio(datosGuardar);
                showSuccessAlert('Servicio creado correctamente', {
                    title: 'Éxito',
                    autoClose: true
                });
            }

            // Simulamos una demora de guardado
            setTimeout(() => {
                navigate('/admin/servicios');
            }, 1000);
        } catch (error) {
            console.error('Error al guardar servicio:', error);
            setError('Ocurrió un error al guardar el servicio');
            showErrorAlert('Error al guardar el servicio', {
                title: 'Error',
                autoClose: true
            });
            setGuardando(false);
        }
    };

    if (cargando) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3 text-muted">Cargando datos del servicio...</p>
            </div>
        );
    }

    const categoriasServicio = [
        { valor: 'primary', etiqueta: 'Principal' },
        { valor: 'success', etiqueta: 'Bienestar' },
        { valor: 'info', etiqueta: 'Recreativo' },
        { valor: 'warning', etiqueta: 'Gastronómico' },
        { valor: 'danger', etiqueta: 'Premium' },
        { valor: 'dark', etiqueta: 'Exclusivo' }
    ];

    const iconosDisponibles = [
        'star-fill', 'cup-hot-fill', 'water', 'bicycle', 'stars', 'award', 'wifi',
        'tv', 'laptop', 'globe', 'telephone', 'car-front-fill', 'people-fill', 'building',
        'alarm', 'geo-alt-fill', 'cash'
    ];

    return (
        <div className="servicio-form-page">
            <div className="page-header mb-4">
                <h1 className="mb-2">{isEditando ? 'Editar Servicio' : 'Nuevo Servicio'}</h1>
                <p className="text-muted">
                    {isEditando
                        ? 'Modifique los detalles del servicio'
                        : 'Complete el formulario para crear un nuevo servicio'}
                </p>
            </div>

            <AlertComponent />

            {error && <Alert variant="danger">{error}</Alert>}

            <Card className="border-0 shadow-sm">
                <Card.Body>
                    <Form noValidate validated={validado} onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre del servicio</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        El nombre es obligatorio
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Horario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="horario"
                                        value={formData.horario}
                                        onChange={handleChange}
                                        placeholder="Ej: 9:00 AM - 6:00 PM"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Categoría</Form.Label>
                                    <Form.Select
                                        name="variante"
                                        value={formData.variante}
                                        onChange={handleChange}
                                        required
                                    >
                                        {categoriasServicio.map(cat => (
                                            <option key={cat.valor} value={cat.valor}>
                                                {cat.etiqueta}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select
                                        name="estado"
                                        value={formData.estado}
                                        onChange={handleChange}
                                        required
                                    >
                                        {Object.values(ESTADOS_SERVICIO).map(estado => (
                                            <option key={estado} value={estado}>{estado}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ícono</Form.Label>
                                    <Form.Select
                                        name="icon"
                                        value={formData.icon}
                                        onChange={handleChange}
                                    >
                                        {iconosDisponibles.map(icono => (
                                            <option key={icono} value={icono}>
                                                {icono}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <div className="mt-2 text-center">
                                        <i className={`bi bi-${formData.icon} fs-4`}></i>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                id="destacado"
                                name="destacado"
                                label="Servicio destacado (se mostrará en la página principal)"
                                checked={formData.destacado}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                La descripción es obligatoria
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Características y beneficios</Form.Label>
                            {formData.caracteristicas.map((caract, index) => (
                                <div key={index} className="d-flex mb-2">
                                    <Form.Control
                                        type="text"
                                        value={caract}
                                        onChange={(e) => handleCaracteristicaChange(index, e.target.value)}
                                        placeholder={`Característica ${index + 1}`}
                                    />
                                    <Button
                                        variant="outline-danger"
                                        className="ms-2"
                                        onClick={() => eliminarCaracteristica(index)}
                                        disabled={formData.caracteristicas.length <= 1}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </div>
                            ))}
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={agregarCaracteristica}
                                className="mt-2"
                            >
                                <i className="bi bi-plus"></i> Agregar característica
                            </Button>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Imagen del servicio</Form.Label>
                            <ImageUploader
                                imagenes={imagen ? [imagen] : []}
                                onChange={handleImagenChange}
                                multiple={false}
                            />
                            <Form.Text className="text-muted">
                                Suba una imagen que represente el servicio
                            </Form.Text>
                        </Form.Group>

                        <div className="d-flex gap-3 justify-content-end">
                            <Button
                                variant="outline-secondary"
                                onClick={() => navigate('/admin/servicios')}
                                disabled={guardando}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={guardando}
                            >
                                {guardando ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Guardando...
                                    </>
                                ) : (
                                    isEditando ? 'Actualizar Servicio' : 'Crear Servicio'
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ServicioForm;
