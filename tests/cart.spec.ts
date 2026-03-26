import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { BaseLocators } from '../locators/Baselocators';
import users from '../fixtures/users.json';

test.describe('Shopping Cart', () => {

  test('add single item and verify cart badge updates', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    await inventory.addItem(0); // add first item

    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
  });

  test('add multiple items and verify all appear in cart', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    await inventory.addItems([0, 1, 2]); // add multiple items
    await inventory.goToCart(); // navigate to cart page

    const items = cart.items();
    await expect(items).toHaveCount(3);
  });

  test('remove item from cart and verify cart updates', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    await inventory.addItems([0, 1]); // add two items
    await inventory.goToCart(); // go to cart page

    await cart.removeFirstItem(); // remove first item
    const items = cart.items();
    await expect(items).toHaveCount(1);
  });
});