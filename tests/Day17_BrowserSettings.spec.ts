import { test, chromium, Browser, BrowserContext, Page, firefox, webkit, expect } from '@playwright/test'

//Browser ---> Context ---> pages
//Browser ---> chromium, firefox, webkit
//Contexts ----> we can have multiple contexts for multiple users/apps for the same browser
                 // provide a way to operate multiple independent browser sessions.
//page ----> New Tab, Window, Popup

test("Verify Browser Settngs", async () => {

    const browser:Browser = await chromium.launch({headless:false});  //runs in headed mode - we can see the UI
    //const browser:Browser = await chromium.launch({headless:true});  //runs in headless mode - we can't see the UI

    const context:BrowserContext = await browser.newContext(
        {
            viewport:{width:800,height:800}, //DEAFULT SIZE IS 1200,800
            // we can set this in playwright.config.ts file as well as a global settings.
            //if we mentioned it in global and in test means, it will execute based on config in test file. 
            
            //locale:'en-US', // for change the language
            //proxy:{server:'http://myproxy.com:3245'}, // if there is an proxy means
            ignoreHTTPSErrors:true

        }
    );  //create context
    const page:Page = await context.newPage(); //create page

    //await page.goto("https://testautomationpractice.blogspot.com/");
    await page.goto("https://expired.badssl.com/");
    console.log(await page.title());
    
    await page.waitForTimeout(2000);
})

test("Verify Browser Cookies", async () => {

    const browser:Browser = await chromium.launch({headless:false}); 
    const context:BrowserContext = await browser.newContext();  //create context
    const page:Page = await context.newPage(); //create page

    context.addCookies(
        [
            {name:'Mycookie1', value:'123', url:'https://testautomationpractice.blogspot.com/'},
            {name:'Mycookie2', value:'456', url:'https://testautomationpractice.blogspot.com/'},
            {name:'Mycookie3', value:'789', url:'https://testautomationpractice.blogspot.com/'},
        ]
    );

    await page.goto("https://testautomationpractice.blogspot.com/");

    const allCookies = await context.cookies();

    //get particular cookie details
    const retrieveCookie = allCookies.find((i)=> i.name==='Mycookie1');
    console.log("Printing cookiew details", retrieveCookie);
    expect(retrieveCookie?.value).toBe("123");
    expect(retrieveCookie).toBeDefined();

    //get all the cookie details
    console.log("No of cookies:", allCookies.length);
    expect(allCookies.length).toBe(3);

    for(const cookie of allCookies)
    {
        console.log(`${cookie.name}: ${cookie.value}`)
    }

    //clear the cookies
    await context.clearCookies();

    //verify no of cookies
    const allCookies2 = await context.cookies();
    console.log("No of cookies:", allCookies2.length);
    expect(allCookies2.length).toBe(0);
    
    await page.waitForTimeout(2000);
})