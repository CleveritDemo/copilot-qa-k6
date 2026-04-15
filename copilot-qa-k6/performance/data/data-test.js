import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

/**
 * Constante que agrupa las URLs utilizadas en el proyecto.
 */
export const BASE_URLS = {
  K6_TEST: 'https://test.k6.io',
  K6_API: 'https://test-api.k6.io',
  JSON_PLACEHOLDER: 'https://jsonplaceholder.typicode.com/posts/'
};

/**
 * Genera datos dinámicos para el cuerpo de las solicitudes (body) 
 * basados en el caso de prueba.
 * 
 * @param {string} testType - El tipo de test para personalizar el body.
 * @returns {object} - Objeto con los datos del request.
 */
export function getTestData(testType) {
  return {
    userId: Math.floor(Math.random() * 100) + 1,
    title: `${testType.toUpperCase()} - Post title ${uuidv4().substring(0, 8)}`,
    body: `Cuerpo del post generado para la prueba de tipo ${testType} usando uuid: ${uuidv4()}`
  };
}
