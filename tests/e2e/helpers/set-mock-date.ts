import { Page } from '@playwright/test';

export const setMockDate = async (
  page: Page,
  date: string | Date = '2023-04-28',
) => {
  const mockNow = new Date(date).valueOf();

  await page.addInitScript(`{
    // Extend Date constructor to default to mockNow
    Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          super(${mockNow});
        } else {
          super(...args);
        }
      }
    }
    // Override Date.now() to start from mockNow
    const __DateNowOffset = ${mockNow} - Date.now();
    const __DateNow = Date.now;
    Date.now = () => __DateNow() + __DateNowOffset;
  }`);
};
