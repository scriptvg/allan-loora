import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { habitacionesApi } from '../../../config/api/habitacionesApi';
import { ESTADOS_HABITACION } from '../../../config/utils/estadosConfig';
import { useAlertMixin } from '../../../config/mixins/AlertMixin';
import ImageUploader from '../../../components/common/ImageUploader';

const HabitacionForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSuccessAlert, showErrorAlert, AlertComponent } = useAlertMixin();
    const isEditando = !!id;

    const [formData, setFormData] = useState({
        nombre: '',
        numero: '',
        tipo: 'individual',
        descripcion: '',
        precio: '',
        capacidad: 1,
        estado: ESTADOS_HABITACION.DISPONIBLE,
        tamaño: '',
        servicios: []
    });

    const [imagenes, setImagenes] = useState([]);
    const [imagenesHabitacion, setImagenesHabitacion] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState(null);
    const [validado, setValidado] = useState(false);

    useEffect(() => {
        if (isEditando) {
            const cargarHabitacion = async () => {
                try {
                    setCargando(true);
                    const habitacion = await habitacionesApi.obtenerHabitacionPorId(id);
                    
                    setFormData({
                        nombre: habitacion.nombre || '',
                        numero: habitacion.numero || '',
                        tipo: habitacion.tipo || 'individual',
                        descripcion: habitacion.descripcion || '',
                        precio: habitacion.precio || '',
                        capacidad: habitacion.capacidad || 1,
                        estado: habitacion.estado || ESTADOS_HABITACION.DISPONIBLE,
                        tamaño: habitacion.tamaño || '',
                        servicios: habitacion.servicios || []
                    });

                    // Cargar imágenes si existen
                    if (habitacion.imgsHabitacion) {
                        if (habitacion.imgsHabitacion.img) {
                            setImagenes(habitacion.imgsHabitacion.img);
                        }
                        if (habitacion.imgsHabitacion.imgHabitacion) {
                            setImagenesHabitacion(habitacion.imgsHabitacion.imgHabitacion);
                        }
                    }
                } catch (error) {
                    console.error('Error al cargar habitación:', error);
                    setError('No se pudo cargar la información de la habitación');
                    showErrorAlert('Error al cargar los datos de la habitación', {
                        title: 'Error',
                        autoClose: true
                    });
                } finally {
                    setCargando(false);
                }
            };

            cargarHabitacion();
        }
    }, [id, isEditando, showErrorAlert]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            // Manejar checkboxes para servicios
            if (checked) {
                setFormData(prev => ({
                    ...prev,
                    servicios: [...prev.servicios, name]
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    servicios: prev.servicios.filter(s => s !== name)
                }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImagenesChange = (nuevasImagenes, tipo = 'general') => {
        if (tipo === 'general') {
            setImagenes(nuevasImagenes);
        } else {
            setImagenesHabitacion(nuevasImagenes);
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

            const datosGuardar = {
                ...formData,
                precio: parseFloat(formData.precio),
                capacidad: parseInt(formData.capacidad),
                tamaño: formData.tamaño ? parseFloat(formData.tamaño) : null,
                imgsHabitacion: {
                    img: imagenes,
                    imgHabitacion: imagenesHabitacion
                }
            };

            if (isEditando) {
                await habitacionesApi.actualizarHabitacion(id, datosGuardar);
                showSuccessAlert('Habitación actualizada correctamente', {
                    title: 'Éxito',
                    autoClose: true
                });
            } else {
                await habitacionesApi.crearHabitacion(datosGuardar);
                showSuccessAlert('Habitación creada correctamente', {
                    title: 'Éxito',
                    autoClose: true
                });
            }

            navigate('/admin/habitaciones');
        } catch (error) {
            console.error('Error al guardar habitación:', error);
            setError('Ocurrió un error al guardar la habitación');
            showErrorAlert('Error al guardar la habitación', {
                title: 'Error',
                autoClose: true
            });
        } finally {
            setGuardando(false);
        }
    };

    if (cargando) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3 text-muted">Cargando datos de la habitación...</p>
            </div>
        );
    }

    return (
        <div className="habitacion-form-page">
            <div className="page-header mb-4">
                <h1 className="mb-2">{isEditando ? 'Editar Habitación' : 'Nueva Habitación'}</h1>
                <p className="text-muted">
                    {isEditando 
                        ? 'Modifique los detalles de la habitación' 
                        : 'Complete el formulario para crear una nueva habitación'}
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
                                    <Form.Label>Nombre de la habitación</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
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
                                    <Form.Label>Número de habitación</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="numero"
                                        value={formData.numero}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        El número de habitación es obligatorio
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tipo de habitación</Form.Label>
                                    <Form.Select
                                        name="tipo"
                                        value={formData.tipo}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="individual">Individual</option>
                                        <option value="doble">Doble</option>
                                        <option value="suite">Suite</option>
                                        <option value="familiar">Familiar</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Precio por noche</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="precio"
                                        value={formData.precio}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese un precio válido
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Capacidad</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="capacidad"
                                        value={formData.capacidad}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        La capacidad debe ser al menos 1
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select
                                        name="estado"
                                        value={formData.estado}
                                        onChange={handleChange}
                                        required
                                    >
                                        {Object.values(ESTADOS_HABITACION).map(estado => (
                                            <option key={estado} value={estado}>{estado}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tamaño (m²)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="tamaño"
                                        value={formData.tamaño}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                rows={3}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                La descripción es obligatoria
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Servicios y Amenidades</Form.Label>
                            <div className="servicios-checkboxes">
                                <Row>
                                    <Col sm={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            id="wifi"
                                            name="wifi"
                                            label="WiFi"
                                            checked={formData.servicios.includes('wifi')}
                                            onChange={handleChange}
                                            className="mb-2"
                                        />
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            id="tv"
                                            name="tv"
                                            label="Televisión"
                                            checked={formData.servicios.includes('tv')}
                                            onChange={handleChange}
                                            className="mb-2"
                                        />
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            id="aire_acondicionado"
                                            name="aire_acondicionado"
                                            label="Aire acondicionado"
                                            checked={formData.servicios.includes('aire_acondicionado')}
                                            onChange={handleChange}
                                            className="mb-2"
                                        />
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            id="minibar"
                                            name="minibar"
                                            label="Minibar"
                                            checked={formData.servicios.includes('minibar')}
                                            onChange={handleChange}
                                            className="mb-2"
                                        />
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            id="vista_al_mar"
                                            name="vista_al_mar"
                                            label="Vista al mar"
                                            checked={formData.servicios.includes('vista_al_mar')}
                                            onChange={handleChange}
                                            className="mb-2"
                                        />
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            id="bano_privado"
                                            name="bano_privado"
                                            label="Baño privado"
                                            checked={formData.servicios.includes('bano_privado')}
                                            onChange={handleChange}
                                            className="mb-2"
                                        />
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            id="caja_fuerte"
                                            name="caja_fuerte"
                                            label="Caja fuerte"
                                            checked={formData.servicios.includes('caja_fuerte')}
                                            onChange={handleChange}
                                            className="mb-2"
                                        />
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            id="desayuno"
                                            name="desayuno"
                                            label="Desayuno incluido"
                                            checked={formData.servicios.includes('desayuno')}
                                            onChange={handleChange}
                                            className="mb-2"
                                        />
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Check
                                            type="checkbox"
                                            id="limpieza_diaria"
                                            name="limpieza_diaria"
                                            label="Limpieza diaria"
                                            checked={formData.servicios.includes('limpieza_diaria')}
                                            onChange={handleChange}
                                            className="mb-2"
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Imágenes Principales</Form.Label>
                            <ImageUploader
                                imagenes={imagenes}
                                onChange={(nuevasImagenes) => handleImagenesChange(nuevasImagenes, 'general')}
                                multiple={true}
                            />
                            <Form.Text className="text-muted">
                                Suba imágenes principales de la habitación
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Imágenes Adicionales de la Habitación</Form.Label>
                            <ImageUploader
                                imagenes={imagenesHabitacion}
                                onChange={(nuevasImagenes) => handleImagenesChange(nuevasImagenes, 'habitacion')}
                                multiple={true}
                            />
                            <Form.Text className="text-muted">
                                Suba imágenes adicionales o de detalle
                            </Form.Text>
                        </Form.Group>

                        <div className="d-flex gap-3 justify-content-end">
                            <Button
                                variant="outline-secondary"
                                onClick={() => navigate('/admin/habitaciones')}
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
                                    isEditando ? 'Actualizar Habitación' : 'Crear Habitación'
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default HabitacionForm;
