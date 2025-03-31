import { useState, useEffect } from 'react';

export function useWindowSize() {
    const [tamanioVentana, setTamanioVentana] = useState({
        ancho: undefined,
        alto: undefined,
    });

    const [esMovil, setEsMovil] = useState(false);
    const [esTablet, setEsTablet] = useState(false);
    const [esEscritorio, setEsEscritorio] = useState(false);

    useEffect(() => {
        function manejarCambioTamanio() {
            const ancho = window.innerWidth;
            const alto = window.innerHeight;

            setTamanioVentana({
                ancho,
                alto,
            });

            setEsMovil(ancho < 768);
            setEsTablet(ancho >= 768 && ancho < 992);
            setEsEscritorio(ancho >= 992);
        }

        window.addEventListener("resize", manejarCambioTamanio);

        manejarCambioTamanio();

        return () => window.removeEventListener("resize", manejarCambioTamanio);
    }, []);

    return {
        ancho: tamanioVentana.ancho,
        alto: tamanioVentana.alto,
        esMovil,
        esTablet,
        esEscritorio
    };
}
