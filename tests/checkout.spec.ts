import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import users from '../fixtures/users.json';
import { parsePrice } from '../utils/helpers';

test.describe('Checkout Flow', () => {

  test('complete full purchase with valid details', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    // Add item and go to cart
    await inventory.addItem(0);
    await inventory.goToCart();

    // Checkout step 1
    await cart.checkout();
    await checkout.fill('John', 'Doe', '12345');

    // Checkout step 2 - finish
    await checkout.finish();

    // Assert confirmation
    const confirmation: Locator = checkout.confirm();
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toHaveText(/THANK YOU FOR YOUR ORDER/i);
  });

  test('checkout blocked when required fields are missing', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    await inventory.addItem(0);
    await inventory.goToCart();
    await cart.checkout();

    // Missing last name
    await checkout.fill('John', '', '12345');

    // Assert error appears
    const lastNameError: Locator = page.locator('[data-test="error"]');
    await expect(lastNameError).toBeVisible();
    await expect(lastNameError).toHaveText(/last name is required/i);
  });

  test('verify order summary is mathematically correct', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    // Add multiple items and go to cart
    await inventory.addItems([0, 1]);
    await inventory.goToCart();
    await cart.checkout();
    await checkout.fill('John', 'Doe', '12345');

    // Assert totals
    const itemPricesText = await inventory.prices().allTextContents();
    const itemPrices = itemPricesText.map(p => parseFloat(p.replace('$', '')));
    const expectedItemTotal = itemPrices.reduce((a, b) => a + b, 0);

    const itemTotalText = await page.locator('.summary_subtotal_label').textContent();
    const taxText = await page.locator('.summary_tax_label').textContent();
    const totalText = await page.locator('.summary_total_label').textContent();

    const tax = parseFloat((taxText || '').replace('Tax: $', ''));
    const total = parseFloat((totalText || '').replace('Total: $', ''));

    await expect(expectedItemTotal + tax).toBeCloseTo(total, 2);
  });

  test('verify confirmation screen content after successful order', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    await inventory.addItem(0);
    await inventory.goToCart();
    await cart.checkout();
    await checkout.fill('John', 'Doe', '12345');
    await checkout.finish();

    const confirmation: Locator = checkout.confirm();
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toHaveText(/THANK YOU FOR YOUR ORDER/i);
  });
});