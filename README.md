# SauceDemo Playwright Capstone Project

## Overview

This project is an End-to-End (E2E) Automation Testing Framework developed using Playwright with JavaScript. The application under test is SauceDemo (https://www.saucedemo.com).

The framework follows the Page Object Model (POM) design pattern and includes automated test scenarios for Login, Product Validation, Cart Operations, Checkout functionality, API Mocking, Accessibility, Edge Cases, Mobile, Security, and Visual Testing.

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
│   ├── accessibility.spec.js
│   ├── api.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   ├── edgeCases.spec.js
│   ├── hooks.spec.js
│   ├── login.spec.js
│   ├── mobile.spec.js
│   ├── productDetail.spec.js
│   ├── products.spec.js
│   ├── security.spec.js
│   └── visualSmoke.spec.js
│
├── src
│   └── pages
│       ├── CartPage.js
│       ├── CheckoutPage.js
│       ├── LoginPage.js
│       ├── ProductDetailPage.js
│       └── ProductPage.js
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
* Username Required Validation
* Password Required Validation
* Empty Login Fields Validation

### Product Module

* Verify Product List Availability
* Validate Product Count
* Product Detail Verification
* Validate Product Description
* Validate Product Price
* Validate Product Image
* Add Product to Cart from Detail Page

### Cart Module

* Add Product to Cart
* Add Multiple Products to Cart
* Remove Product from Cart
* Cart Badge Updates Correctly
* Verify Cart Item Count
* Verify Cart Item Details
* Update Quantity Simulation
* Verify Continue Shopping Button
* Verify Checkout Button Visible
* Verify Product Price in Cart
* Verify Subtotal Calculation

### Checkout Module

* Checkout With Empty Cart
* Empty Checkout Form Validation
* Missing Last Name Validation
* Missing Postal Code Validation
* Successful Checkout
* Verify Order Confirmation Content
* Verify Checkout Overview Page
* Verify Shipping Information Exists
* Verify Payment Information Exists
* Verify Total Amount Is Displayed
* Cancel Checkout Flow

### API Mocking Tests

* Mock Inventory Page Response
* Mock API Response With JSON
* Validate Response Status Code
* Mock Login Failure Response
* Intercept Network Request
* Intercept Network Response
* Block Image Requests
* Modify Response Using Route Fulfill

### Accessibility Tests

* Login Button Should Have Accessible Text
* Login Inputs Should Be Visible
* Product Names Should Be Readable
* All Product Images Should Have Alt Text
* Cart Link Should Be Accessible
* Navigation Menu Should Be Accessible
* Error Message Should Be Visible To User
* Checkout Inputs Should Be Accessible
* Buttons Should Be Visible
* Page Should Have Title

### Edge Cases Tests

* Network Failure Simulation
* Problem User Login
* Error User Login
* Visual User Login
* Performance Glitch User Login
* Direct Inventory Access Without Login
* Browser Refresh On Inventory Page
* Browser Back Navigation
* Multiple Refreshes Stability Check
* Slow Loading Page Measurement
* Flaky Test Example With Retry

### Mobile Tests

* Login Page - iPhone 13
* Login With Mobile Viewport
* Inventory Page Mobile Layout
* Cart Page Mobile Layout
* Checkout Page Mobile Layout
* Hamburger Menu Visible On Mobile
* Mobile Orientation Portrait
* Mobile Orientation Landscape

### Security Tests

* SQL Injection Attempt
* XSS Attempt in Username Field
* XSS Attempt in Password Field
* Session Handling After Logout
* Password Encryption (if applicable)
* Brute Force Protection (if applicable)
* Data Privacy Validation

### Visual Smoke Tests

* Smoke Test for Login Page
* Smoke Test for Inventory Page
* Smoke Test for Cart Page
* Smoke Test for Checkout Page
* Smoke Test for Confirmation Page

### Visual Regression Tests (if implemented)

* Compare screenshots against baseline

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

Run tests for a specific project (e.g., Chrome only):

```bash
npx playwright test --project=chromium
```

Run tests for Firefox:

```bash
npx playwright test --project=firefox
```

---

## Reporting

Generate HTML Report:

```bash
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

* API Testing (expansion)
* Accessibility Testing (expansion)
* Visual Regression Testing
* Cross Browser Testing (expansion)
* Mobile Viewport Testing (expansion)
* Data Driven Testing
* Parallel Execution Optimization
* Performance Testing
* BDD Integration (Cucumber)
* Dockerization
* Test Environment Management
* Notification on Test Completion (Slack/Email)