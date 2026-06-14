const { test, expect, devices } = require('@playwright/test');

test.describe('Mobile Tests', () => {

    test('Login Page - iPhone 13', async ({ browser }) => {

        const context = await browser.newContext({
            ...devices['iPhone 13']
        });

        const page = await context.newPage();

        await page.goto(
            'https://www.saucedemo.com'
        );

        await expect(
            page.locator('#user-name')
        ).toBeVisible();

        await expect(
            page.locator('#password')
        ).toBeVisible();

        await expect(
            page.locator('#login-button')
        ).toBeVisible();

        await context.close();
    });

    test('Login With Mobile Viewport', async ({ browser }) => {

        const context = await browser.newContext({
            viewport: {
                width: 390,
                height: 844
            }
        });

        const page = await context.newPage();

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

        await expect(page)
            .toHaveURL(/inventory/);

        await context.close();
    });

    test('Inventory Page Mobile Layout', async ({ browser }) => {

        const context = await browser.newContext({
            viewport: {
                width: 390,
                height: 844
            }
        });

        const page = await context.newPage();

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

        await expect(
            page.locator('.inventory_list')
        ).toBeVisible();

        await context.close();
    });

    test('Cart Page Mobile Layout', async ({ browser }) => {

        const context = await browser.newContext({
            viewport: {
                width: 390,
                height: 844
            }
        });

        const page = await context.newPage();

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

        await page.click(
            '.shopping_cart_link'
        );

        await expect(
            page.locator('.cart_list')
        ).toBeVisible();

        await context.close();
    });

    test('Checkout Page Mobile Layout', async ({ browser }) => {

        const context = await browser.newContext({
            viewport: {
                width: 390,
                height: 844
            }
        });

        const page = await context.newPage();

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

        await page.click(
            '.shopping_cart_link'
        );

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

        await context.close();
    });

    test('Hamburger Menu Visible On Mobile', async ({ browser }) => {

        const context = await browser.newContext({
            ...devices['iPhone 13']
        });

        const page = await context.newPage();

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

        await expect(
            page.locator('#react-burger-menu-btn')
        ).toBeVisible();

        await context.close();
    });

    test('Mobile Orientation Portrait', async ({ browser }) => {

        const context = await browser.newContext({
            viewport: {
                width: 390,
                height: 844
            }
        });

        const page = await context.newPage();

        await page.goto(
            'https://www.saucedemo.com'
        );

        await expect(
            page.locator('#login-button')
        ).toBeVisible();

        await context.close();
    });

    test('Mobile Orientation Landscape', async ({ browser }) => {

        const context = await browser.newContext({
            viewport: {
                width: 844,
                height: 390
            }
        });

        const page = await context.newPage();

        await page.goto(
            'https://www.saucedemo.com'
        );

        await expect(
            page.locator('#login-button')
        ).toBeVisible();

        await context.close();
    });

});