import http from 'k6/http';
import { check, sleep } from 'k6';
import { getTestOptions } from '../config/config-test-options.js';
import { BASE_URLS, getTestData } from '../data/data-test.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = getTestOptions('load');

export function handleSummary(data) {
  const date = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const reportName = `performance/reports/load-test_${date}.html`;
  return {
    [reportName]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

export default function () {
  const url = BASE_URLS.JSON_PLACEHOLDER;
  
  // Generación de datos dinámicos desde data-test.js
  const data = getTestData('load');
  const payload = JSON.stringify(data);

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  // Validaciones
  check(res, {
    'status is 201': (r) => r.status === 201,
    'response time < 350ms': (r) => r.timings.duration < 350,
  });

  sleep(1);
}
