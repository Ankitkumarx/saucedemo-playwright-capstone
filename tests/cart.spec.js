const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const CartPage = require('../src/pages/CartPage');

test.describe('Cart Tests', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );
    });

    test('Add Single Product To Cart', async ({ page }) => {

        const cartPage = new CartPage(page);

        await cartPage.addBackpack();

        await expect(
            page.locator('.shopping_cart_badge')
        ).toHaveText('1');
    });

    test('Add Multiple Products To Cart', async ({ page }) => {

        const cartPage = new CartPage(page);

        await cartPage.addBackpack();

        await cartPage.addBikeLight();

        await expect(
            page.locator('.shopping_cart_badge')
        ).toHaveText('2');
    });

    test('Remove Product From Cart', async ({ page }) => {

        const cartPage = new CartPage(page);

        await cartPage.addBackpack();

        await cartPage.removeBackpack();

        await expect(
            page.locator('.shopping_cart_badge')
        ).toHaveCount(0);
    });

    test('Cart Badge Updates Correctly', async ({ page }) => {

        const cartPage = new CartPage(page);

        await cartPage.addBackpack();

        await expect(
            page.locator('.shopping_cart_badge')
        ).toHaveText('1');

        await cartPage.addBikeLight();

        await expect(
            page.locator('.shopping_cart_badge')
        ).toHaveText('2');
    });

    test('Verify Cart Item Count', async ({ page }) => {

        const cartPage = new CartPage(page);

        await cartPage.addBackpack();
        await cartPage.addBikeLight();

        await cartPage.openCart();

        const items = page.locator('.cart_item');

        await expect(items).toHaveCount(2);
    });

    test('Verify Cart Item Details', async ({ page }) => {

        const cartPage = new CartPage(page);

        await cartPage.addBackpack();

        await cartPage.openCart();

        await expect(
            page.locator('.inventory_item_name')
        ).toContainText('Sauce Labs Backpack');
    });

    test('Update Quantity Simulation', async ({ page }) => {

        const cartPage = new CartPage(page);

        await cartPage.addBackpack();

        await expect(
            page.locator('.shopping_cart_badge')
        ).toHaveText('1');

        await cartPage.removeBackpack();

        await cartPage.addBackpack();

        await expect(
            page.locator('.shopping_cart_badge')
        ).toHaveText('1');
    });

    test('Verify Cart Page Loads Successfully', async ({ page }) => {

        const cartPage = new CartPage(page);

        await cartPage.openCart();

        await expect(page)
            .toHaveURL(/cart/);
    });

    test('Verify Continue Shopping Button', async ({ page }) => {

        const cartPage = new CartPage(page);

        await cartPage.openCart();

        await page.click('#continue-shopping');

        await expect(page)
            .toHaveURL(/inventory/);
    });

    test('Verify Checkout Button Visible', async ({ page }) => {

        const cartPage = new CartPage(page);

        await cartPage.addBackpack();

        await cartPage.openCart();

        await expect(
            page.locator('#checkout')
        ).toBeVisible();
    });

    test('Verify Product Price In Cart', async ({ page }) => {

        const cartPage = new CartPage(page);

        await cartPage.addBackpack();

        await cartPage.openCart();

        const price = await page
            .locator('.inventory_item_price')
            .textContent();

        expect(price).toContain('$');
    });

    test('Verify Subtotal Calculation', async ({ page }) => {

        const cartPage = new CartPage(page);

        await cartPage.addBackpack();
        await cartPage.addBikeLight();

        await cartPage.openCart();

        const prices = await page
            .locator('.inventory_item_price')
            .allTextContents();

        let subtotal = 0;

        for (const price of prices) {
            subtotal += parseFloat(
                price.replace('$', '')
            );
        }

        expect(subtotal)
            .toBeGreaterThan(0);
    });

});