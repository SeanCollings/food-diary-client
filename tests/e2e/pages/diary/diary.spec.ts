import { test, expect } from '@playwright/test';
import { setMockDate } from '../../helpers/set-mock-date';

test.beforeEach(async ({ page }) => {
  await setMockDate(page);
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
});

test.describe(() => {
  test('add and remove from beverage wellness values', async ({ page }) => {
    await page.getByTestId('water-add').click();
    await page.getByTestId('water-add').click();
    await page.getByTestId('water-add').click();
    await page.getByTestId('water-add').click();
    await page.getByTestId('water-add').click();
    await page.getByTestId('water-remove').click();

    await page.getByTestId('tea_coffee-add').click();
    await page.getByTestId('tea_coffee-add').click();
    await page.getByTestId('tea_coffee-add').click();
    await page.getByTestId('tea_coffee-add').click();
    await page.getByTestId('tea_coffee-remove').click();
    await page.getByTestId('tea_coffee-remove').click();

    await page.getByTestId('alcohol-add').click();
    await page.getByTestId('alcohol-add').click();
    await page.getByTestId('alcohol-remove').click();

    await expect(page).toHaveScreenshot('add-remove-beverage-wellness.png');
  });
});

// https://enreina.com/blog/e2e-testing-in-next-js-with-playwright-vercel-and-github-actions-a-guide-with-example/
// https://kontent.ai/blog/next-js-playwright-tests-github-action/
// https://echobind.com/post/playwright-with-next-auth
