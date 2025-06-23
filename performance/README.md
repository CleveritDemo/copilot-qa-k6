# Performance Testing Project

This project is designed for performance testing using k6. It provides a structured approach to organize test configurations, data, reports, and test scripts.

## Project Structure

- **config/**: This folder contains configuration files for test options, including k6 script settings and environment variables.
  
- **data/**: This folder holds data files used in the performance tests, such as CSV or JSON files that provide input data.

- **reports/**: This folder is designated for storing generated reports from the performance tests, including summary reports and detailed logs.

- **tests/**: This folder contains the actual test scripts written for k6, defining the performance tests to be executed.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the `performance` directory.
3. Install k6 if you haven't already. You can find installation instructions on the [k6 website](https://k6.io/docs/getting-started/installation).
4. Configure your test options in the `config` folder.
5. Place any necessary data files in the `data` folder.
6. Write your test scripts in the `tests` folder.
7. Run your tests using the k6 command line tool, specifying the appropriate script from the `tests` folder.

## Usage Guidelines

- Ensure that all configuration files are properly set up before running tests.
- Review the generated reports in the `reports` folder after test execution to analyze performance metrics.
- Modify test scripts as needed to cover different scenarios and performance requirements.