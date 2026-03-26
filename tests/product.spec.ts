
import { test,expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { parsePrice } from '../utils/helpers';
import { verifySortedAscending } from '../utils/assertions';
import { BaseLocators } from '../locators/Baselocators';
import users from '../fixtures/users.json';

test.describe('Product Catalog', () => {

  test('product listing loads correctly', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const locators = new BaseLocators(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    const items = inventory.items();
    await expect(items).toHaveCount(6);

    const names = await page.locator('.inventory_item_name').allTextContents();
    const prices = await inventory.prices().allTextContents();

    expect(names.length).toBe(6);
    expect(prices.length).toBe(6);

    names.forEach(name => expect(name.trim().length).toBeGreaterThan(0));
    prices.map(parsePrice).forEach(price => expect(price).toBeGreaterThan(0));
  });

  test('name sorting A to Z', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    await inventory.sort('az');

    const names = await page.locator('.inventory_item_name').allTextContents();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(sorted);
  });

  test('name sorting Z to A', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    await inventory.sort('za');

    const names = await page.locator('.inventory_item_name').allTextContents();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));

    expect(names).toEqual(sorted);
  });

  test('price sorting low to high', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    await inventory.sort('lohi');

    const prices = await inventory.prices().allTextContents();
    const nums = prices.map(parsePrice);

    verifySortedAscending(nums);
  });

  test('price sorting high to low', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    await inventory.sort('hilo');

    const prices = await inventory.prices().allTextContents();
    const nums = prices.map(parsePrice);

    const sorted = [...nums].sort((a, b) => b - a);
    expect(nums).toEqual(sorted);
  });

  test('problem_user image should match product', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(users.problem.username, users.problem.password);

    const items = await inventory.items().all();

    const srcList: string[] = [];

    for (const item of items) {
      const name = await item.locator('.inventory_item_name').textContent();
      const imgSrc = await item.locator('img').getAttribute('src');

      expect(name).toBeTruthy();
      expect(imgSrc).toBeTruthy();

      srcList.push(imgSrc!);
    }

    const uniqueImages = new Set(srcList);

    // If all images same → bug
    expect(uniqueImages.size).toBeGreaterThan(1);
  });
});