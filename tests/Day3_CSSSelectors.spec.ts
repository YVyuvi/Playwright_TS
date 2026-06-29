/*
CSS (Cascading Style Sheets)
html+Js+css

Types
------
1.Absolute CSS locator (html>body>div>div>input)
2.Relative CSS locator
    1.Tag with ID  (tag#id) or (#id)
    2.Tag with Class   (tag.class) or (.class)
    3.Tag with any other attribute   (tag[a.name='a.value']) or ([a.name='a.value'])
    4.Tag with class and attribute   (tag.class[a.name='a.value']) or (.class[a.name='a.value'])
    *Tag is optional

Syntax - page.locator(css/xpath)

Add-on
-----------
    starts with   tag[a.name^=start of a.value]
    ends with    tag[a.name$=end of a.value]  
    substring    tag[a.name*=substring of a.value]  
    
*/

import { test, expect } from '@playwright/test'

test('Verify CSS Locators', async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    //tag#id or $id
    //await page.locator("#small-searchterms").fill("abcde");
    await page.locator("input#small-searchterms").fill("abcde");

    //tag.class
    //await page.locator(".search-box-text").fill("xyz");
    await page.locator("input.search-box-text").fill("xyz");

    //tag[a.name='a.value']
    //await page.locator("[name='q']").fill("xyz");
    await page.locator("input[name='q']").fill("xyz");

    //tag.class[a.name='a.value']
    //await page.locator(".search-box-text[name='q']").fill("xyz");
    await page.locator("input.search-box-text[name='q']").fill("xyz");
    
})