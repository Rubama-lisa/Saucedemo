import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage'
import users from '../fixtures/users.json';

test.describe('Performance & Resilience', () => {

  test('performance_glitch_user login succeeds despite delay', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();

    // Login with slow user
    await login.login(users.performance.username, users.performance.password);

    // Wait for inventory page to load instead of sleep
    await expect(page).toHaveURL(/inventory/);
    await expect(inventory.items()).toHaveCount(6);
  });

  test('remove from cart does not work for error_user', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(users.error.username, users.error.password);

    // Add first item
    await inventory.addItem(0);

    // Verify cart badge updated
    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('1');

    // Click again (expected bug: remove does not work)
    await inventory.addItem(0);

    // Expected failure: badge should be 0, but it stays 1
    await expect(badge).toHaveText('0');
  });

  test('checkout button does not navigate for error_user', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login(users.error.username, users.error.password);

    await inventory.addItem(0);
    await inventory.goToCart();

    // Step 1: Checkout
    await cart.checkout();

    // Fill checkout step 1
    await checkout.fill('John', 'Doe', '12345');

    // Ensure step 2 URL
    await checkout.waitForURL(/checkout-step-two/);

    // Finish order
    await checkout.finish();

    // Expected bug: still on step 2
    await checkout.waitForURL(/checkout-complete/);

    const confirmation = checkout.confirm();
    await checkout.confirm();
  });

  test('last name field does not work in checkout for error_user', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login(users.error.username, users.error.password);

    await inventory.addItem(0);
    await inventory.goToCart();
    await cart.checkout();

   // Fill checkout step 1
    await checkout.fill('John', 'Doe', '12345');

    // Validate last name did NOT register (error user bug)
    const lastNameValue = await checkout.lastName.inputValue();
    expect(lastNameValue).toBe(''); // field remains empty
  });
});