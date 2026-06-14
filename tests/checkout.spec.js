const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const CartPage = require('../src/pages/CartPage');
const CheckoutPage = require('../src/pages/CheckoutPage');

test.describe('Checkout Tests', () => {

    async function addProductAndOpenCheckout(page) {

        const cartPage = new CartPage(page);

        await cartPage.addBackpack();
        await cartPage.openCart();
        await cartPage.clickCheckout();
    }

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );
    });

    test('Checkout With Empty Cart', async ({ page }) => {

        await page.click('.shopping_cart_link');

        await expect(
            page.locator('.cart_item')
        ).toHaveCount(0);
    });

    test('Empty Checkout Form Validation', async ({ page }) => {

        await addProductAndOpenCheckout(page);

        await page.click('#continue');

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText('First Name is required');
    });

    test('Missing Last Name Validation', async ({ page }) => {

        await addProductAndOpenCheckout(page);

        await page.fill('#first-name', 'John');
        await page.fill('#postal-code', '12345');

        await page.click('#continue');

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText('Last Name is required');
    });

    test('Missing Postal Code Validation', async ({ page }) => {

        await addProductAndOpenCheckout(page);

        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');

        await page.click('#continue');

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText('Postal Code is required');
    });

    test('Successful Checkout', async ({ page }) => {

        await addProductAndOpenCheckout(page);

        const checkoutPage =
            new CheckoutPage(page);

        await checkoutPage.fillCheckoutInfo(
            'John',
            'Doe',
            '12345'
        );

        await checkoutPage.continueCheckout();

        await checkoutPage.finishCheckout();

        await expect(
            page.locator('.complete-header')
        ).toContainText('Thank you');
    });

    test('Verify Order Confirmation Content', async ({ page }) => {

        await addProductAndOpenCheckout(page);

        const checkoutPage =
            new CheckoutPage(page);

        await checkoutPage.fillCheckoutInfo(
            'John',
            'Doe',
            '12345'
        );

        await checkoutPage.continueCheckout();

        await checkoutPage.finishCheckout();

        await expect(
            page.locator('.complete-text')
        ).toContainText(
            'Your order has been dispatched'
        );
    });

    test('Verify Checkout Overview Page', async ({ page }) => {

        await addProductAndOpenCheckout(page);

        const checkoutPage =
            new CheckoutPage(page);

        await checkoutPage.fillCheckoutInfo(
            'John',
            'Doe',
            '12345'
        );

        await checkoutPage.continueCheckout();

        await expect(
            page.locator('.summary_info')
        ).toBeVisible();
    });

    test('Verify Payment Information Exists', async ({ page }) => {

        await addProductAndOpenCheckout(page);

        const checkoutPage =
            new CheckoutPage(page);

        await checkoutPage.fillCheckoutInfo(
            'John',
            'Doe',
            '12345'
        );

        await checkoutPage.continueCheckout();

        await expect(
            page.locator('[data-test="payment-info-label"]')
        ).toBeVisible();
    });

    test('Verify Shipping Information Exists', async ({ page }) => {

        await addProductAndOpenCheckout(page);

        const checkoutPage =
            new CheckoutPage(page);

        await checkoutPage.fillCheckoutInfo(
            'John',
            'Doe',
            '12345'
        );

        await checkoutPage.continueCheckout();

        await expect(
            page.locator('[data-test="shipping-info-label"]')
        ).toBeVisible();
    });

    test('Verify Total Amount Is Displayed', async ({ page }) => {

        await addProductAndOpenCheckout(page);

        const checkoutPage =
            new CheckoutPage(page);

        await checkoutPage.fillCheckoutInfo(
            'John',
            'Doe',
            '12345'
        );

        await checkoutPage.continueCheckout();

        await expect(
            page.locator('.summary_total_label')
        ).toBeVisible();
    });

    test('Cancel Checkout Flow', async ({ page }) => {

        await addProductAndOpenCheckout(page);

        await page.click('#cancel');

        await expect(page)
            .toHaveURL(/cart/);
    });

});