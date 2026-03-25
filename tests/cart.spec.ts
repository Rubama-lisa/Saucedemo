import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import users from '../fixtures/users.json';

test.describe('Shopping Cart', () => {

  test('add single item and verify cart badge updates', async ({ page }) => {
    const l = new LoginPage(page);
    const i = new InventoryPage(page);

    await l.goto();
    await l.login(users.standard.username, users.standard.password);

    await i.add(0);

    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
  });

  test('add multiple items and verify all appear in cart', async ({ page }) => {
    const l = new LoginPage(page);
    const i = new InventoryPage(page);
    const c = new CartPage(page);

    await l.goto();
    await l.login(users.standard.username, users.standard.password);

    await i.add(0);
    await i.add(1);
    await i.add(2);

    await i.cart();

    const items = c.items();
    await expect(items).toHaveCount(3);
  });

  test('remove item from cart and verify cart updates', async ({ page }) => {
    const l = new LoginPage(page);
    const i = new InventoryPage(page);
    const c = new CartPage(page);

    await l.goto();
    await l.login(users.standard.username, users.standard.password);

    await i.add(0);
    await i.add(1);

    await i.cart();

    // Remove first item
    await c.removeFirstItem();
    const items = c.items();
    await expect(items).toHaveCount(1);
  });
});
