/**
 * Función que retorna las opciones de configuración de k6 (stages, thresholds, etc.)
 * según el tipo de prueba especificado.
 * 
 * @param {string} testType - El tipo de prueba ('smoke', 'load', 'stress', 'spike').
 * @returns {object} - Objeto de opciones de k6.
 */
export function getTestOptions(testType) {
  switch (testType) {
    case 'smoke':
      return {
        vus: 1,
        duration: '60s',
        thresholds: {
          http_req_duration: ['p(95)<2000'],
        },
      };

    case 'load':
      return {
        stages: [
          { duration: '60s', target: 10 },
          { duration: '120s', target: 10 },
          { duration: '60s', target: 0 },
        ],
        thresholds: {
          http_req_duration: ['p(97)<2000'],
        },
      };

    case 'stress':
      return {
        stages: [
          { duration: '60s', target: 20 },
          { duration: '180s', target: 20 },
          { duration: '30s', target: 0 },
        ],
        thresholds: {
          http_req_duration: ['p(95)<250'],
        },
      };

    case 'spike':
      return {
        stages: [
          { duration: '60s', target: 20 },
          { duration: '30s', target: 0 },
          { duration: '60s', target: 20 },
          { duration: '30s', target: 0 },
          { duration: '60s', target: 20 },
          { duration: '30s', target: 0 },
        ],
        thresholds: {
          http_req_duration: ['p(95)<200'],
        },
      };

    default:
      throw new Error(`Tipo de test desconocido: ${testType}`);
  }
}
