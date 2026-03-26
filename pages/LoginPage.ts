
import { Page } from '@playwright/test';
import { BasePage } from './Basepage';
import { BaseLocators } from '../locators/Baselocators';

export class LoginPage extends BasePage {
  private base: BaseLocators;

  constructor(page: Page) {
    super(page);
    this.base = new BaseLocators(page);
  }

  async login(username: string, password: string) {
    await this.enterText(this.page.locator('#user-name'), username);
    await this.enterText(this.page.locator('#password'), password);
    await this.click(this.base.getButtonByText('Login'));
  }

  async getError() {
    return await this.getText(this.base.errorMessage);
  }
}