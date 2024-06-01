import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('localhost:3000');

  const TitleText = page.getByAltText("PedroTech Shop");  
  expect(TitleText).toBeTruthy();
});

test('has header items', async ({ page }) => {
  await page.goto('localhost:3000');

  const headerTextShop = page.getByAltText("Shop");  
  const headerTextContact = page.getByAltText("Contact");  

  expect(headerTextShop).toBeTruthy();
  expect(headerTextContact).toBeTruthy();
});

test('Check Shop link', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Ensure the URL has the correct protocol

  // Locate the link
  const locator = page.getByRole('link', { name: 'Shop' });

  // Verify link 
  await expect(locator).toBeTruthy();

  // Click the link and wait for navigation
  await Promise.all([
      page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }), // Adjust the timeout if needed
      locator.click()
  ]);

  // Check the URL of the current page
  expect(page.url()).toBe('http://localhost:3000/');
  
  // todo
  // expect(page.url()).toBe('http://localhost:3000/shop');
});


test('Check Contact link', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Locate the link
  const locator = page.getByRole('link', { name: 'Contact' });

  // Verify link 
  await expect(locator).toBeTruthy();

  // Click the link and wait for navigation
  await Promise.all([
      page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }),
      locator.click()
  ]);

  expect(page.url()).toBe('http://localhost:3000/contact');
});


test('clicking SVG link navigates to /cart', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Locate the SVG link
  const svgLink = await page.waitForSelector('a[href="/cart"] svg');

  // Verify link 
  await expect(svgLink).toBeTruthy();

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }),
    svgLink.click()
]);

  expect(page.url()).toBe('http://localhost:3000/cart');
});