import * as Yup from 'yup';

const EsquemaLoginYup = Yup.object().shape({
    email: Yup.string()
        .email('Correo electrónico inválido')
        .required("El correo electrónico es obligatorio"),
    password: Yup.string()
        /* .min(8, 'La contraseña debe tener al menos 8 caracteres') */
        .required('La contraseña es obligatoria')
        /* .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
        .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
        .matches(/[!@#$%^&*]/, 'La contraseña debe contener al menos un carácter especial (!@#$%^&*)')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])/, 'La contraseña debe contener al menos una letra mayúscula y una minúscula')
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, 'La contraseña debe contener al menos un número y un carácter especial (!@#$%^&*)')
        .matches(/^(?=.*[A-Z])(?=.*[0-9])/, 'La contraseña debe contener al menos una letra mayúscula y un número') */

});

export default EsquemaLoginYup;