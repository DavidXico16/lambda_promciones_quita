const datosQuitaHadler = require('./handlers/datosQuitaHandler');
const detallesQuitaHandler = require('./handlers/detalleQuitaHandler');
const quitaCondicionesHandler = require('./handlers/quitaCondicionesHandler');
const detalleQuitaCondiciones = require('./handlers/detalleQuitaCondicionesHandler');
const planesQuitaHandler = require('./handlers/planesQuitaHandler');
const detallePlamesQuitaHandler = require('./handlers/detallePlanesQuitaHandler');
const segmentacionQuitaHandler = require('./handlers/segmentacionQuitaHandler');
const detalleSegmentacionQuitaHandler = require('./handlers/detalleSegmentacionQuitaHandler');
const inconvivenciasQuitaHandler = require('./handlers/inconvivenciasQuitaHandler');
const detalleInconvivenciasQuitaHandler = require('./handlers/detalleInconvicenciasQuita');

const ROUTES = [
  { path: '/datosQuita', handler: datosQuitaHadler },
  { path: '/detalleQuita', handler: detallesQuitaHandler },
  { path: '/quitaCondiciones', handler: quitaCondicionesHandler },
  { path: '/detalleCondicionesQuita', handler: detalleQuitaCondiciones },
  { path: '/datosPlanesQuita', handler: planesQuitaHandler },
  { path: '/detallePlanesQuita', handler: detallePlamesQuitaHandler },
  { path: '/segmentacionQuita', handler: segmentacionQuitaHandler },
  { path: '/detalleSegmentacionQuita', handler: detalleSegmentacionQuitaHandler },
  { path: '/inconvivenciasQuita', handler: inconvivenciasQuitaHandler },
  { path: '/detalleInconvivenciasQuita', handler: detalleInconvivenciasQuitaHandler },
];

exports.handler = async (event) => {
  console.log('Event received:', JSON.stringify(event, null, 2));

  const path = event.path || '';
  const method = event.httpMethod;
  const route = ROUTES.find(r => path.includes(r.path));

  if (route && method === 'POST') {
    return await route.handler.handler(event);
  }

  return {
    statusCode: 404,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token'
    },
    body: JSON.stringify({
      error: 'Ruta no encontrada',
      path,
      method
    })
  };
};
