import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import Header from '../../../components/header/Header.jsx';
import Footer from '../../../components/footer/Footer.jsx';
import HabitacionesHeader from './components/habitaciones/components/HabitacionesHeader.jsx';
import HabitacionesFiltros from './components/habitaciones/components/HabitacionesFiltros.jsx';
import HabitacionesList from './components/habitaciones/components/HabitacionesList.jsx';
import NoResults from './components/habitaciones/components/NoResults.jsx';
import useHabitaciones from '../../../config/hooks/useHabitaciones.jsx';
import { ESTADOS } from '../../../config/utils/estadosConfig.jsx';
import './components/habitaciones/styles/Habitaciones.css';

const Habitaciones = () => {
    const { habitaciones, cargando, error, obtenerHabitaciones } = useHabitaciones();
    const [filtros, setFiltros] = useState({
        tipo: '',
        estado: '',
        precioMin: '',
        precioMax: '',
        capacidad: ''
    });
    const [ordenarPor, setOrdenarPor] = useState('');
    const [habitacionesFiltradas, setHabitacionesFiltradas] = useState([]);

    // Aplicar filtros cuando cambien
    useEffect(() => {
        if (!habitaciones.length) return;

        let resultados = [...habitaciones];

        // Aplicar filtro de tipo
        if (filtros.tipo) {
            resultados = resultados.filter(h => h.tipo === filtros.tipo);
        }

        // Aplicar filtro de estado - Adaptado para los valores exactos del JSON
        if (filtros.estado) {
            resultados = resultados.filter(h => h.estado === filtros.estado);
        }

        // Aplicar filtro de precio mínimo
        if (filtros.precioMin) {
            resultados = resultados.filter(h => h.precio >= parseFloat(filtros.precioMin));
        }

        // Aplicar filtro de precio máximo
        if (filtros.precioMax) {
            resultados = resultados.filter(h => h.precio <= parseFloat(filtros.precioMax));
        }

        // Aplicar filtro de capacidad
        if (filtros.capacidad) {
            resultados = resultados.filter(h => h.capacidad >= parseInt(filtros.capacidad));
        }

        // Aplicar ordenamiento
        if (ordenarPor) {
            switch (ordenarPor) {
                case 'precio-asc':
                    resultados.sort((a, b) => a.precio - b.precio);
                    break;
                case 'precio-desc':
                    resultados.sort((a, b) => b.precio - a.precio);
                    break;
                case 'capacidad':
                    resultados.sort((a, b) => b.capacidad - a.capacidad);
                    break;
                default:
                    break;
            }
        }

        setHabitacionesFiltradas(resultados);
    }, [filtros, ordenarPor, habitaciones]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFiltros({
            ...filtros,
            [name]: value
        });
    };

    const resetFiltros = () => {
        setFiltros({
            tipo: '',
            estado: '',
            precioMin: '',
            precioMax: '',
            capacidad: ''
        });
        setOrdenarPor('');
    };

    if (cargando) {
        return (
            <>
                <Header />
                <Container className="py-5 text-center">
                    <div className="spinner-container" style={{ marginTop: "100px" }}>
                        <Spinner animation="border" role="status" variant="primary" style={{ width: "3rem", height: "3rem" }}>
                            <span className="visually-hidden">Cargando...</span>
                        </Spinner>
                        <div className="mt-3 fw-light fs-5">Buscando las mejores habitaciones para usted...</div>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <Container className="py-5">
                    <div className="alert alert-danger p-4 rounded-4 shadow-sm">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-exclamation-triangle-fill me-3 fs-3"></i>
                            <div>
                                <h4>No pudimos cargar las habitaciones</h4>
                                <p className="mb-0">{error}</p>
                            </div>
                        </div>
                        <button
                            className="btn btn-outline-danger mt-3"
                            onClick={() => obtenerHabitaciones()}
                        >
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            Intentar de nuevo
                        </button>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="animate-fade-up habitaciones-page">
                <Container className="py-5">
                    <HabitacionesHeader />

                    <HabitacionesFiltros
                        filtros={filtros}
                        ordenarPor={ordenarPor}
                        handleFilterChange={handleFilterChange}
                        setOrdenarPor={setOrdenarPor}
                        resetFiltros={resetFiltros}
                        cantidadResultados={habitacionesFiltradas.length}
                    />

                    {habitacionesFiltradas.length > 0 ? (
                        <HabitacionesList habitaciones={habitacionesFiltradas} />
                    ) : (
                        <NoResults resetFiltros={resetFiltros} />
                    )}
                </Container>
            </main>
            <Footer />
        </>
    );
};

export default Habitaciones;