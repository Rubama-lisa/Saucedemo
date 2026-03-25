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

