const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const ProductPage = require('../src/pages/ProductPage');

test('Products Available', async ({ page }) => {

    const login = new LoginPage(page);
    const product = new ProductPage(page);

    await login.goto();

    await login.login(
      'standard_user',
      'secret_sauce'
    );

    const count =
      await product.getProductCount();

    expect(count).toBeGreaterThan(0);
});