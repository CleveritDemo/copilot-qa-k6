import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '60s', target: 20 }, // 60 seconds duration with a target of 20 users
        { duration: '180s', target: 20 }, // 180 seconds duration maintaining 20 users
        { duration: '30s', target: 0 }, // 30 seconds duration reducing to 0 users
    ],
};

export default function () {
    const res = http.get('https://test-api.k6.io');
    check(res, {
        'status is 200': (r) => r.status === 200, // validate response code 200
        'response time is less than 250ms': (r) => r.timings.duration < 250, // response time less than 250ms
    });
    sleep(1); // 1-second wait after the request
};