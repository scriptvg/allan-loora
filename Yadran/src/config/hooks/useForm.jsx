import { useState, useCallback } from 'react';
import { esNuloOIndefinido, estaVacio } from '../utils/validationUtils';

export const useFormulario = (valoresIniciales = {}, validar, alEnviar) => {
    const [valores, setValores] = useState(valoresIniciales);
    const [errores, setErrores] = useState({});
    const [tocados, setTocados] = useState({});
    const [estaEnviando, setEstaEnviando] = useState(false);
    const [esValido, setEsValido] = useState(false);

    const validarValores = useCallback((valoresAValidar) => {
        if (typeof validar !== 'function') return {};

        const erroresValidacion = validar(valoresAValidar);
        const tieneErrores = !estaVacio(erroresValidacion);

        setEsValido(!tieneErrores);
        return erroresValidacion;
    }, [validar]);

    const manejarCambio = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        const valorCampo = type === 'checkbox' ? checked : value;

        setValores(prevValores => ({
            ...prevValores,
            [name]: valorCampo
        }));

        if (tocados[name] && typeof validar === 'function') {
            const erroresValidacion = validar({
                ...valores,
                [name]: valorCampo
            });

            setErrores(prevErrores => ({
                ...prevErrores,
                [name]: erroresValidacion[name] || ''
            }));

            setEsValido(estaVacio(erroresValidacion));
        }
    }, [valores, tocados, validar]);

    const manejarBlur = useCallback((e) => {
        const { name } = e.target;

        setTocados(prevTocados => ({
            ...prevTocados,
            [name]: true
        }));

        if (typeof validar === 'function') {
            const erroresValidacion = validar(valores);

            setErrores(prevErrores => ({
                ...prevErrores,
                [name]: erroresValidacion[name] || ''
            }));

            setEsValido(estaVacio(erroresValidacion));
        }
    }, [valores, validar]);

    const manejarEnvio = useCallback(async (e) => {
        if (e) e.preventDefault();

        const todosTocados = Object.keys(valores).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});

        setTocados(todosTocados);

        const erroresValidacion = typeof validar === 'function' ? validar(valores) : {};
        setErrores(erroresValidacion);

        const tieneErrores = !estaVacio(erroresValidacion);
        setEsValido(!tieneErrores);

        if (!tieneErrores && typeof alEnviar === 'function') {
            setEstaEnviando(true);
            try {
                await alEnviar(valores);
            } catch (error) {
                console.error('Error al enviar formulario:', error);
            } finally {
                setEstaEnviando(false);
            }
        }
    }, [valores, validar, alEnviar]);

    const reiniciarFormulario = useCallback(() => {
        setValores(valoresIniciales);
        setErrores({});
        setTocados({});
        setEstaEnviando(false);
        setEsValido(false);
    }, [valoresIniciales]);

    const setCampoValor = useCallback((nombre, valor) => {
        setValores(prevValores => ({
            ...prevValores,
            [nombre]: valor
        }));
    }, []);

    const setCampoError = useCallback((nombre, error) => {
        setErrores(prevErrores => ({
            ...prevErrores,
            [nombre]: error
        }));
    }, []);

    const setCampoTocado = useCallback((nombre, estaTocado = true) => {
        setTocados(prevTocados => ({
            ...prevTocados,
            [nombre]: estaTocado
        }));
    }, []);

    return {
        valores,
        errores,
        tocados,
        estaEnviando,
        esValido,
        manejarCambio,
        manejarBlur,
        manejarEnvio,
        reiniciarFormulario,
        setCampoValor,
        setCampoError,
        setCampoTocado,
        validarFormulario: () => validarValores(valores)
    };
};
