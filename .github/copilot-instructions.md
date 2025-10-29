# Copilot Instructions

This is a repository that will be used to demonstrate GitHub Copilot capabilities. The instructions below will help guide Copilot to generate relevant code snippets and suggestions.

The repository will contain a project that uses grafana K6 as tool to build multiple performance test scenarios for a web app.

## Scope

1. Create a k6 testing framework from scratch.
2. Build 4 different performance test scenarios:
   - Load Testing
   - Stress Testing
   - Soak Testing
   - Spike Testing
3. We will build a data file containing the test options to be used in different test scenarios.
4. We will build an execution command for each test.
5. We will generate reports for each test scenario.

## Instructions for Copilot

- Always use best practices for k6 performance testing.
- Provide clear and concise explanations.
- When user asks for markdown files, provide them with proper formatting and escape characters if needed.
- Avoid suggest code with syntax errors.

## Project Structure

- `performance/`: Main directory for performance tests.
    - `data`: Directory for test data files.
    - `tests`: Directory for different test scenarios.
    - `config`: Directory for configuration files.
    - `reports`: Directory for storing test reports.

Note: Project files will be created later by user or by Copilot based on user requests.