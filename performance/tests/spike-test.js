import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween, randomString } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export const options = {
    stages: [
        { duration: '60s', target: 20 }, // 60 seconds duration with a target of 20 users
        { duration: '30s', target: 0 },  // 30 seconds duration reducing to 0 users
        { duration: '60s', target: 20 }, // 60 seconds duration maintaining 20 users
        { duration: '30s', target: 0 },  // 30 seconds duration reducing to 0 users
        { duration: '60s', target: 20 }, // 60 seconds duration maintaining 20 users
        { duration: '30s', target: 0 },  // 30 seconds duration reducing to 0 users
    ],
};

export default function () {
    const userId = randomIntBetween(1, 100);
    const title = randomString(10);
    const body = randomString(50);

    const payload = JSON.stringify({
        userId: userId,
        title: title,
        body: body,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post('https://jsonplaceholder.typicode.com/posts', payload, params);

    check(res, {
        'status is 201': (r) => r.status === 201, // validate response code 201
        'response time is less than 200ms': (r) => r.timings.duration < 200, // response time less than 200ms
    });

    sleep(1); // 1-second wait after the request