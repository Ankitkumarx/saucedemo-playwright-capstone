class CartPage {

    constructor(page) {
        this.page = page;

        this.addButton =
        '[data-test="add-to-cart-sauce-labs-backpack"]';

        this.cart =
        '.shopping_cart_link';
    }

    async addProduct() {
        await this.page.click(this.addButton);
    }

    async openCart() {
        await this.page.click(this.cart);
    }
}

module.exports = CartPage;