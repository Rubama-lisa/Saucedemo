
import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}
  items(){ return this.page.locator('.inventory_item'); }
  prices(){ return this.page.locator('.inventory_item_price'); }
  async sort(val:string){ await this.page.selectOption('.product_sort_container', val); }
  async cart(){ await this.page.click('.shopping_cart_link'); }
  async add(index: number) {
  await this.page.locator('.inventory_item button').nth(index).click();
}

}
