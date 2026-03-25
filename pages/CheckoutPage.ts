
import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}
  async fill(f:string,l:string,z:string){
    await this.page.fill('#first-name',f);
    await this.page.fill('#last-name',l);
    await this.page.fill('#postal-code',z);
    await this.page.click('#continue');
  }
  async finish(){ await this.page.click('#finish'); }
  confirm(){ return this.page.locator('.complete-header'); }
}
