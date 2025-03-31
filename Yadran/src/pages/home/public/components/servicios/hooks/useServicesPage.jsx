import { useState, useEffect } from 'react';
// CORRECCIÓN: La ruta relativa es muy profunda y puede causar problemas
import { usarServicios } from '../../../../../../config/hooks/useServicios';

// Datos predeterminados para usar si la API no devuelve datos
const serviciosPredeterminados = [
    {
        id: 1,
        title: "Restaurante Gourmet",
        description: "Disfrute de una experiencia culinaria excepcional con nuestra cocina internacional y platos locales preparados por nuestros chefs de renombre.",
        icon: "cup-hot-fill",
        imgSrc: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
        horario: "7:00 AM - 11:00 PM",
        destacado: true,
        variante: "warning",
        caracteristicas: [
            "Cocina internacional",
            "Chef especializado",
            "Vistas panorámicas",
            "Reserva anticipada"
        ]
    },
    {
        id: 2,
        title: "Spa & Bienestar",
        description: "Rejuvenezca cuerpo y mente en nuestro spa de lujo con tratamientos exclusivos, masajes terapéuticos y rituales de relajación.",
        icon: "water",
        imgSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070",
        horario: "9:00 AM - 8:00 PM",
        destacado: true,
        variante: "success",
        caracteristicas: [
            "Masajes terapéuticos",
            "Tratamientos faciales",
            "Sauna y baño turco",
            "Sesiones de yoga"
        ]
    },
    {
        id: 3,
        title: "Gimnasio Equipado",
        description: "Mantenga su rutina de ejercicios en nuestro moderno gimnasio con equipos de última generación y entrenadores personales disponibles.",
        icon: "bicycle",
        imgSrc: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070",
        horario: "6:00 AM - 10:00 PM",
        destacado: false,
        variante: "success",
        caracteristicas: [
            "Máquinas cardiovasculares",
            "Área de pesas libres",
            "Clases grupales",
            "Entrenadores personales"
        ]
    },
    {
        id: 4,
        title: "Piscina Climatizada",
        description: "Relájese en nuestra piscina climatizada con vistas panorámicas, tumbonas premium y servicio de bar junto a la piscina.",
        icon: "water",
        imgSrc: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070",
        horario: "7:00 AM - 9:00 PM",
        destacado: true,
        variante: "info",
        caracteristicas: [
            "Temperatura controlada",
            "Áreas para niños",
            "Tumbonas exclusivas",
            "Servicio de bebidas"
        ]
    },
    {
        id: 5,
        title: "Business Center",
        description: "Espacio de trabajo equipado con tecnología de punta para satisfacer todas sus necesidades empresariales durante su estancia.",
        icon: "laptop",
        imgSrc: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2070",
        horario: "24 horas",
        destacado: false,
        variante: "primary",
        caracteristicas: [
            "Internet de alta velocidad",
            "Salas de reuniones",
            "Equipo audiovisual",
            "Servicio de impresión"
        ]
    },
    {
        id: 6,
        title: "Servicio de Transporte",
        description: "Ofrecemos transporte privado desde y hacia el aeropuerto, así como servicios de traslado a los principales puntos de interés.",
        icon: "car-front-fill",
        imgSrc: "https://images.unsplash.com/photo-1560861245-e9ea9bc9a59c?q=80&w=2070",
        horario: "Bajo petición",
        destacado: false,
        variante: "dark",
        caracteristicas: [
            "Traslados aeropuerto-hotel",
            "Excursiones guiadas",
            "Vehículos premium",
            "Choferes profesionales"
        ]
    }
];

const useServicesPage = () => {
    const [services, setServices] = useState([]);
    const [featuredServices, setFeaturedServices] = useState([]);
    const [groupedServices, setGroupedServices] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const serviciosAPI = usarServicios();

    useEffect(() => {
        const loadServices = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Intentar obtener servicios de la API
                let allServices = [];
                
                try {
                    // Usar la función del hook global para obtener servicios
                    allServices = await serviciosAPI.obtenerServicios();
                    
                    // Si no hay servicios o hay un error, usar datos predeterminados
                    if (!allServices || allServices.length === 0) {
                        allServices = serviciosPredeterminados;
                        setError("No se encontraron servicios en la base de datos. Mostrando datos predeterminados.");
                    }
                } catch (err) {
                    console.warn("Error al cargar servicios desde API:", err);
                    allServices = serviciosPredeterminados;
                    setError("No se pudieron cargar los servicios. Mostrando datos predeterminados.");
                }
                
                // Normalizar estructura de datos
                const normalizedServices = allServices.map(service => ({
                    id: service.id || service._id,
                    title: service.title || service.etiqueta || service.nombre,
                    description: service.description || service.descripcion,
                    icon: service.icon || service.icono || "star-fill",
                    imgSrc: service.imgSrc || service.imagen,
                    horario: service.horario || "Consultar en recepción",
                    destacado: service.destacado || service.featured || false,
                    variante: service.variante || service.variant || "primary",
                    caracteristicas: service.caracteristicas || service.features || [
                        "Servicio exclusivo para huéspedes",
                        "Personal altamente calificado",
                        "Estándares de calidad superior"
                    ]
                }));
                
                // Configurar los servicios
                setServices(normalizedServices);
                
                // Configurar servicios destacados
                const destacados = normalizedServices.filter(service => service.destacado);
                setFeaturedServices(destacados.length >= 3 ? destacados : normalizedServices.slice(0, 3));
                
                // Agrupar servicios por categoría (usando variante como categoría)
                const grouped = normalizedServices.reduce((groups, service) => {
                    const variant = service.variante || "primary";
                    if (!groups[variant]) {
                        groups[variant] = [];
                    }
                    groups[variant].push(service);
                    return groups;
                }, {});
                
                setGroupedServices(grouped);
            } catch (err) {
                console.error('Error general al cargar servicios:', err);
                setServices(serviciosPredeterminados);
                
                // Establecer servicios destacados predeterminados
                const destacados = serviciosPredeterminados.filter(service => service.destacado);
                setFeaturedServices(destacados);
                
                // Agrupar servicios predeterminados
                const grouped = serviciosPredeterminados.reduce((groups, service) => {
                    const variant = service.variante || "primary";
                    if (!groups[variant]) {
                        groups[variant] = [];
                    }
                    groups[variant].push(service);
                    return groups;
                }, {});
                
                setGroupedServices(grouped);
                setError('No pudimos cargar los servicios. Mostrando datos predeterminados.');
            } finally {
                setIsLoading(false);
            }
        };

        loadServices();
    }, []);

    return { services, featuredServices, groupedServices, isLoading, error };
};

export default useServicesPage;