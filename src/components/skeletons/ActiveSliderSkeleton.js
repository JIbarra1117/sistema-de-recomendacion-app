import React from "react";
import Slider from "react-slick";

const ActiveSliderSkeleton = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1410,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 895,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const card = (
    <div className="w-50 p-4 mx-auto  rounded shadow animate-pulse md:p-6 dark:border-gray-700 lg:w-80 lg:h-auto">
      <div className="flex items-center justify-center h-32 mb-4 bg-gray-300 rounded dark:bg-gray-700">
        {/* ... Contenido del ícono */}
      </div>

      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      <div className="flex items-center mt-4">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        {/* ... Contenido del ícono y texto */}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );

  const listCards = [card, card, card, card];

  return (
    <>
      <div className="p-5 mb-4 rounded backdrop-blur-sm shadow-2xl max-w mx-auto select-none">
        <div className="max-w mx-auto select-none gap-3">
          <div className="h-120">
            <div className="p-6">
              <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
                Cargando...
              </h1>
            </div>
            <div className="mb-2 p-2">
              <Slider {...settings}>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="h-15"></div>
      <div className="p-5 mb-4 rounded backdrop-blur-sm shadow-2xl max-w mx-auto select-none">
        <div className="max-w mx-auto select-none gap-3">
          <div className="h-120">
            <div className="p-6">
              <h1 className="flex items-center text-5xl font-extrabold dark:text-white">
                Cargando...
              </h1>
            </div>
            <div className="mb-2 p-2">
              <Slider {...settings}>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
                <div>{card}</div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveSliderSkeleton;
