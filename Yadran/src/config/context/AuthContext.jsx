import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [estaAutenticado, setEstaAutenticado] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    // Check for existing session on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const usuarioGuardado = localStorage.getItem('usuario');
        
        if (token && usuarioGuardado) {
            setEstaAutenticado(true);
            setUsuario(JSON.parse(usuarioGuardado));
        }
        
        setCargando(false);
    }, []);

    // Function to handle login authentication
    const autenticarInicioSesion = (datosUsuario) => {
        // Store authentication data
        if (datosUsuario.token) {
            localStorage.setItem('token', datosUsuario.token);
        }
        
        // Store user data - handle different API response formats
        const userData = datosUsuario.usuario || datosUsuario;
        localStorage.setItem('usuario', JSON.stringify(userData));
        
        // Update state
        setEstaAutenticado(true);
        setUsuario(userData);
    };

    // Function to handle logout
    const cerrarSesion = () => {
        // Remove stored data
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        
        // Update state
        setEstaAutenticado(false);
        setUsuario(null);
    };

    // Provide context values to children components
    return (
        <AuthContext.Provider value={{ 
            estaAutenticado, 
            usuario, 
            cargando,
            autenticarInicioSesion, 
            cerrarSesion 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const usarAutenticacion = () => useContext(AuthContext);