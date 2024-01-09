import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "./Product_Card";
import { obtenerSiProductoEsMarcado } from "../utils/localDataUtil";

const ActiveSlider = ({ productos, titulo }) => {
  const [validarRoll, setValidarScroll] = useState(true);

  useEffect(() => {
    // console.log(productos);
    if (productos && productos.length < 4) {
      setValidarScroll(false);
    }
  }, [productos]);

  const PrevArrow = ({ onClick }) => (
    <button
      className="absolute z-50 top-1/2 left-0 transform -translate-y-1/2 text-2xl text-white bg-gray-800 rounded-full p-2 focus:outline-none"
      onClick={onClick}
    >
      {"<"}
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      className="absolute z-50 top-1/2 right-0 transform -translate-y-1/2 text-2xl text-white bg-gray-800 rounded-full p-2 focus:outline-none"
      onClick={onClick}
    >
      {">"}
    </button>
  );

  const settings = {
    dots: true,
    infinite: validarRoll,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    cssEase: "linear",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1535,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 895,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          dots: false,
        },
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          dots: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          rows: 2,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="max-w mx-auto select-none">
      <div className="grid grid-cols-1 rounded overflow-hidden text-white ">
        <div className="p-1 sm:p-2 md:p-4 lg:p-6">
          <h1 className="flex items-center text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-white">
            {titulo}
            {productos ? (
              <span className="text-2xl font-semibold me-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ms-2">
                {productos.length}
              </span>
            ) : (
              ""
            )}
          </h1>
        </div>
        <div className="mb-2 p-2 px-2">
          {productos ? (
            <Slider
              {...settings}
              className="animate-fade animate-ease-in-out rounded-lg"
            >
              {productos ? (
                productos.map((item) => (
                  <div className="max-w-sm w-full p-5">
                    <ProductCard
                      producto={item}
                      estado={obtenerSiProductoEsMarcado(item._id)}
                      key={item.id}
                    ></ProductCard>
                  </div>
                ))
              ) : (
                <>
                  <div
                    className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Aviso</span>
                  </div>
                </>
              )}
            </Slider>
          ) : (
            <div
              className="flex  items-center p-1  text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">
                  NO HUBO {titulo.toUpperCase()}
                </span>
              </div>
            </div>
            // Renderizar algo cuando productos es undefined
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveSlider;
