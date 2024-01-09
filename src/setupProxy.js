const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://localhost:3031',  // Cambia la URL según la dirección de tu servidor
      changeOrigin: true,
      ws: true,
      logLevel: 'debug', // Agrega esta línea para obtener información de depuración en la consola
    })
  );
};
