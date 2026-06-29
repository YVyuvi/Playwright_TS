import test from '@playwright/test';

//test.describe.configure({mode:'parallel'})
//test.describe.configure({mode:'serial'})

test.describe('Group1', async () => {

    test('Test1', async () => {
        console.log("******Test1**********");
    });

    test('Test2', async () => {
        console.log("******Test2**********");
    });

    test('Test3', async () => {
        console.log("******Test3**********");
    });

    test('Test4', async () => {
        console.log("******Test4**********");
    });

});


//npx playwright test mytest.spec.ts --workers 3