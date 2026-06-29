import { test, expect, Locator } from '@playwright/test'

test("Verify Mouse Actions", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    //hover action
    const pointMe = page.locator('.dropbtn');
    await pointMe.hover();
    const laptops = page.locator('.dropdown-content a:nth-child(2)');
    await laptops.hover();
    await page.waitForTimeout(2000);

    //Double click
    await page.locator("button[ondblclick='myFunction1()']").dblclick();
    expect(page.locator('#field2')).toHaveValue("Hello World!");
    await page.waitForTimeout(2000);

    //Drag and Drop
    const source = page.locator('#draggable');
    const target = page.locator('#droppable');

    //App 1: using hover and drag manually
    await source.hover();
    await page.mouse.down();
    await target.hover();
    await page.mouse.up();
    expect(await page.locator('#droppable p').innerText()).toBe("Dropped!");
    await page.waitForTimeout(2000);

    //App 2: direct method
    await page.reload();
    await source.dragTo(target);
    expect(await page.locator('#droppable p').innerText()).toBe("Dropped!");

    //Right click
    await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
    await page.locator('span.context-menu-one').click({button:'right'});
    await page.waitForTimeout(2000);

})

test("Verify Auto Scroll Actions", async ({page}) => {

    //Most of the time, playwright will automatically scroll for you before doing any actions. Therefore, you do not need to scroll explicitly.
    await page.goto("https://testautomationpractice.blogspot.com/");
    console.log("Footer text:", await page.locator('#footer-3').innerText());

    await page.locator('#comboBox').click();
    console.log("list of options:", await page.locator('#dropdown div:nth-child(100)').innerText());

    await page.waitForTimeout(2000);

})

test("Verify Manual Scroll till end of page Actions", async ({page}) => {

    test.slow(); // set timeout for a single test - easy way to triple the default timeout i.e. 30 secs(30000 ms)
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");

    let previousHeight = 0;

    while(true)
    {
        //scroll down the page
        await page.evaluate(()=> {
            window.scrollTo(0, document.body.scrollHeight);
        })
        
        // wait for new content to load
        await page.waitForTimeout(2000);

        //capture the current height of the page
        const currentHeight = await page.evaluate(()=> {
            return document.body.scrollHeight;
        })

        console.log("Previous:", previousHeight);
        console.log("Current:", currentHeight);

        if(currentHeight === previousHeight)
        {
            break;
        }

        previousHeight = currentHeight;
    }

    console.log("End of the page")

})

test("Verify Manual Scroll till find the element", async ({page}) => {

    test.slow(); // set timeout for a single test - easy way to triple the default timeout i.e. 30 secs(30000 ms)
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");

    let previousHeight = 0;
    let bookFound = false;

    while(true)
    {

        const titles = await page.locator('#productsDiv h3').allTextContents();

        if(titles.includes("Little Monsters"))
        {
            console.log("Book Found");
            bookFound = true;
            expect(bookFound).toBeTruthy();
            break;
        }
        //scroll down the page
        await page.evaluate(()=> {
            window.scrollTo(0, document.body.scrollHeight);
        })
        
        // wait for new content to load
        await page.waitForTimeout(2000);

        //capture the current height of the page
        const currentHeight = await page.evaluate(()=> {
            return document.body.scrollHeight;
        })

        console.log("Previous:", previousHeight);
        console.log("Current:", currentHeight);

        if(currentHeight === previousHeight)
        {
            break;
        }

        previousHeight = currentHeight;
    }

    console.log("End of the page")

    if(!bookFound)
    {
        console.log("Book not found")
    }

})