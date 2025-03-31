import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const serviciosApi = {
    /**
     * Obtiene todos los servicios
     * @returns {Promise<Array>} Lista de servicios
     */
    obtenerServicios: async () => {
        try {
            // En una implementación real, se conectaría a un backend
            // Por ahora devolvemos datos de ejemplo
            return [
                {
                    id: '1',
                    title: 'Restaurante Gourmet',
                    description: 'Disfrute de una experiencia culinaria excepcional con nuestra cocina internacional y platos locales preparados por nuestros chefs de renombre.',
                    icon: 'cup-hot-fill',
                    imgSrc: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070',
                    horario: '7:00 AM - 11:00 PM',
                    destacado: true,
                    variante: 'warning',
                    estado: 'Activo',
                    caracteristicas: [
                        'Cocina internacional',
                        'Chef especializado',
                        'Vistas panorámicas',
                        'Reserva anticipada'
                    ]
                },
                {
                    id: '2',
                    title: 'Spa & Bienestar',
                    description: 'Rejuvenezca cuerpo y mente en nuestro spa de lujo con tratamientos exclusivos, masajes terapéuticos y rituales de relajación.',
                    icon: 'water',
                    imgSrc: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070',
                    horario: '9:00 AM - 8:00 PM',
                    destacado: true,
                    variante: 'success',
                    estado: 'Activo',
                    caracteristicas: [
                        'Masajes terapéuticos',
                        'Tratamientos faciales',
                        'Sauna y baño turco',
                        'Sesiones de yoga'
                    ]
                },
                {
                    id: '3',
                    title: 'Gimnasio Equipado',
                    description: 'Mantenga su rutina de ejercicios en nuestro moderno gimnasio con equipos de última generación y entrenadores personales disponibles.',
                    icon: 'bicycle',
                    imgSrc: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070',
                    horario: '6:00 AM - 10:00 PM',
                    destacado: false,
                    variante: 'success',
                    estado: 'Activo',
                    caracteristicas: [
                        'Máquinas cardiovasculares',
                        'Área de pesas libres',
                        'Clases grupales',
                        'Entrenadores personales'
                    ]
                },
                {
                    id: '4',
                    title: 'Piscina Climatizada',
                    description: 'Relájese en nuestra piscina climatizada con vistas panorámicas, tumbonas premium y servicio de bar junto a la piscina.',
                    icon: 'water',
                    imgSrc: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070',
                    horario: '7:00 AM - 9:00 PM',
                    destacado: true,
                    variante: 'info',
                    estado: 'Activo',
                    caracteristicas: [
                        'Temperatura controlada',
                        'Áreas para niños',
                        'Tumbonas exclusivas',
                        'Servicio de bebidas'
                    ]
                },
                {
                    id: '5',
                    title: 'Servicio de Transporte',
                    description: 'Ofrecemos transporte privado desde y hacia el aeropuerto, así como servicios de traslado a los principales puntos de interés.',
                    icon: 'car-front-fill',
                    imgSrc: 'https://images.unsplash.com/photo-1560861245-e9ea9bc9a59c?q=80&w=2070',
                    horario: 'Bajo petición',
                    destacado: false,
                    variante: 'dark',
                    estado: 'Temporada',
                    caracteristicas: [
                        'Traslados aeropuerto-hotel',
                        'Excursiones guiadas',
                        'Vehículos premium',
                        'Choferes profesionales'
                    ]
                }
            ];
        } catch (error) {
            console.error('Error al obtener servicios:', error);
            throw error;
        }
    },

    /**
     * Obtiene un servicio por su ID
     * @param {string} id ID del servicio
     * @returns {Promise<Object>} Servicio encontrado
     */
    obtenerServicioPorId: async (id) => {
        try {
            // En implementación real: 
            // const response = await axios.get(`${API_URL}/servicios/${id}`);
            // return response.data;
            
            // Simulamos la obtención de un servicio específico
            const servicio = {
                id: id,
                title: 'Restaurante Gourmet',
                description: 'Disfrute de una experiencia culinaria excepcional con nuestra cocina internacional y platos locales preparados por nuestros chefs de renombre.',
                icon: 'cup-hot-fill',
                imgSrc: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070',
                horario: '7:00 AM - 11:00 PM',
                destacado: true,
                variante: 'warning',
                estado: 'Activo',
                caracteristicas: [
                    'Cocina internacional',
                    'Chef especializado',
                    'Vistas panorámicas',
                    'Reserva anticipada'
                ]
            };
            
            return servicio;
        } catch (error) {
            console.error(`Error al obtener servicio con ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Crea un nuevo servicio
     * @param {Object} servicio Datos del nuevo servicio
     * @returns {Promise<Object>} Servicio creado
     */
    crearServicio: async (servicio) => {
        try {
            // En implementación real: 
            // const response = await axios.post(`${API_URL}/servicios`, servicio);
            // return response.data;
            
            // Simulamos la creación de un servicio
            return {
                ...servicio,
                id: Date.now().toString()
            };
        } catch (error) {
            console.error('Error al crear servicio:', error);
            throw error;
        }
    },

    /**
     * Actualiza un servicio existente
     * @param {string} id ID del servicio a actualizar
     * @param {Object} servicio Datos actualizados del servicio
     * @returns {Promise<Object>} Servicio actualizado
     */
    actualizarServicio: async (id, servicio) => {
        try {
            // En implementación real: 
            // const response = await axios.put(`${API_URL}/servicios/${id}`, servicio);
            // return response.data;
            
            // Simulamos la actualización de un servicio
            return {
                ...servicio,
                id
            };
        } catch (error) {
            console.error(`Error al actualizar servicio con ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Elimina un servicio
     * @param {string} id ID del servicio a eliminar
     * @returns {Promise<void>}
     */
    eliminarServicio: async (id) => {
        try {
            // En implementación real: 
            // await axios.delete(`${API_URL}/servicios/${id}`);
            
            // Simulamos la eliminación de un servicio
            console.log(`Servicio con ID ${id} eliminado correctamente`);
        } catch (error) {
            console.error(`Error al eliminar servicio con ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Actualiza el estado de un servicio
     * @param {string} id ID del servicio
     * @param {string} estado Nuevo estado
     * @returns {Promise<Object>} Servicio actualizado
     */
    actualizarEstadoServicio: async (id, estado) => {
        try {
            // En implementación real: 
            // const response = await axios.patch(`${API_URL}/servicios/${id}/estado`, { estado });
            // return response.data;
            
            // Simulamos la actualización del estado
            return {
                id,
                estado
            };
        } catch (error) {
            console.error(`Error al actualizar estado del servicio con ID ${id}:`, error);
            throw error;
        }
    }
};

export default serviciosApi;
