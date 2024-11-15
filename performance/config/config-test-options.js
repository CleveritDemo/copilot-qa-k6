// performance/config/config-test-options.js

export const smokeTestOptions = {
    vus: 1, // 1 usuario
    duration: '10s', // duración de 10 segundos
    thresholds: {
        http_req_duration: ['p(95)<2000'], // el 95% de las solicitudes deben completarse en menos de 2s
    },
};

export const loadTestOptions = {
    stages: [
        { duration: '60s', target: 10 }, // 60 segundos de duración con un objetivo de 10 usuarios
        { duration: '120s', target: 10 }, // 120 segundos de duración manteniendo 10 usuarios
        { duration: '60s', target: 0 }, // 60 segundos de duración reduciendo a 0 usuarios
    ],
};

export const stressTestOptions = {
    stages: [
        { duration: '60s', target: 20 }, // 60 segundos de duración con un objetivo de 20 usuarios
        { duration: '180s', target: 20 }, // 180 segundos de duración manteniendo 20 usuarios
        { duration: '30s', target: 0 }, // 30 segundos de duración reduciendo a 0 usuarios
    ],
};

export const spikeTestOptions = {
    stages: [
        { duration: '60s', target: 20 }, // 60 segundos de duración con un objetivo de 20 usuarios
        { duration: '30s', target: 0 }, // 30 segundos de duración reduciendo a 0 usuarios
        { duration: '60s', target: 20 }, // 60 segundos de duración manteniendo 20 usuarios
        { duration: '30s', target: 0 }, // 30 segundos de duración reduciendo a 0 usuarios
        { duration: '60s', target: 20 }, // 60 segundos de duración manteniendo 20 usuarios
        { duration: '30s', target: 0 }, // 30 segundos de duración reduciendo a 0 usuarios
    ],
};

export function getTestOptions(testType) {
    switch (testType) {
        case 'smoke':
            return smokeTestOptions;
        case 'load':
            return loadTestOptions;
        case 'stress':
            return stressTestOptions;
        case 'spike':
            return spikeTestOptions;
        default:
            throw new Error(`Unknown test type: ${testType}`);
    }
}