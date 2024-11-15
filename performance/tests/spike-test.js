import http from 'k6/http';
import { check, sleep } from 'k6';
import { getTestOptions } from '../config/config-test-options.js';
import { getTestData, urls } from '../data/data-test.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = getTestOptions('spike');

export default function () {
    const payload = getTestData();

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(urls.spikeTestUrl, payload, params);

    check(res, {
        'status is 201': (r) => r.status === 201, // validamos el código de respuesta 201
        'response time is less than 200ms': (r) => r.timings.duration < 200, // tiempo de respuesta inferior a 200ms
    });

    sleep(1); // tiempo de espera de 1 segundo después de la solicitud
}

export function handleSummary(data) {
    return {
        'performance/reports/spike-summary.html': htmlReport(data),
        'performance/reports/spike-summary.txt': textSummary(data),
    };
}