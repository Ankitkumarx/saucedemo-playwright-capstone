const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');

test.describe('Visual Smoke Tests', () => {

    test('Login Page Should Render Correctly', async ({ page }) => {

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

        await expect(
            page.locator('.login_logo')
        ).toBeVisible();
    });

    test('Inventory Page Should Render Correctly', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await expect(
            page.locator('.inventory_list')
        ).toBeVisible();

        await expect(
            page.locator('.shopping_cart_link')
        ).toBeVisible();

        await expect(
            page.locator('.product_sort_container')
        ).toBeVisible();

        await expect(
            page.locator('#react-burger-menu-btn')
        ).toBeVisible();
    });

    test('Product Detail Page Should Render Correctly', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await page
            .locator('.inventory_item_name')
            .first()
            .click();

        await expect(
            page.locator('.inventory_details_name')
        ).toBeVisible();

        await expect(
            page.locator('.inventory_details_desc')
        ).toBeVisible();

        await expect(
            page.locator('.inventory_details_price')
        ).toBeVisible();

        await expect(
            page.locator('#back-to-products')
        ).toBeVisible();
    });

    test('Cart Page Should Render Correctly', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await page.click(
            '[data-test="add-to-cart-sauce-labs-backpack"]'
        );

        await page.click(
            '.shopping_cart_link'
        );

        await expect(
            page.locator('.cart_list')
        ).toBeVisible();

        await expect(
            page.locator('#continue-shopping')
        ).toBeVisible();

        await expect(
            page.locator('#checkout')
        ).toBeVisible();
    });

    test('Checkout Information Page Should Render Correctly', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

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

        await expect(
            page.locator('#continue')
        ).toBeVisible();
    });

    test('Checkout Overview Page Should Render Correctly', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await page.click(
            '[data-test="add-to-cart-sauce-labs-backpack"]'
        );

        await page.click(
            '.shopping_cart_link'
        );

        await page.click('#checkout');

        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');
        await page.fill('#postal-code', '12345');

        await page.click('#continue');

        await expect(
            page.locator('.summary_info')
        ).toBeVisible();

        await expect(
            page.locator('.summary_total_label')
        ).toBeVisible();

        await expect(
            page.locator('#finish')
        ).toBeVisible();
    });

    test('Order Confirmation Page Should Render Correctly', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await page.click(
            '[data-test="add-to-cart-sauce-labs-backpack"]'
        );

        await page.click(
            '.shopping_cart_link'
        );

        await page.click('#checkout');

        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');
        await page.fill('#postal-code', '12345');

        await page.click('#continue');
        await page.click('#finish');

        await expect(
            page.locator('.complete-header')
        ).toBeVisible();

        await expect(
            page.locator('.complete-text')
        ).toBeVisible();

        await expect(
            page.locator('#back-to-products')
        ).toBeVisible();
    });

    test('Take Inventory Page Screenshot', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await page.screenshot({
            path: 'screenshots/inventory-page.png',
            fullPage: true
        });

        expect(true).toBeTruthy();
    });

});