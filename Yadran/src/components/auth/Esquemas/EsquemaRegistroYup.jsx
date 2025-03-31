import * as Yup from 'yup';

const EsquemaRegistroYup = Yup.object().shape({
    nombre: Yup.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede tener más de 50 caracteres')
        .required('El nombre es obligatorio'),
    
    apellido: Yup.string()
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .max(50, 'El apellido no puede tener más de 50 caracteres')
        .required('El apellido es obligatorio'),
    
    email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es obligatorio'),
    
    password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial'
        )
        .required('La contraseña es obligatoria'),
    
    confirmarPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Confirmar la contraseña es obligatorio'),
    
    terminosCondiciones: Yup.boolean()
        .oneOf([true], 'Debes aceptar los términos y condiciones')
        .required('Debes aceptar los términos y condiciones')
});

export default EsquemaRegistroYup;