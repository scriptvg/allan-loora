export const esNuloOIndefinido = (valor) => {
    return valor === null || valor === undefined;
};

export const estaVacio = (valor) => {
    if (esNuloOIndefinido(valor)) return true;

    if (typeof valor === 'string') return valor.trim() === '';

    if (Array.isArray(valor)) return valor.length === 0;

    if (typeof valor === 'object') return Object.keys(valor).length === 0;

    return false;
};

export const esEmailValido = (email) => {
    if (estaVacio(email)) return false;

    const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return REGEX_EMAIL.test(email);
};

export const tieneLongitudMinima = (valor, longitudMinima) => {
    if (estaVacio(valor)) return false;

    return valor.length >= longitudMinima;
};

export const validarFortalezaContrasenia = (contrasenia) => {
    const resultado = {
        esValida: false,
        tieneLongitudMinima: false,
        tieneMayusculas: false,
        tieneMinusculas: false,
        tieneNumeros: false,
        tieneCaracteresEspeciales: false,
        puntuacion: 0,
        retroalimentacion: []
    };

    if (estaVacio(contrasenia)) {
        resultado.retroalimentacion.push('La contraseña no puede estar vacía');
        return resultado;
    }

    resultado.tieneLongitudMinima = contrasenia.length >= 8;
    if (resultado.tieneLongitudMinima) resultado.puntuacion += 1;
    else resultado.retroalimentacion.push('La contraseña debe tener al menos 8 caracteres');

    resultado.tieneMayusculas = /[A-Z]/.test(contrasenia);
    if (resultado.tieneMayusculas) resultado.puntuacion += 1;
    else resultado.retroalimentacion.push('Incluye al menos una letra mayúscula');

    resultado.tieneMinusculas = /[a-z]/.test(contrasenia);
    if (resultado.tieneMinusculas) resultado.puntuacion += 1;
    else resultado.retroalimentacion.push('Incluye al menos una letra minúscula');

    resultado.tieneNumeros = /[0-9]/.test(contrasenia);
    if (resultado.tieneNumeros) resultado.puntuacion += 1;
    else resultado.retroalimentacion.push('Incluye al menos un número');

    resultado.tieneCaracteresEspeciales = /[!@#$%^&*(),.?":{}|<>]/.test(contrasenia);
    if (resultado.tieneCaracteresEspeciales) resultado.puntuacion += 1;
    else resultado.retroalimentacion.push('Incluye al menos un carácter especial');

    resultado.esValida = resultado.puntuacion >= 4;

    return resultado;
};
