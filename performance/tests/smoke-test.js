import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1, // 1 user
    duration: '60s', // 60 seconds duration
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% of requests must complete in less than 2s
    },
};

export default function () {
    const res = http.get('https://test.k6.io');
    check(res, {
        'status is 200': (r) => r.status === 200, // validate response code 200
        'response time is less than 250ms': (r) => r.timings.duration < 250, // response time less than 250ms
    });
    sleep(1);
}