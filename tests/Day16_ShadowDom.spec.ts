/*    
All locators in playwright by default work with elements in shadow dom.
The exceptions are:
Locating by xpath does not pierce shadow roots.
*/

import { test, expect, Locator } from '@playwright/test'

test("Verify shadow dom", async ({page}) => {

    await page.goto("https://books-pwakit.appspot.com/");

    await page.locator('#input').fill("Playwright Automation");
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);

    const booksFound = await page.locator("hs.title").all();
    console.log("No of books;", booksFound.length);
    expect(booksFound.length).toBe(0);
})

test("Verify shadow dom2", async ({page}) => {

    await page.goto("https://shop.polymer-project.org/");

    await page.locator("a[aria-label=\"Men's Outerwear Shop Now\"]").click();
    await page.waitForTimeout(3000);

    const productsFound = await page.locator("div.title").all();
    console.log("No of books;", productsFound.length);
    expect(productsFound.length).toBe(16); 
})