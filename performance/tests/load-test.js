import http from 'k6/http';
import { check, sleep } from 'k6';
import { getTestOptions } from '../config/config-test-options.js';
import { urls, getTestData } from '../data/data-test.js';
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
        'status is 201': (r) => r.status === 201,
        'response time is less than 350ms': (r) => r.timings.duration < 350,
    });

    sleep(1);
}

export function handleSummary(data) {
    const date = new Date().toISOString().split('T')[0];
    return {
        [`performance/reports/load-summary-${date}.html`]: htmlReport(data),
        [`performance/reports/load-summary-${date}.txt`]: textSummary(data),
    };
}