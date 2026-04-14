import http from 'k6/http';
import { check, sleep } from 'k6';
import { getTestOptions } from '../config/config-test-options.js';
import { testUrls } from '../data/data-test.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = getTestOptions('smoke');

export default function () {
  const url = testUrls.k6_test;
  const res = http.get(url);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is < 250ms': (r) => r.timings.duration < 250,
  });

  sleep(1);
}

export function handleSummary(data) {
  const date = new Date().toISOString().split('T')[0];
  const reportName = `smoke-test-report-${date}.html`;
  const summaryName = `smoke-test-summary-${date}.txt`;

  return {
    [`copilot-qa-k6/performance/reports/${reportName}`]: htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
    [`copilot-qa-k6/performance/reports/${summaryName}`]: textSummary(data, { indent: " ", enableColors: false }),
  };
}
