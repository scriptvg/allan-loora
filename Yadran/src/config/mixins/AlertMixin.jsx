import { useState, useCallback } from 'react';
import { Alert } from 'react-bootstrap';

/**
 * Mixin para manejar alertas en componentes
 * @returns {Object} Funciones y estado para manejar alertas
 */
export const useAlertMixin = () => {
    const [alert, setAlert] = useState({
        show: false,
        variant: 'info',
        message: '',
        title: '',
        icon: null,
        dismissible: true,
        autoClose: false,
        closeDelay: 5000
    });

    // Cerrar alerta
    const closeAlert = useCallback(() => {
        setAlert(prev => ({
            ...prev,
            show: false
        }));
    }, []);

    // Mostrar alerta con parámetros
    const showAlert = useCallback(({
        variant = 'info',
        message = '',
        title = '',
        icon = null,
        dismissible = true,
        autoClose = false,
        closeDelay = 5000
    } = {}) => {
        // Cerrar alerta anterior si existe
        if (alert.show) {
            closeAlert();
        }

        // Configurar iconos por defecto basados en la variante
        let defaultIcon = null;
        switch (variant) {
            case 'success':
                defaultIcon = 'check-circle-fill';
                break;
            case 'danger':
                defaultIcon = 'exclamation-triangle-fill';
                break;
            case 'warning':
                defaultIcon = 'exclamation-circle-fill';
                break;
            case 'info':
                defaultIcon = 'info-circle-fill';
                break;
            default:
                defaultIcon = 'info-circle-fill';
        }

        // Configurar nueva alerta
        setAlert({
            show: true,
            variant,
            message,
            title,
            icon: icon || defaultIcon,
            dismissible,
            autoClose,
            closeDelay
        });

        // Auto cerrar si está habilitado
        if (autoClose) {
            setTimeout(() => {
                closeAlert();
            }, closeDelay);
        }
    }, [alert.show, closeAlert]);

    // Mostrar alertas predefinidas como métodos convenientes
    const showSuccessAlert = useCallback((message, options = {}) => {
        showAlert({ variant: 'success', message, ...options });
    }, [showAlert]);

    const showErrorAlert = useCallback((message, options = {}) => {
        showAlert({ variant: 'danger', message, ...options });
    }, [showAlert]);

    const showWarningAlert = useCallback((message, options = {}) => {
        showAlert({ variant: 'warning', message, ...options });
    }, [showAlert]);

    const showInfoAlert = useCallback((message, options = {}) => {
        showAlert({ variant: 'info', message, ...options });
    }, [showAlert]);

    // Componente de alerta configurable
    const AlertComponent = () => {
        if (!alert.show) return null;

        return (
            <Alert
                variant={alert.variant}
                onClose={closeAlert}
                dismissible={alert.dismissible}
                className="alert-animated shadow-sm"
            >
                <div className="d-flex align-items-center">
                    {alert.icon && (
                        <i className={`bi bi-${alert.icon} me-2 alert-icon`}></i>
                    )}
                    <div>
                        {alert.title && <Alert.Heading className="alert-title">{alert.title}</Alert.Heading>}
                        <div className="alert-message">{alert.message}</div>
                    </div>
                </div>
            </Alert>
        );
    };

    return {
        alert,
        closeAlert,
        showAlert,
        showSuccessAlert,
        showErrorAlert,
        showWarningAlert,
        showInfoAlert,
        AlertComponent
    };
};
