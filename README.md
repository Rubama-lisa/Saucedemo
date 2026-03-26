# 🧪 SauceDemo Test Automation Framework (Playwright + TypeScript)

## Goal
- Design a maintainable, scalable framework (not just passing tests)
- Apply software engineering principles (SOLID, DRY, separation of concerns)
- Make deliberate architectural decisions and articulate trade-offs
- Integrate with a CI/CD pipeline
- Handle real-world scenarios like flakiness, test data management, and reporting

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
```bash
├── .github/workflows/ # CI pipeline
├── pages/ # Page Objects
├── tests/ # Test specs
├── fixtures/ # Test data (JSON)
├── utils/ # Helpers, assertions, waits
├── playwright.config.ts # Global config
├── .env # Environment variables
```

# 🚀 3. Setup & Run Instructions

## ✅ Prerequisites
- Node.js (v18+)
- npm

---

## 🔧 Step 1: Clone Repository

git clone https://github.com/Rubama-lisa/Saucedemo.git

## Step 2: Install Dependencies
npm install
## Step 3: Install Playwright Browsers
npx playwright install

## 🔧 Step 4: Setup Environment Variables

- Create .env file with 
BASE_URL=https://www.saucedemo.com

- ▶️ Run Tests with command
'npm test'

- 📊 View HTML Report with command 
'npx playwright show-report'
# 🚀 4. 🔁 CI/CD Pipeline: 
Triggers on:
  
Push to main

Pull Request to main

- ✅ Pipeline Features

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

# 🧪 5. Test Coverage Summary
✅ Covered Areas
- 🔐 Authentication
1. Valid login
2. Invalid credentials (wrong password, username)
3. Empty field validation
4. SQL injection attempt
5. Locked user scenario
- 🛍️ Product Catalog
1. Product listing validation (count, names, prices)
2. Sorting:
Name A→Z / Z→A
Price Low→High / High→Low
3. Visual validation for problem_user (image mismatch)
- 🛒 Shopping Cart
1. Add single item (badge validation)
2. Add multiple items
3. Remove item validation
4. Inventory-level remove failure (error_user)
- 💳 Checkout Flow (End-to-End)
. Complete purchase with valid details
2. Required field validation (first name, last name, postal code)
3. Order summary calculation (item total + tax)
4. Confirmation page validation
- ⚡ Performance & Resilience
1. performance_glitch_user → handles slow response using smart waits
2. error_user scenarios:

   Remove not working

   Checkout button failure

   Input field failure (last name)

   Finish button failure
- Excluded
  
Cross-browser matrix

API testing	Scope limited to UI automation

Mobile testing	Not required in assessment
