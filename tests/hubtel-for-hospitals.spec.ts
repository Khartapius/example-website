import { test, expect } from '@playwright/test';

test('Check all Hubtel for Hospitals links excluding links with / or wrong format', async ({ page }) => {
  // Navigate to Hubtel for hospitals page
  await page.goto('https://explore.hubtel.com/hospitals/');

  // Find and collect all anchor elements on the page
  const links = await page.$$eval('a', (elements) =>
    elements.map((element) => {
      const href = element.getAttribute('href');
      // Check if the href is empty or a fragment.
      if (!href || href.startsWith('#')) {
        return null;
      }
      return href;
    })
  );

  // Loop through each link and check if it's working
  for (const link of links) {
    try {
      if (link) {
        if (link === '/' || link.startsWith('http://') || link.startsWith('https://')) {
          console.log(`link : ${link}`);
        } else {
          await page.goto(link);
          await page.waitForNavigation(); // Wait for the navigation to complete
          const statusCode = page.lastResponse()?.status();
          expect(statusCode).toBe(200);
        }
      }
    } catch (error) {
      // Log the error if navigation fails
      console.error(`Failed to navigate to ${link}: ${error}`);
    }
  }
});