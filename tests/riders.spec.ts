import { test, expect } from '@playwright/test';

test('Check all riders links', async ({ page }) => {
  // Navigate to Hubtel riders page
  await page.goto('https://explore.hubtel.com/riders/');

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
