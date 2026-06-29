import { test, expect, Locator } from '@playwright/test'

//we can configure screenshot on global level in the config file.
//global level scrennshots,videos,trace files will be saved under test results

test("Verify Screenshot", async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    const timestamp = Date.now();

    //current page screenshot 
    await page.screenshot({path:'Screenshots/'+'homepage'+timestamp+'.png'});

    //full page screenshot 
    await page.screenshot({path:'Screenshots/'+'fullpage'+timestamp+'.png', fullPage:true});

    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    
    await expect(page.locator(':text("Welcome to our store")')).toBeVisible();

    //particular element
    await page.locator(':text("Welcome to our store")').screenshot({path:'Screenshots/'+'Element'+timestamp+'.png'});
    
})

test("Verify Tracing", async ({page, context}) => {

    //context.tracing.start({screenshots:true, snapshots:true});
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.locator(':text("Welcome to our store")')).toBeVisible();
    //context.tracing.stop({path:'trace.zip'});
    
})

//To open trace report - npx playwright show-trace trace.zip
//Open: https://trace.playwright.dev/ Drag and drop the trace.zip file to view it.


//npx playwright test tests/flakytest.spec.ts --retries=3
test("Verify Flaky/retry", async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.locator(':text("Welcome to our store")')).toBeVisible();
    
})