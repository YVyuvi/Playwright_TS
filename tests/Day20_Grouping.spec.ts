import test from '@playwright/test';

//npx playwright test tests/grouping.spec.ts --grep Group1

test.describe('Group1', async () => {

    test('Test1', async () => {
        console.log("******Test1**********");
    });

    test('Test2', async () => {
        console.log("******Test2**********");
    });

});

test.describe('Group2', async () => {

    test('Test3', async () => {
        console.log("******Test3**********");
    });

    test('Test4', async () => {
        console.log("******Test4**********");
    });

});

/*Annotations
only -    it will run only one test (particular)
skip - it will skip the particular test, we can skip based on some conditions
ex:
    test('Test3', async ({page, browserName}) => {
        test.skip(browserName==='chromium');
        console.log("******Test3**********");
    });
fail - it will fail the particular test
fixme - it will skip the test. (use when we not finished the implementation)
slow - it will triple the default timeout (i.e, 30 secs into 90 secs) (it should be mention inside test and first line (test.slow())) 
*/