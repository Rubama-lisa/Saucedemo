
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}
  async goto(){ await this.page.goto('/'); }
  async login(u:string,p:string){
    await this.page.fill('#user-name',u);
    await this.page.fill('#password',p);
    await this.page.click('#login-button');
  }
  async error(){ return this.page.locator('[data-test="error"]').textContent(); }
}
