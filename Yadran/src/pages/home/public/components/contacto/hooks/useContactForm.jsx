import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const useContactForm = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [formTouched, setFormTouched] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Marcar que el formulario ha sido tocado
        if (!formTouched) {
            setFormTouched(true);
        }

        // Limpiar error del campo cuando se modifica
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        // Validar nombre
        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es obligatorio';
        } else if (formData.nombre.trim().length < 3) {
            newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
        }

        // Validar email
        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'El email no es válido';
        }

        // Validar teléfono (opcional pero con formato si se ingresa)
        if (formData.telefono.trim() && !/^[+\d\s()-]{7,15}$/.test(formData.telefono)) {
            newErrors.telefono = 'Formato de teléfono inválido';
        }

        // Validar asunto
        if (!formData.asunto.trim()) {
            newErrors.asunto = 'El asunto es obligatorio';
        } else if (formData.asunto.trim().length < 5) {
            newErrors.asunto = 'El asunto debe tener al menos 5 caracteres';
        }

        // Validar mensaje
        if (!formData.mensaje.trim()) {
            newErrors.mensaje = 'El mensaje es obligatorio';
        } else if (formData.mensaje.trim().length < 10) {
            newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
        }

        return newErrors;
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            asunto: '',
            mensaje: ''
        });
        setFormTouched(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitting(true);
        setEmailError(null);

        try {
            // Enviar email usando EmailJS
            const result = await emailjs.sendForm(
                'service_j169vbf', // Service ID
                'template_8o1dnsh', // Template ID
                form.current,
                'qf1R-pK-oO2awsdWn' // User ID (Public Key)
            );

            console.log('Email enviado correctamente:', result.text);
            setSubmitting(false);
            setShowSuccess(true);
            resetForm();

            // Ocultar mensaje de éxito después de unos segundos
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('Error al enviar email:', error);
            setSubmitting(false);

            // Mensajes de error específicos según el tipo de error
            if (error.text && error.text.includes('authentication credentials')) {
                setEmailError('Error de autenticación con el servicio de correo. Por favor contacta al administrador.');
            } else if (error.status === 400) {
                setEmailError('Error en los datos del formulario. Por favor verifica la información.');
            } else if (error.status === 429) {
                setEmailError('Demasiados intentos. Por favor espera unos minutos antes de intentar nuevamente.');
            } else {
                setEmailError('Hubo un problema al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.');
            }
        }
    };

    return {
        form,
        formData,
        errors,
        submitting,
        showSuccess,
        emailError,
        handleChange,
        handleSubmit
    };
};

export default useContactForm;