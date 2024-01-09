import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerUltimoProceso } from "../api/scrapy-procesos";
import { obtenerCantidadProductos } from "../api/calzado-deportivo";
import { insertarEstadoPaginaInicio } from "../utils/localDataUtil";

const Inicio_fecha = () => {
  const [fecha, setFecha] = useState("");
  const [ultimoProceso, setUltimoProceso] = useState(null);
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const [modalDatos, setModalDatos] = useState(false);
  const navigate = useNavigate();

  // Ejecucion al iniciar el renderizado del componente
  useEffect(() => {
    // Insertar el estado que ya ingreso a la pagina desde aqui
    insertarEstadoPaginaInicio();
    // Convertir la fecha de cadena a objeto Date
    let fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    // Formatear la fecha como cadena ISO 8601
    // const fechaFormateada = fechaActual.toISOString().split('T')[0];
    setFecha(fechaActual);
    obtenerUltimoProceso().then((data) => {
      setUltimoProceso(data.data);
    }).catch(()=>{
      setUltimoProceso("");
    });
    obtenerCantidadProductos().then((data) => {
      setCantidadProductos(data.total_calzados);
    });
  }, []);

  // Cada que se modifique el valor ultimoProceso ejecutar lo siguiente
  useEffect(() => {
    if (ultimoProceso) {
      let fechaProceso = new Date(ultimoProceso.fecha);
      let fechaActual = new Date(fecha);
      console.log("Fecha mongo: ", fechaProceso);
      console.log("Fecha react: ", fechaActual);
      console.log(
        "Dias de diferencia: ",
        fechaActual.getDay() - fechaProceso.getDay()
      );
      if (
        (ultimoProceso && fechaProceso.getDate() === fechaActual.getDate()) ||
        cantidadProductos > 0
      ) {
        setModalDatos(false);
        // Redirigir a la página /home
        navigate("/home");
      } else {
        setModalDatos(true);
      }
    }
  }, [ultimoProceso, fecha, cantidadProductos, navigate]);

  // Muestra un mensaje mientras se realiza la solicitud
  if (ultimoProceso === null) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{ position: "relative", zIndex: 2 }}>
      {ultimoProceso ? (
        <>
          <p>¡Sí hay datos!</p>
          <div>
            <h1>Último Proceso</h1>
            <p>Estado: {ultimoProceso.estado}</p>
            <p>
              Resultado:{" "}
              {ultimoProceso.resultado
                ? "Aún extrayendo Datos"
                : "Datos extraídos finalizados"}
            </p>
            <p>Fecha: {new Date(ultimoProceso.fecha).toLocaleString()}</p>
          </div>
        </>
      ) : (
        <p>El proceso de Extraccion aun no ha culminado</p>
      )}
    </div>
  );
};

export default Inicio_fecha;
