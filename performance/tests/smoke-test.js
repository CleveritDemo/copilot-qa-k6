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
        'status is 200': (r) => r.status === 200,
        'response time is less than 250ms': (r) => r.timings.duration < 250,
    });
    sleep(1);
}

export function handleSummary(data) {
    const date = new Date().toISOString().split('T')[0];
    return {
        [`performance/reports/smoke-summary-${date}.html`]: htmlReport(data),
        [`performance/reports/smoke-summary-${date}.txt`]: textSummary(data),
    };
}