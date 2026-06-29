/*
An iframe (short for inline frame) is an HTML element that allows you to embed another HTML document within the current document.
Iframe are commonly used to embed external content such as videos, maps, or other web pages (as seen here) into a web page without 
affecting the parent document

*/

import { test, expect, Locator } from '@playwright/test'

test("Verify frames", async ({page}) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    //total no of frames 
     const frames = page.frames();
     console.log("No of frames:", frames.length);
     
     //App 1 : using page.frame()
     const frame1 = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"}); 
     //we can use only if there is an url or name attribute

     if(frame1){
        //await frame1.locator("[name='mytext1']").fill("Hello");
        await frame1.fill("[name='mytext1']", "Hello");
     }
     else{
        console.log("frame 1 is not available")
     }

     //App 2 : using frameLocator
     await page.frameLocator("[src='frame_2.html']").locator("[name='mytext2']").fill("Hello");

     await page.waitForTimeout(2000);
})

test("Verify inner/child frames", async ({page}) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame3 = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"});

     if(frame3){
        //await frame.locator("[name='mytext3']").fill("Hello");
        await frame3.fill("[name='mytext3']", "Hello");
        const childFrame = frame3.childFrames();
        console.log("No of child frame", childFrame.length); // only 1 child frame is present
        const radioBTN = childFrame[0].getByLabel('I am a human');
        await radioBTN.check();
        await expect(radioBTN).toBeChecked();
     }
     else{
        console.log("frame 3 is not available");
     }

     await page.waitForTimeout(2000);
})

test('Frame 5: Fill input and verify logo after link click', async ({ page }) => {
    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame5 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_5.html' });

    if (frame5) {
        await frame5.locator('input[name="mytext5"]').fill('playwright');
        await expect(frame5.locator('input[name="mytext5"]')).toHaveValue('playwright');
        await frame5.locator('a[href="https://a9t9.com"]').click();
        await page.waitForTimeout(5000); // Give time for content to load
        const logo = frame5.locator('img.responsive-img').first();
        await expect(logo).toBeVisible();
    } 
    else {
        console.error("Frame 5 not found.");
    }

    await page.waitForTimeout(2000);
});
