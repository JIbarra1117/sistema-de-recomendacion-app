import axios from 'axios';

const URI = "http://193.203.164.171:5000/procesoScrapy"

const obtenerUltimoProceso = async () => {
    try {
        // Realizar la solicitud a la API
        const response = await axios.get(URI + '/ultimoProceso');
        return response
    } catch (error) {
        console.error('Error al obtener productos por fecha:', error);
        return null
    }
};

export {obtenerUltimoProceso}