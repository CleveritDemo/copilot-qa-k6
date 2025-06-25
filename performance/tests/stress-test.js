import http from 'k6/http';
import { check, sleep } from 'k6';
import { getTestOptions } from '../config/config-test-options.js';
import { urls } from '../data/data-test.js';

export const options = getTestOptions('stress');

export default function () {
    const res = http.get(urls.stressTestUrl);
    check(res, {
        'status is 200': (r) => r.status === 200, // validate response code 200
        'response time is less than 250ms': (r) => r.timings.duration < 250, // response time less than 250ms
    });
    sleep(1); // 1-second wait after the request
}