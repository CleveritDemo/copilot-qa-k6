# Performance Testing Project with k6

This project is designed to demonstrate performance testing capabilities using k6. It includes various test scenarios to evaluate the performance of a web application under different conditions.

## Project Structure

```
copilot-qa-k6
├── performance
│   ├── config
│   │   └── options.json         # Configuration options for performance tests
│   ├── data
│   │   └── test-data.json       # Test data used during performance tests
│   ├── reports                   # Directory for storing test reports
│   ├── tests
│   │   ├── load-test.js         # Script for load testing the application
│   │   ├── stress-test.js       # Script for stress testing the application
│   │   ├── soak-test.js         # Script for soak testing the application
│   │   └── spike-test.js        # Script for spike testing the application
└── README.md                     # Project documentation
```

## Setup Instructions

1. **Install k6**: Follow the installation instructions on the [k6 website](https://k6.io/docs/getting-started/installation) to set up k6 on your machine.

2. **Configuration**: Update the `performance/config/options.json` file with the desired test parameters, such as test duration and number of virtual users.

3. **Test Data**: Populate the `performance/data/test-data.json` file with any necessary test data, including user credentials and API endpoints.

4. **Running Tests**: Execute the test scripts located in the `performance/tests` directory using the k6 command line. For example:
   ```
   k6 run performance/tests/load-test.js
   ```

5. **Reports**: After running the tests, check the `performance/reports` directory for generated reports that provide insights into the performance metrics collected during the tests.

## Test Scenarios

- **Load Testing**: Evaluates the application's performance under expected load conditions.
- **Stress Testing**: Determines the application's breaking point by gradually increasing the load.
- **Soak Testing**: Assesses the application's performance over an extended period under sustained load.
- **Spike Testing**: Tests the application's response to sudden increases in load.

## Conclusion

This project serves as a comprehensive framework for conducting performance tests using k6, providing valuable insights into the application's performance characteristics under various scenarios.