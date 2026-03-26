import { Page, Locator } from '@playwright/test';
import { BasePage } from './Basepage';
import { BaseLocators } from '../locators/Baselocators';

export class InventoryPage extends BasePage {
  private locators: BaseLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new BaseLocators(page);
  }

  items(): Locator {
    return this.page.locator('.inventory_item');
  }

  prices(): Locator {
    return this.page.locator('.inventory_item_price');
  }

  async sort(option: string): Promise<void> {
    const sortDropdown = this.page.locator('.product_sort_container');
    await this.selectOption(sortDropdown, option);
  }

  async goToCart(): Promise<void> {
    const cartLink = this.page.locator('.shopping_cart_link');
    await this.click(cartLink);
  }

  async addItem(index: number): Promise<void> {
    const addButton = this.page.locator('.inventory_item button').nth(index);
    await this.click(addButton);
  }

  // add helper to add multiple items
  async addItems(indices: number[]): Promise<void> {
    for (const i of indices) {
      await this.addItem(i);
    }
  }
}