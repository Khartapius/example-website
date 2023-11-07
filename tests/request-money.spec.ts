import { test, expect } from '@playwright/test';

test('Check all request money links', async ({ page }) => {
  // Navigate to Hubtel take payments page
  await page.goto('https://explore.hubtel.com/request-money-from-anyone/');

  // Find and collect all anchor elements on the page
  const links = await page.$$eval('a', (elements) => 
    elements.map((element) => element.getAttribute('href'))
  );

  // Loop through each link and check if it's working
  for (const link of links) {
    if (link) {
      const response = await page.goto(link);
      const statusCode = response?.status();
      expect(statusCode).toBe(200);
    } 
  }
});
