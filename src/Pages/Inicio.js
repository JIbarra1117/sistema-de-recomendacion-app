import React, { useEffect, useRef, useState } from "react";
import { PiSneakerFill, PiSneakerMoveLight } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import ContenidoInicio from "../components/Contenido_Inicio";
import ContenidoRecomendaciones from "./Recomendaciones";
import { obtenerNumnerosCalzadosPorMarcas } from "../api/calzado-deportivo";
import {
  obtenerListaProductos,
  obtenerEstadoPaginaInicio,
} from "../utils/localDataUtil";
import { listaIconos } from "../utils/formatUtil";
import MensajeScrapy from "../components/messages/ScrapyMessage";
import ActiveSliderSkeleton from "../components/skeletons/ActiveSliderSkeleton";
import { useNavigate } from "react-router-dom";

const Inicio = ({ estadoInicial }) => {
  const [paginaSeleccionada, setPaginaSeleccionada] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("Nike");
  const [localStorageProductos, setLocalStorageProductos] = useState([]);
  const [links_images] = useState(listaIconos);
  const [renderKey, setRenderKey] = useState(0);
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const contenedorRef = useRef(null);
  const [productosLoading, setProductosLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  const handlePrductosLoading = (data) => {
    setProductosLoading(data);
  };
  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };
  const cerrarSidebarExterior = (event) => {
    if (
      sidebarAbierto &&
      contenedorRef.current &&
      !contenedorRef.current.contains(event.target)
    ) {
      setSidebarAbierto(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", cerrarSidebarExterior);
    return () => {
      document.removeEventListener("mousedown", cerrarSidebarExterior);
    };
  }, [sidebarAbierto]);

  // Declaracion de lista paginas y navegar
  const listaPaginas = ["Marcas registradas", "Recomendaciones"];
  useEffect(() => {
    // Obtener el estado que ya ingreso a la pagina desde aqui
    if (obtenerEstadoPaginaInicio()==false ) {
      navigate("/");
    }
    // navigate("/");
    obtenerNumnerosCalzadosPorMarcas().then((data) => {
      if (Array.isArray(data)) {
        setMarcas(data);
      } else {
        console.error("La respuesta de marcas no es un array:", data);
      }
    });
  }, []);

  // Metodos para dise;o
  const obtener_img = (marca) => {
    const linkEncontrado =
      links_images &&
      links_images.find(
        (obj) => obj.marca.toLowerCase() === marca.toLowerCase()
      );
    return linkEncontrado ? linkEncontrado.links : "";
  };

  const handle_actualizarMarca = (marca) => {
    setMarcaSeleccionada(marca);
    // Incrementar el renderKey para forzar la reinicialización de los componentes
    setRenderKey((prevKey) => prevKey + 1);
  };

  const handle_paginaSeleccionada = (pagina) => {
    if (pagina === "Recomendaciones") {
      setLocalStorageProductos(obtenerListaProductos);
    }
    console.log(paginaSeleccionada);
    setPaginaSeleccionada(pagina);
  };
  return (
    <div>
      <div className="relative z-50">
        <button
          data-drawer-target="separator-sidebar"
          data-drawer-toggle="separator-sidebar"
          aria-controls="separator-sidebar"
          type="button"
          onClick={toggleSidebar} /*  */
          className={`${
            sidebarAbierto ? "hidden" : ""
          } fixed z-50 top-5 items-center p-2 mt-2 ms-3 text-sm text-white rounded-lg  lg:hidden hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200  `}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <aside
          ref={contenedorRef}
          // className="fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0"
          className={`fixed top-0 left-0 z-40 w-80 h-screen transition-transform ${
            sidebarAbierto ? " translate-x-0 " : " -translate-x-full "
          }  lg:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto backdrop-blur-sm bg-blue-700/40 select-none shadow-2xl">
            <p
              className="flex cursor-pointer items-center ps-2 mb-5"
              onClick={() => {
                setPaginaSeleccionada("");
              }}
            >
              <PiSneakerMoveLight className="w-20 h-20 text-white" />
              <span className="self-center text-2xl font-extrabold whitespace-nowrap text-white">
                UTAMMENDER
              </span>
            </p>
            <ul className="cursor-pointer space-y-2 font-medium">
              <li>
                <a
                  className="flex items-center p-2  rounded-lg text-white  hover:bg-blue-700 group"
                  onClick={() => {
                    handle_paginaSeleccionada("Recomendaciones");
                  }}
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap font-extrabold">
                    Recomendaciones
                  </span>
                </a>
              </li>
              <li>
                <details
                  className="group [&_summary::-webkit-details-marker]:hidden"
                  onClick={toggleDetails}
                >
                  <summary
                    className="flex cursor-pointer items-center w-full p-2 text-base transition duration-75 rounded-lg group text-white hover:bg-blue-700"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                  >
                    <PiSneakerFill className="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white " />
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap font-extrabold">
                      Marcas registradas
                    </span>
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>
                  {/* <ul className="mt-1 space-y-1 px-1 transition animate-fade-up animate-ease-in-out group-open:animate-fade-down group-open:animate-ease-in-out"> */}
                  <ul className={`mt-1 space-y-1 px-1`}>
                    <div className="grid grid-cols-2 items-center">
                      {marcas.map((marca) => (
                        <div key={marca.marca}>
                          <button
                            type="button"
                            className="text-black-900 border focus:ring-4 focus:outline-none transition hover:scale-110 hover:shadow-xl focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-black-600 bg-blue-800 border-blue-700 text-white hover:bg-blue-700 me-2 mb-2"
                            onClick={() => {
                              // console.log("Valor de marca:", marca);
                              marca && handle_actualizarMarca(marca.marca);
                              handle_paginaSeleccionada("Marcas registradas");
                            }}
                          >
                            <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                              <div>{obtener_img(marca.marca)}</div>
                              <div>{marca.marca}</div>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </aside>
        {/* Contenido del sidebar */}
        <div key={renderKey} className="p-4 lg:ml-80">
          <MensajeScrapy />
          {paginaSeleccionada !== "" ? (
            listaPaginas.indexOf(paginaSeleccionada) === 0 ? (
              <>
                <ContenidoInicio
                  marca={marcaSeleccionada}
                  icono={obtener_img(marcaSeleccionada)}
                  onProductosLoading={handlePrductosLoading}
                />
                {productosLoading ? <ActiveSliderSkeleton /> : ""}
              </>
            ) : listaPaginas.indexOf(paginaSeleccionada) === 1 ? (
              localStorageProductos.length > 0 ? (
                <ContenidoRecomendaciones />
              ) : (
                <>
                  <div
                    key={paginaSeleccionada}
                    className="animate-fade-left animate-normal"
                  >
                    <div className="h-36"></div>
                    <div className="flex grid-cols-3 place-items-center animate-bounce animate-infinite">
                      <div className="col-span-1">
                        <IoIosArrowBack size={100} color="white" />
                      </div>
                      <div className="col-span-2 ring-gray-300">
                        <div className=" rounded-xl">
                          <span className="text-white text-2xl">
                            Selecciona primero los calzados que más te gusten,
                            para brindarte recomendaciones personalizadas
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            ) : (
              "No hay pagina seleccionada"
            )
          ) : (
            <>
              <section className="bg-white rounded-xl animate-fade-down animate-once">
                <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                  <div className="mx-auto max-w-6xl text-center">
                    <h2 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-black md:text-5xl lg:text-6xl lg:max-w-7xl">
                      !Sistema de recomendación para calzado deportivo
                      UTAMMENDER!
                    </h2>

                    <p className="mt-4 text-gray-500 sm:text-xl">
                      Una plataforma innovadora diseñada para ofrecer una
                      experiencia única a los usuarios en su búsqueda del
                      calzado deportivo ideal. Esta aplicación extrae
                      información diariamente de diversas marcas de calzado
                      deportivo y, basándose en las preferencias del usuario,
                      proporciona recomendaciones personalizadas. Al elegir los
                      calzados que más le gusten, la aplicación utiliza datos
                      actualizados para ofrecer sugerencias adaptadas a su
                      estilo y necesidades. Descubre la combinación perfecta de
                      comodidad y estilo con solo unos clics gracias a esta
                      herramienta intuitiva y eficiente!
                    </p>
                  </div>
                </div>
                <section className="w-full bg-white rounded-lg">
                  <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
                    <div className="flex w-full mx-auto text-left">
                      <div className="relative inline-flex items-center mx-auto align-middle">
                        <div className="pb-12 text-center">
                          <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-black md:text-4xl lg:text-5xl lg:max-w-7xl">
                            Se recomiendan las mejores marcas de calzado
                            deportivo
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-7 items-center">
                        {listaIconos.map((data) => (
                          <div
                            className="w-full text-neutral-600 text-center hover:text-black cursor-pointer"
                            key={data.marca}
                            onClick={() => {
                              // console.log("Valor de marca:", marca);
                              data.marca && handle_actualizarMarca(data.marca);
                              handle_paginaSeleccionada("Marcas registradas");
                            }}
                          >
                            {data.links != "" && data.links
                              ? data.links
                              : data.marca}
                            {/* <svg  className="w-auto h-auto"><path d="M4 17.004a.5.5 0 0 1-.466-.319l-3.5-9a.5.5 0 1 1 .932-.362L4 15.125l3.034-7.802a.5.5 0 0 1 .466-.319h16a.5.5 0 0 1 0 1H7.842l-3.376 8.681a.5.5 0 0 1-.466.319z"/><path d="M11.5 17.004a.5.5 0 0 1-.474-.342L9.5 12.085l-1.526 4.577a.5.5 0 1 1-.948-.316l2-6c.136-.408.812-.408.948 0l2 6a.5.5 0 0 1-.474.658z"/><path d="M10.693 15.004H8.192a.5.5 0 0 1 0-1h2.501a.5.5 0 0 1 0 1zm6.807 2a.499.499 0 0 1-.416-.223L14 12.156v4.349a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .916-.278L17 14.853v-4.349a.5.5 0 0 1 1 0v6a.5.5 0 0 1-.5.5zm4.5 0h-1c-1.103 0-2-.897-2-2a.5.5 0 0 1 1 0c0 .551.449 1 1 1h1c.551 0 1-.449 1-1s-.449-1-1-1h-1c-1.103 0-2-.897-2-2s.897-2 2-2h1c1.103 0 2 .897 2 2a.5.5 0 0 1-1 0c0-.551-.449-1-1-1h-1c-.551 0-1 .449-1 1s.449 1 1 1h1c1.103 0 2 .897 2 2s-.897 2-2 2z"/></svg> */}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </>
          )}

          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
