import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import users from '../fixtures/users.json';
import { parsePrice } from '../utils/helpers';

test.describe('Checkout Flow', () => {

  test('complete full purchase with valid details', async ({ page }) => {
    const l = new LoginPage(page);
    const i = new InventoryPage(page);
    const c = new CartPage(page);
    const co = new CheckoutPage(page);

    await l.goto();
    await l.login(users.standard.username, users.standard.password);

    await i.add(0);
    await i.cart();
    await c.checkout();

    await co.fill('John', 'Doe', '12345');
    await co.finish();

    await expect(co.confirm()).toContainText('Thank you');
  });

  test('checkout blocked when required fields are missing', async ({ page }) => {
    const l = new LoginPage(page);
    const i = new InventoryPage(page);
    const c = new CartPage(page);

    await l.goto();
    await l.login(users.standard.username, users.standard.password);

    await i.add(0);
    await i.cart();
    await c.checkout();

    // Try to continue without filling form
    await page.click('#continue');

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
  });

  test('verify order summary calculation is correct', async ({ page }) => {
    const l = new LoginPage(page);
    const i = new InventoryPage(page);
    const c = new CartPage(page);
    const co = new CheckoutPage(page);

    await l.goto();
    await l.login(users.standard.username, users.standard.password);

    await i.add(0);
    await i.add(1);

    await i.cart();
    await c.checkout();

    await co.fill('John', 'Doe', '12345');

    // Get item total
    const itemTotalText = await page.locator('.summary_subtotal_label').textContent();
    const taxText = await page.locator('.summary_tax_label').textContent();
    const totalText = await page.locator('.summary_total_label').textContent();

    const itemTotal = parsePrice(itemTotalText!.split('$')[1]);
    const tax = parsePrice(taxText!.split('$')[1]);
    const total = parsePrice(totalText!.split('$')[1]);

    expect(total).toBeCloseTo(itemTotal + tax, 2);
  });

  test('verify confirmation screen after successful order', async ({ page }) => {
    const l = new LoginPage(page);
    const i = new InventoryPage(page);
    const c = new CartPage(page);
    const co = new CheckoutPage(page);

    await l.goto();
    await l.login(users.standard.username, users.standard.password);

    await i.add(0);
    await i.cart();
    await c.checkout();

    await co.fill('John', 'Doe', '12345');
    await co.finish();

    const confirmationHeader = page.locator('.complete-header');
    const confirmationText = page.locator('.complete-text');

    await expect(confirmationHeader).toHaveText('Thank you for your order!');
    await expect(confirmationText).toBeVisible();
  });

});
