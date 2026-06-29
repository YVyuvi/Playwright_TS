import { test, expect } from '@playwright/test';

//fixture - global varibale - page, browser
//selenium - W3C Protocol (slow)
//Playwright - WebSocket protocol (fast)

//await - if a statement is returning a promise then await is needed
//      - if a statement is doing any actions then await is needed

test('Verify Page Title', async ({page})=>{
    await page.goto("http://www.automationpractice.pl/index.php");
    let title1:string = await page.title();
    console.log(title1);
    await expect(page).toHaveTitle("My Shop");
})

test('Verify Page URL', async ({page})=>{
    await page.goto("http://www.automationpractice.pl/index.php");
    let url1:string = page.url();
    console.log(url1);
    await expect(page).toHaveURL("http://www.automationpractice.pl/index.php");
})