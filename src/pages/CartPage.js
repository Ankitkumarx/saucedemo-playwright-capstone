class CartPage {

    constructor(page) {

        this.page = page;

        this.backpackAdd =
            '[data-test="add-to-cart-sauce-labs-backpack"]';

        this.backpackRemove =
            '[data-test="remove-sauce-labs-backpack"]';

        this.bikeLightAdd =
            '[data-test="add-to-cart-sauce-labs-bike-light"]';

        this.cartIcon =
            '.shopping_cart_link';

        this.checkoutButton =
            '#checkout';
    }

    async addBackpack() {

        await this.page.click(
            this.backpackAdd
        );
    }

    async removeBackpack() {

        await this.page.click(
            this.backpackRemove
        );
    }

    async addBikeLight() {

        await this.page.click(
            this.bikeLightAdd
        );
    }

    async openCart() {

        await this.page.click(
            this.cartIcon
        );
    }

    async clickCheckout() {

        await this.page.click(
            this.checkoutButton
        );
    }
}

module.exports = CartPage;