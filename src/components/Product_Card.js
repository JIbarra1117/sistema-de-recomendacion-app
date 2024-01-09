import React, { useEffect, useState } from "react";
import { truncarTexto } from "../utils/formatUtil";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarRating from "./estrellas_calificacion";
import { FaHeartBroken } from "react-icons/fa";
import { deviceDetection } from "../utils/localDataUtil";

const ProductCard = ({ producto, estado }) => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [corazonVisible, setCorazonVisible] = useState(false);
  const [corazonRotoVisible, setCorazonRotoVisible] = useState(false);
  const [bordeMarcado, setBordeMarcado] = useState(false);

  useEffect(() => {
    setBordeMarcado(estado);
  }, []);

  const handleDispositivoDetectadoParaClickear = (idProducto) => {
    const device = deviceDetection(navigator);
    switch (device) {
      case "Celular":
        insertarProducto(idProducto);
        break;

      case "Tablet":
        insertarProducto(idProducto);
        break;

      default:
        break;
    }
  };

  if (producto.descripcion !== undefined) {
    producto.descripcion = producto.descripcion
      ? truncarTexto(producto.descripcion)
      : "";
  }

  const insertarProducto = (id) => {
    // Obtener productos almacenados en localStorage
    const productosGuardados =
      JSON.parse(localStorage.getItem("productosSeleccionados")) || [];

    // Verificar si el producto ya está en la lista
    if (!productosGuardados.includes(id)) {
      setCorazonRotoVisible(false);
      console.log("Data ingresada");
      // Añadir el nuevo producto al array
      const nuevosProductos = [...productosGuardados, id];

      // Actualizar el estado y localStorage
      setProductosSeleccionados(nuevosProductos);
      localStorage.setItem(
        "productosSeleccionados",
        JSON.stringify(nuevosProductos)
      );
      console.log(nuevosProductos);
      setCorazonVisible(true);
      setTimeout(() => setCorazonVisible(false), 1000); // Ocultar el corazón después de 1 segundo
    } else {
      setCorazonVisible(false);
      // Avisar que se eliminó
      console.log("Data eliminada");
      const nuevosProductos = productosGuardados.filter(
        (idArray) => idArray !== id
      );
      console.log(nuevosProductos);

      // Actualizar el estado y localStorage
      setProductosSeleccionados(nuevosProductos);
      // Eliminar del array el producto
      localStorage.setItem(
        "productosSeleccionados",
        JSON.stringify(nuevosProductos)
      );
      setCorazonRotoVisible(true);
      setTimeout(() => setCorazonRotoVisible(false), 1000); // Ocultar el corazón roto después de 1 segundo
      setBordeMarcado(false);
    }
  };

  return (
    <div className='rounded-lg w-auto h-full' key={producto._id}>
      <div
        className={`  bg-opacity-0 rounded-lg  ${
          productosSeleccionados.includes(producto._id) || bordeMarcado
            ? "border-red-500 border-4 shadow-lg"
            : "shadow-2xl "
        } shadow bg-white-800  transition transform hover:scale-105 duration-300 cursor-pointer relative`}
        onDoubleClick={() => insertarProducto(producto._id)}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        onClick={()=>{handleDispositivoDetectadoParaClickear(producto._id)}} // Aqui se establece logica para detectar el dispositiivo donde se conexta e implementar el click
      >
        <a key={producto._id}>
          <img
            className="w-full h-auto object-cover rounded-t-lg"
            src={producto.imagenes[0]}
            alt="imagen del producto"
          />
        </a>
        <div className="px-2 pb-2 pt-2 lg:px-5 lg:pb-5 lg:pt-6">
          <h2 className="text-sm lg:text-xl font-semibold tracking-tight text-white">
            {producto.modelo}
          </h2>
          <h2 className="text-xs lg:text-lg font-semibold tracking-tight text-white">
            Color: {producto.color}
          </h2>
          <div className="flex items-center mt-1.5 mb-1.5">
            {producto.calificacion === -1 ? (
              <span className="text-xs lg:text-lg px-2 rounded bg-green-800 text-white">
                <p>Nuevo</p>
              </span>
            ) : (
              <>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <StarRating calificacion={producto.calificacion}></StarRating>
                </div>
                <span className="bg-blue-100 text-xs lg:text-xl font-semibold px-1.5 lg:px-2.5 lg:py-0.5 rounded bg-blue- text-blue-800 ms-3">
                  <p>{producto.calificacion}</p>
                </span>
              </>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm lg:text-4xl font-bold text-white">
              ${producto.precio}
            </span>
            <a
              href={producto.url_calzado}
              className="text-xs lg:text-lg text-white bg-black-700  focus:ring-4 focus:outline-none font-medium rounded-lg px-2 py-1.5 text-center bg-black hover:bg-gray-700 focus:ring-blue-800"
            >
              Ir al sitio
            </a>
          </div>
          {corazonVisible && (
            <div className="absolute top-2 right-2 text-red-500 z-50">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 2.78-3.4 5.75-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          )}
          {corazonRotoVisible && (
            <div className="absolute top-2 right-2 text-red-500 z-50">
              <FaHeartBroken className="w-6 h-6 fill-current" />
            </div>
          )}
          {tooltipVisible &&
            (producto.descripcion === "" ? (
              ""
            ) : (
              <div className="absolute top-0 left-0 p-2 bg-gray-800 text-white text-xs lg:text-sm rounded-lg opacity-90">
                {producto.descripcion}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
