import http from 'k6/http';
import { check, sleep } from 'k6';
import { getTestOptions } from '../config/config-test-options.js';
import { urls, getTestData } from '../data/data-test.js';

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
        'status is 201': (r) => r.status === 201, // validate response code 201
        'response time is less than 200ms': (r) => r.timings.duration < 200, // response time less than 200ms
    });

    sleep(1); // 1-second wait after the request
}