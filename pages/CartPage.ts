
import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}
  items(){ return this.page.locator('.cart_item'); }
  async checkout(){ await this.page.click('#checkout'); }
  async removeFirstItem() {
  await this.page.locator('.cart_button').first().click();
}
}
