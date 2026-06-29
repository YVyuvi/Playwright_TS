import test from '@playwright/test';

test('Test1',{tag:'@sanity'}, async () => {
    console.log("******Test1**********");
});

/*
test('@sanity @regression Test1', async () => {
    console.log("******Test1**********");
});

*/

test('Test2',{tag:'@regression'}, async () => {
    console.log("******Test2**********");
});

test('Test3',{tag:['@sanity','@regression']}, async () => {
    console.log("******Test3**********");
});

test('Test4', async () => {
    console.log("******Test4**********");
});

/*
npx playwright test tests/tagging.spec.ts --grep "@sanity"
npx playwright test tests/tagging.spec.ts --grep "@regression"
npx playwright test tests/tagging.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"
npx playwright test tests/tagging.spec.ts --grep "@sanity|@regression"
npx playwright test tests/tagging.spec.ts --grep "@sanity" --grep-invert "@regression"
npx playwright test tests/tagging.spec.ts --grep-invert "@"
npx playwright test tests/tagging.spec.ts --grep-invert "@sanity|@regression"

Configure tags in playwright.config.ts file:
export default defineConfig({
grep: /@sanity/,
grepInvert:/@regression/
});
*/