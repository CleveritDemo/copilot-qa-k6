import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween, randomString } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export const options = {
    stages: [
        { duration: '60s', target: 10 }, // 60 seconds duration with a target of 10 users
        { duration: '120s', target: 10 }, // 120 seconds duration maintaining 10 users
        { duration: '60s', target: 0 }, // 60 seconds duration reducing to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(97)<2000'], // 97% of requests must complete in less than 2s
    },
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
        'response time is less than 350ms': (r) => r.timings.duration < 350, // response time less than 350ms
    });

    sleep(1); // 1-second wait after the request
}