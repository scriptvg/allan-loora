import React from 'react'
import './App.css'


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Eliminar la importación de BrowserRouter ya que se usa dentro de Routing.jsx
// import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './config/context/AuthContext';

// Corregir la ruta de importación asegurándose que sea relativa a la ubicación actual
import Routing from './config/routes/Routing';

// O donde tengas tu punto de entrada de la aplicación
import 'leaflet/dist/leaflet.css';

// Importar estilos para alertas
import './assets/styles/alert-mixin.css';

/* Estilos propios */


function App() {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  );
}

export default App
