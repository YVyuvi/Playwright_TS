import { Page, Locator } from '@playwright/test'

export class HomePage {

    //define the variables - private and readonly
    private readonly page: Page;
    private readonly productListLocator:Locator;
    private readonly addToCartButton: Locator;
    private readonly cartLink: Locator;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.productListLocator = this.page.locator('div#tbodyid div.card h4.card-title a');
        this.addToCartButton = this.page.locator('a:has-text("Add to cart")');
        this.cartLink = this.page.locator('#cartur');
    }

    //actions methods
    async addProductToCart(productName: string): Promise<void> {
        await this.productListLocator.first().waitFor();
        const productElements = await this.productListLocator.all();
        //console.log(productElements.length)

        for (const product of productElements) {
            const name = await product.textContent();
            //console.log(name)
            if (name?.trim() === productName) {
                await product.click();
                break;
            }
        }

        this.page.once('dialog', async (dialog) => {
            if(dialog.message().includes('added')){
                console.log(dialog.message());
                await dialog.accept();
            }
        })

        await this.addToCartButton.click();
    }

    async gotoCart(){
        await this.cartLink.click();
    }

}