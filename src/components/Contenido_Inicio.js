import React, { useState, useEffect } from "react";
import ActiveSlider from "./Carrusel";
import PaginacionProductos from "./PaginacionProductos";
import {
  obtenerMejoresProductosPorMarca,
  obtenerProductosPorMarca,
  obtenerProductosNuevosPorMarca,
} from "../api/calzado-deportivo";

const ContenidoInicio = ({ marca, icono, onProductosLoading }) => {
  // const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const [productos, setProductos] = useState([]);
  const [productosNuevos, setProductosNuevos] = useState([]);
  const [mejoresProductos, setMejoresProductos] = useState([]);

  const handleLoadingProducto = (data) => {
    onProductosLoading(data);
  };
  useEffect(() => {
    if (marca) {
      handleLoadingProducto(true);

      Promise.all([
        obtenerProductosPorMarca(marca),
        obtenerProductosNuevosPorMarca(marca),
        obtenerMejoresProductosPorMarca(marca),
      ])
        .then(
          ([
            productosResponse,
            productosNuevosResponse,
            mejoresProductosResponse,
          ]) => {
            setProductos(productosResponse.data);
            setProductosNuevos(productosNuevosResponse.data);
            setMejoresProductos(mejoresProductosResponse.data);

            handleLoadingProducto(false);
          }
        )
        .catch((error) => {
          setProductos([]);
          setProductosNuevos([]);
          setMejoresProductos([]);
          handleLoadingProducto(false);
          console.error("Error al obtener productos por marca:", error);
        });
    }
  }, [marca]);

  useEffect(() => {
    // console.log(productosNuevos)
  }, [productosNuevos]);

  return (
    <div>
      <div class="flex flex-row justify-center space-y-0">
        <div class="inline-flex cursor-default justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg">
          <p className="text-9xl h-auto lg:h-full text-white ">{icono}</p>
        </div>
        <div class="inline-flex cursor-default justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white ">
          <p className="text-4xl lg:text-8xl text-white">{marca}</p>
        </div>
      </div>
      {/*  Grid horizontal de 3 columnas */}

      <div className="animate-fade animate-ease-in-out">
        {productosNuevos.productos !== null &&
        productosNuevos.productos &&
        productosNuevos.productos.length > 0 ? (
          <div className="p-1 mb-4 rounded backdrop-blur-sm shadow-2xl">
            <ActiveSlider
              productos={productosNuevos.productos}
              titulo={"Nuevos productos"}
            />
          </div>
        ) : (
          ""
        )}

        <div className="p-1 mb-4 rounded backdrop-blur-sm shadow-2xl">
          {mejoresProductos !== null &&
          mejoresProductos &&
          mejoresProductos.length > 0 ? (
            <ActiveSlider
              key={mejoresProductos}
              productos={mejoresProductos}
              titulo={"Mejores calificados"}
            />
          ) : (
            <p></p>
          )}
        </div>
        {productos !== null && productos && productos.length > 0 ? (
          <div className="p-1 mb-4 rounded backdrop-blur-sm shadow-2xl">
            <PaginacionProductos key={productos} productos={productos} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ContenidoInicio;
