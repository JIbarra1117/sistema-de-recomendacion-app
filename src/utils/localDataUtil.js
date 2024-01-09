function obtenerListaProductos() {
  return JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
}

function obtenerSiProductoEsMarcado(id) {
  const data = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
  return data.includes(id);
}

function obtenerEstadoPaginaInicio() {
  const data = JSON.parse(localStorage.getItem("estadoPaginaInicial")) || false;
  return data;
}

function insertarEstadoPaginaInicio() {
  localStorage.setItem("estadoPaginaInicial", true);
}

function deviceDetection(navigator) {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(
    userAgent
  );
  const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(
    userAgent
  );

  if (isMobile) {
    return "Celular";
  } else if (isTablet) {
    return "Tablet";
  } else {
    return "Escritorio";
  }
}

export {
  obtenerListaProductos,
  obtenerSiProductoEsMarcado,
  deviceDetection,
  obtenerEstadoPaginaInicio,
  insertarEstadoPaginaInicio,
};
