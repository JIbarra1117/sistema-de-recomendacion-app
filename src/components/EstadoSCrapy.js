import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EstadoScrapy = () => {
  const [estadoScrapy, setEstadoScrapy] = useState(null);

  useEffect(() => {
    const obtenerEstadoScrapy = async () => {
      try {
        const response = await axios.get('http://192.168.0.105:3030/scrapy/estado');
        setEstadoScrapy(response.data.estado);
      } catch (error) {
        console.error('Error al obtener el estado de Scrapy:', error);
      }
    };

    obtenerEstadoScrapy();

    // Establece un intervalo para actualizar el estado cada 5 segundos (ajusta según sea necesario)
    const intervalo = setInterval(() => {
      obtenerEstadoScrapy();
    }, 5000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalo);
  }, []); // La dependencia vacía asegura que este efecto solo se ejecute una vez al montar el componente

  return (
    <div>
      <h2>Estado de Scrapy</h2>
      {estadoScrapy !== null ? (
        <p>Estado actual: {estadoScrapy}</p>
      ) : (
        <p>Cargando estado...</p>
      )}
    </div>
  );
};

export default EstadoScrapy;
