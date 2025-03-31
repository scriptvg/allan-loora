import { useState, useEffect } from 'react';

export function useScrollPosition(umbral = 50) {
    const [posicionScroll, setPosicionScroll] = useState(0);
    const [haHechoScroll, setHaHechoScroll] = useState(false);

    useEffect(() => {
        const manejarScroll = () => {
            const posicion = window.pageYOffset;
            setPosicionScroll(posicion);
            setHaHechoScroll(posicion > umbral);
        };

        window.addEventListener('scroll', manejarScroll, { passive: true });

        manejarScroll();

        return () => {
            window.removeEventListener('scroll', manejarScroll);
        };
    }, [umbral]);

    return { posicionScroll, haHechoScroll };
}
