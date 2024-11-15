import http from 'k6/http';
import { check, sleep } from 'k6';
import { getTestOptions } from '../config/config-test-options.js';
import { urls } from '../data/data-test.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = getTestOptions('smoke');

export default function () {
    const res = http.get(urls.smokeTestUrl);
    check(res, {
        'status is 200': (r) => r.status === 200, // validamos el código de respuesta 200
        'response time is less than 250ms': (r) => r.timings.duration < 250, // tiempo de respuesta inferior a 250ms
    });
    sleep(1);
}

export function handleSummary(data) {
    return {
        'performance/reports/smoke-summary.html': htmlReport(data),
        'performance/reports/smoke-summary.txt': textSummary(data),
    };
}