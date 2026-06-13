# SauceDemo Playwright Capstone Project

## Overview

This project is an End-to-End (E2E) Automation Testing Framework developed using Playwright with JavaScript. The application under test is SauceDemo (https://www.saucedemo.com).

The framework follows the Page Object Model (POM) design pattern and includes automated test scenarios for Login, Product Validation, Cart Operations, and Checkout functionality.

---

## Tech Stack

* Playwright
* JavaScript
* Node.js
* GitHub Actions (CI/CD)
* HTML Reports

---

## Project Structure

```text
saucedemo-capstone
│
├── tests
│   ├── login.spec.js
│   ├── products.spec.js
│   ├── cart.spec.js
│   └── checkout.spec.js
│
├── src
│   └── pages
│       ├── LoginPage.js
│       ├── ProductPage.js
│       ├── CartPage.js
│       └── CheckoutPage.js
│
├── playwright.config.js
├── package.json
├── README.md
│
└── .github
    └── workflows
        └── playwright.yml
```

---

## Test Scenarios Covered

### Login Module

* Valid Login
* Invalid Login
* Locked Out User Login
* Error Message Validation

### Product Module

* Verify Product List Availability
* Validate Product Count
* Product Detail Verification

### Cart Module

* Add Product to Cart
* Remove Product from Cart
* Cart Validation

### Checkout Module

* Successful Checkout Flow
* Checkout Information Validation
* Order Confirmation Validation

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd saucedemo-capstone
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.js
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

---

## Reporting

Generate HTML Report:

```bash
npx playwright test
npx playwright show-report
```

Artifacts generated on failure:

* Screenshots
* Videos
* Traces

---

## CI/CD Integration

GitHub Actions is configured to execute Playwright tests automatically on:

* Push
* Pull Request

Workflow file location:

```text
.github/workflows/playwright.yml
```

---

## Page Object Model (POM)

The framework follows the Page Object Model design pattern to improve:

* Maintainability
* Reusability
* Scalability
* Readability

Page classes are stored under:

```text
src/pages
```

---

## Author

Ankit Kumar

Capstone Project – Playwright Automation Framework

---

## Future Enhancements

* API Testing
* Accessibility Testing
* Visual Regression Testing
* Cross Browser Testing
* Mobile Viewport Testing
* Data Driven Testing
* Parallel Execution Optimization

```
```
