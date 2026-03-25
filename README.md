<<<<<<< HEAD
# Saucedemo
=======

# Senior QA Playwright Framework

## Features
- POM architecture
- Custom utils (helpers, assertions, waits)
- Data-driven testing
- CI integration

## Run
npm install
npx playwright install
npm test
>>>>>>> 7d44043 (initial commit)
# 🧪 SauceDemo Test Automation Framework (Playwright + TypeScript)

![CI](https://github.com/<your-username>/<repo>/actions/workflows/ci.yml/badge.svg)

---

## 📌 Overview

This project demonstrates a **production-grade UI test automation framework** built for the SauceDemo application.  
It focuses on **scalability, maintainability, and real-world test scenarios**, not just passing tests.

---

# ⚙️ 1. Framework Choice & Rationale

## ✅ Selected Stack
- **Playwright**
- **TypeScript**
- **Node.js**

## 💡 Why Playwright?
- Built-in **auto-waiting** → reduces flakiness
- Supports **parallel execution**
- Native **test runner + reporting**
- Handles **modern web apps reliably**
- Faster compared to Selenium-based tools

## 💡 Why TypeScript?
- Strong typing → fewer runtime errors
- Better maintainability for large frameworks
- Improved developer experience

## 🔄 Alternatives Considered

| Tool | Reason Not Selected |
|------|-------------------|
| Selenium | Requires more setup, slower, manual waits |
| Cypress | Limited multi-tab support, less flexible |
| WebdriverIO | More configuration overhead |

---

# 🏗️ 2. Architecture Overview

The framework follows **Page Object Model (POM)** with clear separation of concerns.
├── .github/workflows/ # CI pipeline
├── pages/ # Page Objects
├── tests/ # Test specs
├── fixtures/ # Test data (JSON)
├── utils/ # Helpers, assertions, waits
├── playwright.config.ts # Global config
├── .env # Environment variables

# 🚀 3. Setup & Run Instructions

## ✅ Prerequisites
- Node.js (v18+)
- npm

---

## 🔧 Step 1: Clone Repository

```bash
git clone https://github.com/<your-username>/<repo>.git
cd <repo>

Step 2: Install Dependencies
npm install
Step 3: Install Playwright Browsers
npx playwright install

🔧 Step 4: Setup Environment Variables

Create .env file:

BASE_URL=https://www.saucedemo.com

▶️ Run Tests
npm test

📊 View HTML Report
npx playwright show-report
🔁 4. CI/CD Pipeline

The project uses GitHub Actions.

✅ Pipeline Features
Triggers on:
Push to main
Pull Request to main
Steps:
Install dependencies
Install Playwright browsers
Run all tests
Upload HTML report as artifact
🔍 How to View Pipeline
Go to your GitHub repository
Click the Actions tab
Select the latest workflow run
Review status and logs for each step
📥 How to View Reports
Open a workflow run
Scroll to Artifacts
Download playwright-report
Open index.html in a browser to view test results
🧪 5. Test Coverage Summary
✅ Covered Areas
🔐 Authentication
Valid login
Invalid credentials (wrong password, username)
Empty field validation
SQL injection attempt
Locked user scenario
🛍️ Product Catalog
Product listing validation (count, names, prices)
Sorting:
Name A→Z / Z→A
Price Low→High / High→Low
Visual validation for problem_user (image mismatch)
🛒 Shopping Cart
Add single item (badge validation)
Add multiple items
Remove item validation
Inventory-level remove failure (error_user)
💳 Checkout Flow (End-to-End)
Complete purchase with valid details
Required field validation (first name, last name, postal code)
Order summary calculation (item total + tax)
Confirmation page validation
⚡ Performance & Resilience
performance_glitch_user → handles slow response using smart waits
error_user scenarios:
Remove not working
Checkout button failure
Input field failure (last name)
Finish button failure
❌ Intentionally Excluded
Area	Reason
Cross-browser matrix	Kept minimal for faster CI execution
Visual screenshot diff tools	Used DOM-based validation instead (faster & stable)
API testing	Scope limited to UI automation
Mobile testing	Not required in assessment
