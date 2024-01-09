import axios from 'axios';

const URI = "http://193.203.164.171:5000/calzado_deportivo"

const obtenerProductosPorMarca = async (marca) => {
    try {
        // Realizar la solicitud a la API
        // axios.get(`http://localhost:3031/calzado_deportivo/productos_por_marca?marca=${marca}`)
        const response = await axios.get(URI + `/productos_por_marca?marca=${marca}`);
        return response
    } catch (error) {
        console.error('Error al obtener productos por marca:', error);
        return null
    }
};
const obtenerProductosNuevosPorMarca = async (marca) => {
    try {
        // Realizar la solicitud a la API
        const response = await axios.get(URI + `/productos_nuevos_por_marca?marca=${marca}`);
        return response
    } catch (error) {
        console.error('Error al obtener productos nuevos por marca:', error);
        return null
    }
};

const obtenerMejoresProductosPorMarca = async (marca) => {
    try {
        // Realizar la solicitud a la API
        const response = await axios.get(URI + `/mejores_productos_por_marca?marca=${marca}`);
        return response
    } catch (error) {
        console.error('Error al obtener mejores productos por marca:', error);
        return null
    }
};

const obtenerNumnerosCalzadosPorMarcas = async () => {
    try {
        // Realizar la solicitud a la API
        const response = await axios.get(URI + `/numero_calzados_por_marca`);
        return response.data
    } catch (error) {
        console.error('Error al obtener numeros de productos por marca:', error);
        return null
    }
};

const obtenerCantidadProductos = async () => {
    try {
        // Realizar la solicitud a la API
        const response = await axios.get(URI + `/total_calzados`);
        return response.data
    } catch (error) {
        console.error('Error al obtener mejores productos por marca:', error);
        return null
    }
};

export {obtenerProductosPorMarca,obtenerProductosNuevosPorMarca,obtenerMejoresProductosPorMarca,obtenerCantidadProductos,obtenerNumnerosCalzadosPorMarcas}