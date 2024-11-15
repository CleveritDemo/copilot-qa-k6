import http from 'k6/http';
import { check, sleep } from 'k6';
import { getTestOptions } from '../config/config-test-options.js';
import { getTestData, urls } from '../data/data-test.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = getTestOptions('load');

export default function () {
    const payload = getTestData();

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(urls.loadTestUrl, payload, params);

    check(res, {
        'status is 201': (r) => r.status === 201, // validamos el código de respuesta 201
        'response time is less than 350ms': (r) => r.timings.duration < 350, // tiempo de respuesta inferior a 350ms
    });

    sleep(1); // tiempo de espera de 1 segundo después de la solicitud
}

export function handleSummary(data) {
    return {
        'performance/reports/load-summary.html': htmlReport(data),
        'performance/reports/load-summary.txt': textSummary(data),
    };
}