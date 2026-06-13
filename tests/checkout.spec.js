const { test, expect } = require('@playwright/test');

test('Successful Checkout', async ({ page }) => {

    // Navigate and login
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Add product to cart and open cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    // Begin checkout
    await page.click('[data-test="checkout"]');

    // Fill checkout info and continue
    await page.fill('#first-name', 'Test');
    await page.fill('#last-name', 'User');
    await page.fill('#postal-code', '12345');
    await page.click('[data-test="continue"]');

    // Finish and assert
    await page.click('[data-test="finish"]');

    await expect(page.locator('.complete-header')).toContainText('Thank you');
});