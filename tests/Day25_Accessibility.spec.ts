/*
Playwright can be used to test your appliactions for many types of accessibility issues.
Ex:
Missing or Improper ALt Txt for images
Poor color Contrast
Missinbg formlabels
Keyboard navigations issues


Every website should follow WCAG guidelines.
  - web content accessibility guidelines (WCAG)

Install @axe-core/playwright :
npm install @axe-core/playwright

https://www.npmjs.com/package/@axe-core/playwright

*/

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test(`Verify accessibility testing for all types`, async ({ page }, testInfo) => {

    await page.goto('https://demowebshop.tricentis.com/');
    //await page.goto('https://www.w3.org');

    //1. Scanning and detect all types of WCAG violations 
    const accessibilityScanResult = await new AxeBuilder({ page }).analyze();

    await testInfo.attach('accessibility results', {
        body: JSON.stringify(accessibilityScanResult, null, 2),
        contentType: 'application/json'
    });

    console.log(accessibilityScanResult);
    console.log(accessibilityScanResult.violations.length);

    //expect(accessibilityScanResult.violations).toEqual([]);
    expect(accessibilityScanResult.violations.length).toEqual(0);

});

test(`Verify accessibility testing for few types`, async ({ page }, testInfo) => {

    await page.goto('https://demowebshop.tricentis.com/');
    //await page.goto('https://www.w3.org');

    //1. Scanning and detect few WCAG violations 
    const accessibilityScanResult = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

    await testInfo.attach('accessibility results', {
        body: JSON.stringify(accessibilityScanResult, null, 2),
        contentType: 'application/json'
    });

    console.log(accessibilityScanResult);
    console.log(accessibilityScanResult.violations.length);

    //expect(accessibilityScanResult.violations).toEqual([]);
    expect(accessibilityScanResult.violations.length).toEqual(0);

});

test(`Verify accessibility testing for rules`, async ({ page }, testInfo) => {

    await page.goto('https://demowebshop.tricentis.com/');
    //await page.goto('https://www.w3.org');

    //1. Scanning and detect by rules WCAG violations 
    const accessibilityScanResult = await new AxeBuilder({ page }).disableRules(['duplicate-id']).analyze();

    await testInfo.attach('accessibility results', {
        body: JSON.stringify(accessibilityScanResult, null, 2),
        contentType: 'application/json'
    });

    console.log(accessibilityScanResult);
    console.log(accessibilityScanResult.violations.length);

    //expect(accessibilityScanResult.violations).toEqual([]);
    expect(accessibilityScanResult.violations.length).toEqual(0);

});