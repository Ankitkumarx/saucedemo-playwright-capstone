const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');

test('Valid Login', async ({ page }) => {

    const login = new LoginPage(page);

    await login.goto();

    await login.login(
        'standard_user',
        'secret_sauce'
    );

    await expect(page).toHaveURL(/inventory/);
});