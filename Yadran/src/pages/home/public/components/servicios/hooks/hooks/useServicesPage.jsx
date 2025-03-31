import { useState, useEffect } from 'react';
import serviciosAPI from '../../../../../../../config/hooks/useServicios';

const useServicesPage = () => {
    const [services, setServices] = useState([]);
    const [featuredServices, setFeaturedServices] = useState([]);
    const [groupedServices, setGroupedServices] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadServices = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Usamos la función del hook global para obtener servicios
                const allServices = await serviciosAPI.obtenerServicios();

                // Normalizar los servicios
                const normalizedServices = allServices.map(service => ({
                    id: service.id || service._id,
                    title: service.etiqueta || service.title || service.nombre,
                    description: service.descripcion || service.description,
                    icon: service.icono || service.icon,
                    variante: service.variante || service.variant || 'primary',
                    destacado: service.destacado || service.featured || false,
                    precio: service.precio || service.price || 0
                }));

                // Configurar los servicios
                setServices(normalizedServices);

                // Configurar servicios destacados
                const destacados = normalizedServices.filter(service =>
                    service.destacado === true || service.featured === true
                );
                setFeaturedServices(destacados.length >= 3 ? destacados.slice(0, 3) : normalizedServices.slice(0, 3));

                // Agrupar servicios por categoría (usando variante como categoría)
                const grouped = normalizedServices.reduce((groups, service) => {
                    const variant = service.variante || 'primary';
                    if (!groups[variant]) {
                        groups[variant] = [];
                    }
                    groups[variant].push(service);
                    return groups;
                }, {});

                setGroupedServices(grouped);
            } catch (err) {
                console.error('Error al cargar servicios:', err);
                setError('No pudimos cargar los servicios. Por favor, intenta más tarde.');
            } finally {
                setIsLoading(false);
            }
        };

        loadServices();
    }, []);

    return { services, featuredServices, groupedServices, isLoading, error };
};

export default useServicesPage;