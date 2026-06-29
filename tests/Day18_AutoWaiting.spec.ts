import { test, expect, Locator } from '@playwright/test'

// default auto wait time for action is - 30000 ms (30 secs)
// default auto wait time for assertion is - 5000 ms (5 secs)
// before doing actions or assertions it will do some actionability checks then perform the action

test("Verify Auto Waiting", async ({page}) => {

    test.setTimeout(80000); //80 secs //if we set timeout in global and within test as well means it will run based on the test timeout
    //test.slow(); //triple the default timeout (90 secs)
    await page.goto("https://demowebshop.tricentis.com/");

    //Assertions - auto wait works
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    //await expect(page).toHaveURL('https://demowebshop.tricentis.com/',{timeout:20000}); 
    await expect(page.locator(':text("Welcome to our store")')).toBeVisible();
    //await expect(page.locator(':text("Welcome to our store")')).toBeVisible({timeout:20000});

    //Actions - auto wait works
    await page.locator('#small-searchterms').fill('Laptop', {force:true}); //force action. it won't do actionability checks
    await page.locator('input.button-1.search-box-button').click({force:true}); //
})

//Auto-retrying assertions will take locators or pages inside it and it is async so we should mention await (await expect(locator).toBeAttached()). 
// Timeout is possible onl for this assertion
//Non-retrying assertions will take values inside it and it is sync so we shouldn't mention await (expect(value).toBe()). timeout is not possible.

test("Verify Diff Assertions", async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    //Auto-retrying Assertions - (automatically retries until it passed or timeout)
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    
    //Auto-retry: waits for the element to be visible and have the expected text
    await expect(page.locator(':text("Welcome to our store")')).toBeVisible();
    
    //Non-retrying assertions (executes immediately, no retry)
    const title = await page.title();
    expect(title.includes('Demo Web Shop')).toBeTruthy(); //no auto-retry
    
    const welcomeText = await page.locator('text=Welcome to our store').textContent();
    expect(welcomeText).toContain('Welcome'); //non-retrying
})

test("Verify Assertions types", async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    //Hard Assertion
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.locator(':text("Welcome to our store")')).toBeVisible();
    await expect(page).toHaveTitle('Demo Web Shop');

    //Soft Assertion
    await expect.soft(page).toHaveTitle('Demo Web Shop2'); //failed
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.locator(':text("Welcome to our store")')).toBeVisible();
    
})

/*
npx playwright codegen
npx playwright codegen -o tests/mytest.spec.ts
npx playwright codegen --output tests/mytest.spec.ts
npx playwright codegen --output=tests/mytest.spec.ts
npx playwright test tests/mytest.spec.ts --debug
We can assert using text, visibility, snapshot, value
In the debug we can also pick locators 
We can change the prog language as well by using codegen window(test runner)
await page.pause();
This acts like a breakpoint in your test
*/