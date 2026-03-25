import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage'
import users from '../fixtures/users.json';

test.describe('Performance & Resilience', () => {

  test('performance_glitch_user login succeeds despite delay', async ({ page }) => {
    const l = new LoginPage(page);
    const i = new InventoryPage(page);

    await l.goto();

    // Login with slow user
    await l.login(users.performance.username, users.performance.password);

    // Smart wait: wait for inventory page instead of sleep
    await expect(page).toHaveURL(/inventory/);

    // Extra validation: products loaded
    await expect(i.items()).toHaveCount(6);
  });

  test('remove from cart does not work for error_user', async ({ page }) => {
    const l = new LoginPage(page);
    const i = new InventoryPage(page);

    await l.goto();
    await l.login(users.error.username, users.error.password);

    // Add item
    await i.add(0);

    // Verify cart badge updated
    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('1');

    // Click remove (same button toggles)
    await i.add(0); // clicking again should act as "Remove"

    // ❌ Expected bug: item is NOT removed
    await expect(badge).toHaveText('0');
  });

  test('checkout button does not navigate for error_user', async ({ page }) => {
    const l = new LoginPage(page);
    const i = new InventoryPage(page);
    const c = new CartPage(page);
    const co = new CheckoutPage(page);

    await l.goto();
    await l.login(users.error.username, users.error.password);

    await i.add(0);
    await i.cart();
    await c.checkout();

    // Fill checkout step 1
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');

    await page.click('#continue');

    // Ensure we are on step 2
    await expect(page).toHaveURL(/checkout-step-two/);

    // Try to finish order
    await co.finish();

    // ❌ Expected bug: still on step 2 (no navigation)
    await expect(page).toHaveURL(/checkout-complete/);

    // ❌ Confirmation message should NOT appear
    const confirmation = page.locator('.complete-header');
    await expect(confirmation).toBeVisible();
  });

  test('last name field does not work in checkout for error_user', async ({ page }) => {
    const l = new LoginPage(page);
    const i = new InventoryPage(page);
    const c = new CartPage(page);

    await l.goto();
    await l.login(users.error.username, users.error.password);

    await i.add(0);
    await i.cart();
    await c.checkout();

    // Fill form
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe'); // ❌ supposed to fail
    await page.fill('#postal-code', '12345');

    // Validate input did NOT register
    const lastNameValue = await page.inputValue('#last-name');
    expect(lastNameValue).not.toBe(''); // ❌ field remains empty
  });


});
