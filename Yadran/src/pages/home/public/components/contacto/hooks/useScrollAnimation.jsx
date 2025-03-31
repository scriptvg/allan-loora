import { useEffect } from 'react';

const useScrollAnimation = () => {
    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');

            elements.forEach(element => {
                // Obtener la posición del elemento
                const position = element.getBoundingClientRect();

                // Verificar si el elemento es visible en la ventana
                if (position.top < window.innerHeight - 100) {
                    element.classList.add('visible');
                }
            });
        };

        // Aplicar animación en la carga inicial
        setTimeout(handleScroll, 100);

        // Agregar listener para scroll
        window.addEventListener('scroll', handleScroll);

        // Limpiar listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return null;
};

export default useScrollAnimation;