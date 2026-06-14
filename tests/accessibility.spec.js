const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');

test.describe('Accessibility Tests', () => {

    test('Login Inputs Should Be Visible', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com'
        );

        await expect(
            page.locator('#user-name')
        ).toBeVisible();

        await expect(
            page.locator('#password')
        ).toBeVisible();
    });

    test('Login Button Should Have Accessible Text', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com'
        );

        await expect(
            page.locator('#login-button')
        ).toHaveValue('Login');
    });

    test('All Product Images Should Have Alt Text', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        const images = page.locator('img');

        const count = await images.count();

        for (let i = 0; i < count; i++) {

            const altText =
                await images.nth(i)
                .getAttribute('alt');

            expect(altText).not.toBeNull();

            expect(
                altText.trim().length
            ).toBeGreaterThan(0);
        }
    });

    test('Product Names Should Be Readable', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        const products =
            page.locator('.inventory_item_name');

        const count =
            await products.count();

        for (let i = 0; i < count; i++) {

            const name =
                await products.nth(i)
                .textContent();

            expect(
                name.trim().length
            ).toBeGreaterThan(0);
        }
    });

    test('Buttons Should Be Visible', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        const buttons =
            page.locator('button');

        const count =
            await buttons.count();

        for (let i = 0; i < count; i++) {

            await expect(
                buttons.nth(i)
            ).toBeVisible();
        }
    });

    test('Cart Link Should Be Accessible', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await expect(
            page.locator('.shopping_cart_link')
        ).toBeVisible();
    });

    test('Navigation Menu Should Be Accessible', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await expect(
            page.locator('#react-burger-menu-btn')
        ).toBeVisible();
    });

    test('Checkout Inputs Should Be Accessible', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await page.click(
            '[data-test="add-to-cart-sauce-labs-backpack"]'
        );

        await page.click('.shopping_cart_link');

        await page.click('#checkout');

        await expect(
            page.locator('#first-name')
        ).toBeVisible();

        await expect(
            page.locator('#last-name')
        ).toBeVisible();

        await expect(
            page.locator('#postal-code')
        ).toBeVisible();
    });

    test('Error Message Should Be Visible To User', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com'
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });

    test('Page Should Have Title', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com'
        );

        await expect(page)
            .toHaveTitle(/Swag Labs/);
    });

});