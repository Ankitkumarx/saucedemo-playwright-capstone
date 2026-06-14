const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');

test.describe('Login Tests', () => {

    test('Valid Login', async ({ page }) => {

        const login = new LoginPage(page);

        await login.goto();

        await login.login(
            'standard_user',
            'secret_sauce'
        );

        await expect(page).toHaveURL(/inventory/);
    });

    test('Invalid Login', async ({ page }) => {

        const login = new LoginPage(page);

        await login.goto();

        await login.login(
            'wrong_user',
            'wrong_password'
        );

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });

    test('Locked Out User', async ({ page }) => {

        const login = new LoginPage(page);

        await login.goto();

        await login.login(
            'locked_out_user',
            'secret_sauce'
        );

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText('locked out');
    });

    test('Empty Login Fields', async ({ page }) => {

        await page.goto('https://www.saucedemo.com');

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText('Username is required');
    });

    test('Username Required', async ({ page }) => {

        await page.goto('https://www.saucedemo.com');

        await page.fill(
            '#password',
            'secret_sauce'
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText('Username is required');
    });

    test('Password Required', async ({ page }) => {

        await page.goto('https://www.saucedemo.com');

        await page.fill(
            '#user-name',
            'standard_user'
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText('Password is required');
    });

    test('Verify Invalid Login Error Message', async ({ page }) => {

        await page.goto('https://www.saucedemo.com');

        await page.fill(
            '#user-name',
            'invalid_user'
        );

        await page.fill(
            '#password',
            'invalid_password'
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText(
            'Username and password do not match'
        );
    });

});