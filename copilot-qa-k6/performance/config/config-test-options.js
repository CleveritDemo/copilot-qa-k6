export function getTestOptions(testType) {
  const options = {
    smoke: {
      vus: 1,
      duration: '60s',
      thresholds: {
        http_req_duration: ['p(95)<2000'],
      },
    },
    load: {
      stages: [
        { duration: '60s', target: 10 },
        { duration: '120s', target: 10 },
        { duration: '60s', target: 0 },
      ],
      thresholds: {
        http_req_duration: ['p(97)<2000'],
      },
    },
    stress: {
      stages: [
        { duration: '60s', target: 20 },
        { duration: '180s', target: 20 },
        { duration: '30s', target: 0 },
      ],
      thresholds: {
        http_req_duration: ['p(95)<500'],
      },
    },
    spike: {
      stages: [
        { duration: '60s', target: 20 },
        { duration: '30s', target: 0 },
        { duration: '60s', target: 20 },
        { duration: '30s', target: 0 },
        { duration: '60s', target: 20 },
        { duration: '30s', target: 0 },
      ],
    },
  };

  return options[testType] || options.smoke;
}
