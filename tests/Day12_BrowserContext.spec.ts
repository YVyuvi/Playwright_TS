import { test, chromium, Browser, BrowserContext, Page, firefox, webkit, expect } from '@playwright/test'

//Browser ---> Context ---> pages
//Browser ---> chromium, firefox, webkit
//Contexts ----> we can have multiple contexts for multiple users/apps for the same browser
                 // provide a way to operate multiple independent browser sessions.
//page ----> New Tab, Window, Popup

test("Verify Browser Context", async () => {

    const browser:Browser = await chromium.launch();  //create browser
    const context:BrowserContext = await browser.newContext();  //create context

    //create 2 pages
    const page1:Page = await context.newPage();
    const page2:Page = await context.newPage();
    console.log("No of pages created:", context.pages().length);  //2

    await page1.goto("https://testautomationpractice.blogspot.com/");
    expect(page1).toHaveTitle("Automation Testing Practice");

    await page2.goto("https://playwright.dev/");
    expect(page2).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");

    await page1.waitForTimeout(2000);
    await page2.waitForTimeout(2000);
})

test("Verify Handle Tabs/Pages", async () => {

    const browser:Browser = await chromium.launch();  //create browser
    const context:BrowserContext = await browser.newContext();  //create context

    //create 1 pages
    const page1:Page = await context.newPage();
    await page1.goto("https://testautomationpractice.blogspot.com/");
    
    //statements should go parallely
    //context.waitForEvent('page');  //pending, fulfilled, rejected
    //await page1.locator("button:has-text('New Tab')").click();   //open new tab/page
    const [page2] = await Promise.all([context.waitForEvent('page'), await page1.locator("button:has-text('New Tab')").click()])

    //App 1: switch between pages and get titles
    const pages = context.pages();
    console.log("No of pages:", pages.length);
    console.log("title of page1 :", await pages[0].title());
    console.log("title of page2 :", await pages[1].title());

    //App 2: 
    console.log("title of page1 :", await page1.title());
    console.log("title of page2 :", await page2.title());

    await page1.waitForTimeout(2000);
})

test("Verify popups", async () => {

    const browser:Browser = await chromium.launch();  //create browser
    const context:BrowserContext = await browser.newContext();  //create context

    //create 1 pages
    const page1:Page = await context.newPage();
    await page1.goto("https://testautomationpractice.blogspot.com/");
    
    //statements should go parallely
    //page1.waitForEvent('popup');  //pending, fulfilled, rejected
    //await page1.locator("#PopUp").click();   //open new tab/page
    await Promise.all([page1.waitForEvent('popup'), await page1.locator("#PopUp").click()])

    const pages = context.pages();
    console.log("No of pages:", pages.length);
    console.log("title of page1 :", pages[0].url());
    console.log("title of page2 :", pages[1].url());

    for(const pg of pages)
    {
        const title = await pg.title();
        if(title.includes("Selenium"))
        {
            await pg.locator("button[aria-label='Toggle navigation']").click();
            await pg.close(); //This will close playwright popup window
        }
    }

    await page1.waitForTimeout(2000);
})

test("Verify authenticated popups", async () => {

    const browser:Browser = await chromium.launch();  //create browser
    const context:BrowserContext = await browser.newContext();  //create context
    const page1:Page = await context.newPage();

    //App1 : directly passing the credentials along with the url
    await page1.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    await page1.waitForLoadState(); // wait for page load completely
    await expect(page1.locator('text=Congratulations')).toBeVisible();
    await page1.waitForTimeout(2000);

    //App 2: passing the credentials along with browser context
    const context2:BrowserContext = await browser.newContext({httpCredentials:{username:'admin', password:'admin'}});  
    const page2:Page = await context2.newPage();

    await page2.goto("https://the-internet.herokuapp.com/basic_auth");
    await page2.waitForLoadState(); // wait for page load completely
    await expect(page2.locator('text=Congratulations')).toBeVisible();
    await page2.waitForTimeout(2000);

})