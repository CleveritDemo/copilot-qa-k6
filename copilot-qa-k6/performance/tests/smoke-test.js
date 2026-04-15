import http from 'k6/http';
import { check, sleep } from 'k6';
import { getTestOptions } from '../config/config-test-options.js';
import { BASE_URLS } from '../data/data-test.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = getTestOptions('smoke');

export function handleSummary(data) {
  const date = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const reportName = `performance/reports/smoke-test_${date}.html`;
  return {
    [reportName]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

export default function () {
  const url = BASE_URLS.K6_TEST;
  const res = http.get(url);

  // 5. Validamos el código de respuesta sea 200
  // 6. El tiempo de respuesta inferior a 250ms (como check individual)
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 250ms': (r) => r.timings.duration < 250,
  });

  sleep(1);
}
