
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from '../fixtures/users.json';

test.describe('Authentication', () => {
  
  test('valid login', async ({ page }) => {
    const l = new LoginPage(page);

    await l.goto();
    await l.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('login fails with wrong password', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(users.standard.username, 'wrong_password');
    await expect(await login.error()).toContain('Username and password do not match');
  });

  test('login fails with wrong username', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('wrong_user', users.standard.password);

    await expect(await login.error()).toContain('Username and password do not match');
  });

  test('login fails with empty username & password', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('', '');

    await expect(await login.error()).toContain('Username is required');
  });

  test('login fails with empty password only', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(users.standard.username, '');

    await expect(await login.error()).toContain('Password is required');
  });

  test('login fails with SQL injection attempt', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    const maliciousInput = "' OR 1=1 --";

    await login.login(maliciousInput, 'random_password');
    const errorMessage = await login.error();

    await expect(errorMessage).toBeTruthy();
    await expect(errorMessage).toContain('do not match');
    await expect(page).not.toHaveURL(/inventory/);
  });

  test('locked user', async ({ page }) => {
    const l = new LoginPage(page);
    await l.goto();
    await l.login(users.locked.username, users.locked.password);
    expect(await l.error()).toContain('locked');
  });
});