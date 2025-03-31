import React from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAlertMixin } from '../../../../../../config/mixins/AlertMixin';
import { isValidEmail } from '../../../../../../config/utils/validationUtils';

const ContactForm = () => {
    // Usar mixin de alertas
    const { showSuccessAlert, showErrorAlert, AlertComponent } = useAlertMixin();

    // Valores iniciales y esquema de validación
    const initialValues = {
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
    };

    const ContactSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre debe tener al menos 3 caracteres')
            .required('El nombre es obligatorio'),
        email: Yup.string()
            .email('Correo electrónico inválido')
            .required('El correo electrónico es obligatorio'),
        asunto: Yup.string()
            .min(5, 'El asunto debe tener al menos 5 caracteres')
            .required('El asunto es obligatorio'),
        mensaje: Yup.string()
            .min(10, 'El mensaje debe tener al menos 10 caracteres')
            .required('El mensaje es obligatorio')
    });

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            // Validación adicional del email
            if (!isValidEmail(values.email)) {
                showErrorAlert('Por favor ingrese un correo electrónico válido');
                return;
            }

            // Simular envío (aquí se haría la petición real al backend)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mostrar éxito y resetear
            showSuccessAlert('Su mensaje ha sido enviado con éxito. Nos pondremos en contacto con usted pronto.', {
                title: 'Mensaje Enviado',
                autoClose: true,
                closeDelay: 5000
            });

            resetForm();
        } catch (error) {
            console.error("Error al enviar mensaje:", error);

            if (error.text && error.text.includes('authentication credentials')) {
                showErrorAlert('Error de autenticación al enviar el mensaje. Por favor, inténtelo más tarde.');
            } else if (error.status === 400) {
                showErrorAlert('Por favor verifique los datos ingresados e intente nuevamente.');
            } else if (error.status === 429) {
                showErrorAlert('Demasiados intentos. Por favor espera unos minutos antes de intentar nuevamente.');
            } else {
                showErrorAlert('Hubo un problema al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card className="contacto-form-card border-0 shadow-sm animate-on-scroll fade-in-right">
            <Card.Body className="p-4 p-lg-5">
                <h2 className="form-title mb-4">Envíenos un Mensaje</h2>

                {/* Usar componente de alertas */}
                <AlertComponent />

                <Formik
                    initialValues={initialValues}
                    validationSchema={ContactSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, handleChange, values, errors, touched, isSubmitting }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre completo <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nombre"
                                            value={values.nombre}
                                            onChange={handleChange}
                                            placeholder="Ingrese su nombre"
                                            isInvalid={touched.nombre && !!errors.nombre}
                                            disabled={isSubmitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.nombre}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            placeholder="ejemplo@correo.com"
                                            isInvalid={touched.email && !!errors.email}
                                            disabled={isSubmitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Teléfono (opcional)</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="telefono"
                                            value={values.telefono}
                                            onChange={handleChange}
                                            placeholder="Ingrese su teléfono"
                                            isInvalid={touched.telefono && !!errors.telefono}
                                            disabled={isSubmitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.telefono}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Asunto <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="asunto"
                                            value={values.asunto}
                                            onChange={handleChange}
                                            placeholder="Motivo de contacto"
                                            isInvalid={touched.asunto && !!errors.asunto}
                                            disabled={isSubmitting}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.asunto}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-4">
                                <Form.Label>Mensaje <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    name="mensaje"
                                    value={values.mensaje}
                                    onChange={handleChange}
                                    placeholder="Escriba su mensaje aquí..."
                                    isInvalid={touched.mensaje && !!errors.mensaje}
                                    disabled={isSubmitting}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.mensaje}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 py-2 enviar-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Enviando...
                                    </>
                                ) : 'Enviar Mensaje'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
};

export default ContactForm;