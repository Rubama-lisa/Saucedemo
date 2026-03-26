import { Page, Locator } from '@playwright/test';
import { BasePage } from './Basepage';
import { BaseLocators } from '../locators/Baselocators';

export class CartPage extends BasePage {

  private base: BaseLocators;

  constructor(page: Page) {
    super(page);
    this.base = new BaseLocators(page);
  }

  // Get all cart items
  items(): Locator {
    return this.base.cartItems;
  }

  // Checkout
  async checkout() {
    await this.click(this.base.checkoutButton);
  }

  // Remove first item
  async removeFirstItem() {
    await this.click(this.base.removeButtons.first());
  }
}
