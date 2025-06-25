import http from 'k6/http';
import { check, sleep } from 'k6';
import { getTestOptions } from '../config/config-test-options.js';
import { urls, getTestData } from '../data/data-test.js';

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
        'status is 201': (r) => r.status === 201, // validate response code 201
        'response time is less than 350ms': (r) => r.timings.duration < 350, // response time less than 350ms
    });

    sleep(1); // 1-second wait after the request
}