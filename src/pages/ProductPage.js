class ProductPage {

    constructor(page) {
        this.page = page;

        this.productItems = '.inventory_item';
    }

    async getProductCount() {
        return await this.page
          .locator(this.productItems)
          .count();
    }
}

module.exports = ProductPage;