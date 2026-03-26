import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

 async goto() {
  await this.page.goto(process.env.BASE_URL || 'https://www.saucedemo.com');
}

  // Input
  async enterText(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  // Click
  async click(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  // Wait for visible
  async waitForVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  // Get text
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent()) || '';
  }

  // Select dropdown
  async selectOption(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }

  // Get count
  async getCount(locator: Locator): Promise<number> {
    await locator.first().waitFor({ state: 'visible' });
    return await locator.count();
  }

  // Screenshot (on failure usage)
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `reports/screenshots/${name}.png` });
  }

  // Safe click (handles flakiness)
  async safeClick(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  // Wait for URL
  async waitForURL(urlPart: string | RegExp) {
    await expect(this.page).toHaveURL(urlPart);
  }
}