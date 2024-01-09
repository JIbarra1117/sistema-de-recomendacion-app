// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const MensajeScrapy = () => {
//   // const [ultimoProceso, setUltimoProceso] = useState(null);
//   const [mensajeScrapy, setMensajeScrapy] = useState(null);
//   const [mostrarMensaje, setMostrarMensaje] = useState(false); // es false desde el inicio tambin este set esta comentado en el socket y en el settime importante cambiar despues

//   useEffect(() => {
//     const socket = io("http://193.203.164.171:5000?Key-Cliente=React", {
//       transports: ["websocket"],
//       query: {
//         debug: true,
//       },
//     });

//     socket.on("scrapy_message", (data) => {
//       console.log("Mensaje recibido desde Flask:", data.message);
//       setMensajeScrapy(data.message);
//       setMostrarMensaje(true);
//     });

//     // return () => {
//     //   if (socket.connected) {
//     //     socket.disconnect();
//     //   }
//     // };
//   }, []);

//   const handleCerrarAviso=()=>{
//     setMostrarMensaje(false)
//   };

//   return (
// <div>
//   {mostrarMensaje ? (
//     <div className="h-12">
//       {mostrarMensaje ? (
//         <div>
//           <div
//             id="sticky-banner"
//             tabIndex="-1"
//             className={`fixed top-0 z-50 flex justify-between h-15 p-4 border-b rounded-xl backdrop-blur-lg ${
//               mostrarMensaje
//                 ? " animate-flip-down animate-ease-in-out animate-normal"
//                 : " animate-flip-down animate-ease-in-out animate-reverse"
//             } ${
//               mensajeScrapy
//                 ? mensajeScrapy.estado === "iniciado"
//                   ? " bg-gray-600 "
//                   : mensajeScrapy.estado === "completado"
//                   ? " bg-gray-600 "
//                   : mensajeScrapy.estado === "extrayendo"
//                   ? " bg-gray-600 "
//                   : " "
//                 : " "
//             }`}
//           >
//             <div className="flex items-center mx-auto">
//               <span>HEY!!</span>
//               <span className="w-2"> </span>
//               <p className="flex items-center text-sm font-normal text-gray-50">
//                 <span className="inline-flex p-1 me-3 bg-gray-200 rounded-full   w-6 h-6 items-center justify-center flex-shrink-0">
//                   <svg
//                     className="w-3 h-3 text-black "
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     viewBox="0 0 18 19"
//                   >
//                     <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
//                   </svg>
//                   <span className="sr-only">Light bulb</span>
//                 </span>
//                 <span>
//                   {mensajeScrapy
//                     ? mensajeScrapy.estado === "iniciado"
//                       ? "En este momento está iniciando la actualización de datos."
//                       : mensajeScrapy.estado === "completado"
//                       ? "En este momento ha completado la actualización de datos."
//                       : mensajeScrapy.estado === "extrayendo"
//                       ? "En este momento se están obteniendo nuevos calzados deportivos."
//                       : "No hay estado de scrapy"
//                     : "No hay mensaje"}
//                   {mensajeScrapy ? mensajeScrapy.porcentaje : ""}
//                 </span>
//               </p>
//             </div>
//             <div className="flex items-center">
//               <button
//                 onClick={handleCerrarAviso}
//                 data-dismiss-target="#sticky-banner"
//                 type="button"
//                 className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1"
//               >
//                 <svg
//                   className="w-3 h-3"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 14 14"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                   />
//                 </svg>
//                 <span className="sr-only">Close banner</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div
//           id="sticky-banner"
//           tabIndex="-1"
//           className={`fixed z-50 flex justify-between w-full h-15 p-4 border-b rounded-xl  bg-gray-50 ${
//             mostrarMensaje
//               ? " animate-flip-down animate-ease-in-out animate-normal"
//               : " animate-flip-down animate-ease-in-out animate-reverse"
//           }`}
//         >
//           <div className="flex items-center mx-auto">
//             <span>HEY!!</span>
//             <span className="w-2"> </span>
//             <p className="flex items-center text-sm font-normal text-gray-50">
//               <span className="inline-flex p-1 me-3 bg-gray-200 rounded-full w-6 h-6 items-center justify-center flex-shrink-0">
//                 <svg
//                   className="w-3 h-3 text-gray-50"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 18 19"
//                 >
//                   <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
//                 </svg>
//                 <span className="sr-only">Light bulb</span>
//               </span>
//               <span>Prueba de mensaje scrapy</span>
//             </p>
//           </div>
//           <div className="flex items-center">
//             <button
//               data-dismiss-target="#sticky-banner"
//               type="button"
//               className={`flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5`}
//             >
//               <svg
//                 className="w-3 h-3"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 14 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                 />
//               </svg>
//               <span className="sr-only">Close banner</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   ) : (
//     ""
//   )}
// </div>
//   );
// };

// export default MensajeScrapy;

//   // const [ultimoProceso, setUltimoProceso] = useState(null);
//   const [mensajeScrapy, setMensajeScrapy] = useState(null);
//   const [mostrarMensaje, setMostrarMensaje] = useState(false); // es false desde el inicio tambin este set esta comentado en el socket y en el settime importante cambiar despues

//   useEffect(() => {
//     const socket = io("http://193.203.164.171:5000?Key-Cliente=React", {
//       transports: ["websocket"],
//       query: {
//         debug: true,
//       },
//     });

//     socket.on("scrapy_message", (data) => {
//       console.log("Mensaje recibido desde Flask:", data.message);
//       setMensajeScrapy(data.message);
//       setMostrarMensaje(true);
//     });

//     // return () => {
//     //   if (socket.connected) {
//     //     socket.disconnect();
//     //   }
//     // };
//   }, []);

//   const handleCerrarAviso=()=>{
//     setMostrarMensaje(false)
//   };

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const MensajeScrapy = () => {
  const [mensajeScrapy, setMensajeScrapy] = useState(null);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    const socket = io("http://193.203.164.171:5000?Key-Cliente=React", {
      transports: ["websocket"],
      query: {
        debug: true,
      },
    });

    socket.on("scrapy_message", (data) => {
      console.log("Mensaje recibido desde Flask:", data.message);
      setMensajeScrapy(data.message);
      setMostrarMensaje(true);
    });

    // Limpia la conexión al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCerrarAviso = () => {
    setMostrarMensaje(false);
  };

  const bannerClasses = `fixed top-0 z-50 flex justify-between h-15 p-4 border-b rounded-xl backdrop-blur-lg animate-flip-down animate-ease-in-out ${
    mostrarMensaje ? "animate-normal" : "animate-reverse"
  } ${mensajeScrapy ? `bg-gray-600` : ""}`;

  return (
    <div>
      {mostrarMensaje ? (
        <div className="h-12">
          {mostrarMensaje ? (
            <div>
              <div
                id="sticky-banner"
                tabIndex="-1"
                className={`fixed top-0 z-50 flex justify-between h-15 p-4 border-b rounded-xl backdrop-blur-lg ${
                  mostrarMensaje
                    ? " animate-flip-down animate-ease-in-out animate-normal"
                    : " animate-flip-down animate-ease-in-out animate-reverse"
                } ${
                  mensajeScrapy
                    ? mensajeScrapy.estado === "iniciado"
                      ? " bg-gray-600 "
                      : mensajeScrapy.estado === "completado"
                      ? " bg-gray-600 "
                      : mensajeScrapy.estado === "extrayendo"
                      ? " bg-gray-600 "
                      : " "
                    : " "
                }`}
              >
                <div className="flex items-center mx-auto">
                  <span>HEY!!</span>
                  <span className="w-2"> </span>
                  <p className="flex items-center text-sm font-normal text-gray-50">
                    <span className="inline-flex p-1 me-3 bg-gray-200 rounded-full   w-6 h-6 items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-black "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 19"
                      >
                        <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                      </svg>
                      <span className="sr-only">Light bulb</span>
                    </span>
                    <span>
                      {mensajeScrapy
                        ? mensajeScrapy.estado === "iniciado"
                          ? "En este momento está iniciando la actualización de datos."
                          : mensajeScrapy.estado === "completado"
                          ? "En este momento ha completado la actualización de datos."
                          : mensajeScrapy.estado === "extrayendo"
                          ? "En este momento se están obteniendo nuevos calzados deportivos."
                          : "No hay estado de scrapy"
                        : "No hay mensaje"}
                      {mensajeScrapy ? mensajeScrapy.porcentaje : ""}
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={handleCerrarAviso}
                    data-dismiss-target="#sticky-banner"
                    type="button"
                    className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close banner</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              id="sticky-banner"
              tabIndex="-1"
              className={`fixed z-50 flex justify-between w-full h-15 p-4 border-b rounded-xl  bg-gray-50 ${
                mostrarMensaje
                  ? " animate-flip-down animate-ease-in-out animate-normal"
                  : " animate-flip-down animate-ease-in-out animate-reverse"
              }`}
            >
              <div className="flex items-center mx-auto">
                <span>HEY!!</span>
                <span className="w-2"> </span>
                <p className="flex items-center text-sm font-normal text-gray-50">
                  <span className="inline-flex p-1 me-3 bg-gray-200 rounded-full w-6 h-6 items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-gray-50"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 19"
                    >
                      <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                    </svg>
                    <span className="sr-only">Light bulb</span>
                  </span>
                  <span>Prueba de mensaje scrapy</span>
                </p>
              </div>
              <div className="flex items-center">
                <button
                  data-dismiss-target="#sticky-banner"
                  type="button"
                  className={`flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5`}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close banner</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default MensajeScrapy;
