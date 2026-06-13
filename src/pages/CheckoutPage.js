class CheckoutPage {

 constructor(page){
    this.page = page;
 }

 async fillCheckout(
   first,
   last,
   zip
 ){
    await this.page.fill(
      '#first-name',
      first
    );

    await this.page.fill(
      '#last-name',
      last
    );

    await this.page.fill(
      '#postal-code',
      zip
    );
 }
}

module.exports = CheckoutPage;