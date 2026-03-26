import { Page, Locator } from '@playwright/test';

export class BaseLocators {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Generic button by text
  getButtonByText(text: string | RegExp): Locator {
    return this.page.getByRole('button', { name: text });
  }

  // Generic error message
  get errorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  // Cart badge
  get cartBadge(): Locator {
    return this.page.locator('.shopping_cart_badge');
  }

  // Cart icon
  get cartIcon(): Locator {
    return this.page.locator('.shopping_cart_link');
  }

  // Inventory items
  get inventoryItems(): Locator {
    return this.page.locator('.inventory_item');
  }

  // Add to cart buttons
  get addToCartButtons(): Locator {
    return this.page.locator('.inventory_item button');
  }

  // Remove buttons
  get removeButtons(): Locator {
    return this.page.locator('.cart_button');
  }

  // Sort dropdown
  get sortDropdown(): Locator {
    return this.page.locator('.product_sort_container');
  }

  // Cart items
  get cartItems(): Locator {
    return this.page.locator('.cart_item');
  }

  // Checkout button
  get checkoutButton(): Locator {
    return this.page.locator('#checkout');
  }

  // Checkout form fields
  get firstName(): Locator {
    return this.page.locator('#first-name');
  }

  get lastName(): Locator {
    return this.page.locator('#last-name');
  }

  get postalCode(): Locator {
    return this.page.locator('#postal-code');
  }

  get continueButton(): Locator {
    return this.page.locator('#continue');
  }

  // Finish button
  get finishButton(): Locator {
    return this.page.locator('#finish');
  }

  // Confirmation
  get confirmationHeader(): Locator {
    return this.page.locator('.complete-header');
  }

  // Summary values
  get itemTotal(): Locator {
    return this.page.locator('.summary_subtotal_label');
  }

  get tax(): Locator {
    return this.page.locator('.summary_tax_label');
  }

  get total(): Locator {
    return this.page.locator('.summary_total_label');
  }
}