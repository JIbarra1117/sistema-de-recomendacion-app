// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import ParticlesBackground from './components/config/ParticlesBackground';
import Inicio_fecha from './Pages/Inicio_ValidarFecha';

const App = () => {
  return (
    <Router>
      <ParticlesBackground/>
      <Routes>
        <Route path="/" element={<Inicio_fecha />} />
        <Route path="/home" element={<Inicio />} />
      </Routes>
    </Router>
  );
};

export default App;