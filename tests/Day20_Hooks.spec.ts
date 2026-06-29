import test, { expect, Page } from '@playwright/test';

let page: Page;

test.beforeAll('Open app', async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://demoblaze.com/index.html');
});

test.afterAll('Close app', async () => {
    page.close();
});

test.beforeEach('Login', async () => {
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill('pavano1');
    await page.locator('#loginpassword').fill('test@123');
    await page.locator("button[onclick='logIn()']").click();
    await page.waitForTimeout(2000);
});

test.afterEach('Logout', async () => {
    await page.locator('#logout2').click();
});

test('Find no of products', async () => {
    const products = page.locator('.card-title');
    const count = await products.count();
    console.log("No of products", count);
    await expect(products).toHaveCount(9);
});

test('Add product to cart', async () => {
    await page.locator("text='Samsung galaxy s6'").click();

    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Product added');
        await dialog.accept();
    })

    await page.locator('a.btn.btn-success.btn-lg').click();
});