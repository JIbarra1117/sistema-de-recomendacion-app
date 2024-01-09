import React, { useState, useEffect } from "react";
import ProductCard from "../components/Product_Card";
import { obtenerRecomendacionPorId } from "../api/recomendaciones";

const ContenidoRecomendaciones = () => {
  const [productoAgrupado, setProductoAgrupado] = useState([]);
  useEffect(() => {
    const productosGuardados =
      JSON.parse(localStorage.getItem("productosSeleccionados")) || [];

    // Obtener productos recomendados agrupados
    obtenerRecomendacionPorId(productosGuardados).then((data) => {
      setProductoAgrupado(data);
    });
  }, []);

  // Comprobar datos agrupados
  useEffect(() => {
    if (productoAgrupado) {
      console.log("Datos agrupados");
      console.log(productoAgrupado);
    }
  }, [productoAgrupado]);

  return (
    <div>
      <div className="flex flex-row justify-center space-y-0">
        <div className="inline-flex cursor-default justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white ">
          <p className="text-4xl lg:text-8xl text-white">
            Esto es recomendado para ti
          </p>
        </div>
      </div>
      <div className="space-y-1 select-none">
        {productoAgrupado &&
          Object.values(productoAgrupado).map((marcaAgrupada) => (
            <>
              <details className="group [&_summary::-webkit-details-marker]:hidden bg-blue-700/10">
                <summary
                  key={marcaAgrupada.marca}
                  className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg backdrop-blur-md hover:shadow-2xl hover:backdrop-blur-xl p-4 text-gray-900 "
                >
                  <h2 className="text-2xl font-extrabold text-white">
                    {marcaAgrupada.marca}
                    {marcaAgrupada.productos ? (
                      <span className="text-2xl font-semibold me-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ms-2">
                        {marcaAgrupada.productos.length}
                      </span>
                    ) : (
                      ""
                    )}
                  </h2>
                  <svg
                    className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 animate-fade animate-ease-in-out">
                  {marcaAgrupada.productos.map((producto) => (
                    // <div className="flex items-center justify-center w-max h-max">
                    // <ProductCard producto={producto} key={producto._id} />
                    // </div>
                    <div
                      key={producto._id}
                      className="flex items-center justify-center"
                    >
                      <div className="max-w-sm w-full">
                        <ProductCard producto={producto} key={producto._id} />
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </>
          ))}
      </div>
    </div>
  );
};

export default ContenidoRecomendaciones;
