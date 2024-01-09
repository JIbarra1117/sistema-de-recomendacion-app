import axios from "axios";

const URI = "http://193.203.164.171:5000/recomendacion";

const obtenerRecomendacionPorId = async (ids) => {
  try {
    const idsParametros = ids.map((id) => `ids=${id}`).join("&");
    const response = await axios.get(
      `${URI}/recomendacionesByIds?${idsParametros}`
    );

    const productosAgrupados = response.data.reduce((agrupados, producto) => {
      const marca = producto.marca;

      if (!agrupados[marca]) {
        agrupados[marca] = { marca: marca, productos: [] };
      }

      agrupados[marca].productos.push(producto);

      return agrupados;
    }, {});

    return productosAgrupados;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado diferente de 2xx
      console.error(
        "Error en la respuesta del servidor:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // La solicitud fue realizada pero no se recibió una respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      // Ocurrió un error durante la configuración de la solicitud
      console.error(
        "Error durante la configuración de la solicitud:",
        error.message
      );
    }
    return null;
  }
};

export { obtenerRecomendacionPorId };
