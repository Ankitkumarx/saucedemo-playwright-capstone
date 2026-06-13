const { test, expect } = require('@playwright/test');

test('Add Product To Cart', async ({ page }) => {

    await page.goto(
      'https://www.saucedemo.com'
    );

    await page.fill(
      '#user-name',
      'standard_user'
    );

    await page.fill(
      '#password',
      'secret_sauce'
    );

    await page.click('#login-button');

    await page.click(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );

    await page.click('.shopping_cart_link');

    await expect(
      page.locator('.cart_item')
    ).toBeVisible();
});