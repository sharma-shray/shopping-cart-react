import { test, expect } from '@playwright/test';

test('shoping cart empty text exist', async ({ page }) => {
  await page.goto('localhost:3000/cart');

  const CartItemsText = page.getByAltText("Your Cart Items");  
  const CartEmptyText = page.getByAltText(" Your Shopping Cart is Empty");  

  expect(CartItemsText).toBeTruthy();
  expect(CartEmptyText).toBeTruthy();
});


test('All products should have an image', async ({ page }) => {
    
    await page.goto('localhost:3000/');
  
    const products = await page.$$('.product');
  
    // Iterate over each product and check if it contains an img element
    for (const product of products) {
      const img = await product.$('img');
      expect(img).not.toBeNull();
    }
  });
  
  test('All products should have a description', async ({ page }) => {
    await page.goto('localhost:3000/');
  
    const products = await page.$$('.product');
  
    // Iterate over each product and check if it contains a description element
    for (const product of products) {
      const description = await product.$('.description > p:first-child');
      expect(description).not.toBeNull(); 
    }
  });
  
  test('All products should have a price', async ({ page }) => {
    await page.goto('localhost:3000/');
  
    const products = await page.$$('.product');
  
    // Iterate over each product and check if it contains a price element
    for (const product of products) {
      const price = await product.$('.description > p:nth-child(2)');
      expect(price).not.toBeNull(); 
    }
  });


test('Button value should change when clicked', async ({ page }) => {
    
  await page.goto('localhost:3000/');

  const products = await page.$$('.product');

  // Iterate over each product and check if 
  // the Add To Cart button's value changes when clicked
  for (const product of products) {

    let initialText;
    let button;
    let newText;

    if (product) {
      button = await product.$('button.addToCartBttn');
      
      if (button) {
        initialText = await button.textContent();
      
        await button.click();
        
        // Wait for the text content to change
        await page.waitForTimeout(500);

        // Get the new text of the button
        newText = await button.textContent();
        
      }
    }

    // Ensure the button is present
    expect(button).not.toBeNull();

    expect(newText).not.toBe(initialText);
    expect(newText).toBe('Add To Cart  (1)');
  }
});