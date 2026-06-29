import { test, expect, Locator } from '@playwright/test'

test("Verify Text Boxes", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const nameTextBox:Locator =  page.locator("#name");
    await expect(nameTextBox).toBeVisible();
    await expect(nameTextBox).toBeEnabled();

    const maxlength: string | null = await nameTextBox.getAttribute("maxlength");
    expect(maxlength).toBe("15");

    await nameTextBox.fill("John Max");
    const nameValue = await nameTextBox.inputValue();
    console.log("Text content of ele :", await nameTextBox.textContent()); // returns empty
    console.log("Input value of ele :", nameValue); // returns input value of the ele
    expect(nameValue).toBe("John Max")
})

test("Verify Radio Buttons", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const maleRadio:Locator =  page.locator("#male");
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    expect(await maleRadio.isChecked()).toBe(false);
    await maleRadio.check();
   expect(await maleRadio.isChecked()).toBe(true);
   await expect(maleRadio).toBeChecked();  //preferable
})

test.only("Verify Check Boxes", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1.Single Check Box
    const sundayCheck:Locator =  page.getByLabel("Sunday");
    await expect(sundayCheck).toBeVisible();
    await expect(sundayCheck).toBeEnabled();
    await sundayCheck.check();
    await expect(sundayCheck).toBeChecked();  //preferable

    //2.Multiple Check Boxes
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkBoxes:Locator[] = days.map(index => page.getByLabel(index));
    expect(checkBoxes.length).toBe(7);

    //select all check boxes
    for(const checkbox of checkBoxes)
    {
        checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    //Unselect last 3 check boxes
    for(const checkbox of checkBoxes.slice(-3))
    {
        checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }

    //Toggle Check Boxes: If checked - uncheck, If unchecked - check. Assert state flipped
    for(const checkbox of checkBoxes)
    {   
        if(await checkbox.isChecked())
        {
            checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }
        else{
            checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

    //select random check boxes - by index(1,3,6)
    const indexex:number[] = [0,1,3];

    for(const i of indexex)
    {
        await checkBoxes[i].check();
        await expect(checkBoxes[i]).toBeChecked();
    }

    //select check boxes based on the label
    const weekName = "Tuesday";
    for(const label of days)
    {   
        if(label.toLowerCase()===weekName.toLowerCase())
        {   
            const checkbox = page.getByLabel(label);
            checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

    await page.waitForTimeout(10000);
})