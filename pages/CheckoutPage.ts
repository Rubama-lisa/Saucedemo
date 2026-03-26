
import { Locator, Page } from '@playwright/test';
import { BasePage } from './Basepage';

export class CheckoutPage extends BasePage {
  public lastName: Locator; 
  constructor(page: Page) {
    super(page);

    this.lastName = page.locator('#last-name');
    
  }
  async fill(firstName:string,lastName:string,zipCode:string){
    await this.page.fill('#first-name',firstName);
    await this.page.fill('#last-name',lastName);
    await this.page.fill('#postal-code',zipCode);
    await this.page.click('#continue');
  }
  async finish(){ await this.page.click('#finish'); }
  confirm(){ return this.page.locator('.complete-header'); }
}