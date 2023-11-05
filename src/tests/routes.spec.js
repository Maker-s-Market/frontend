const { chromium } = require('playwright');
let browser;
let page;
beforeAll(async () => {
  browser = await chromium.launch();
});
afterAll(async () => {
  await browser.close();
});
beforeEach(async () => {
  page = await browser.newPage();
});
afterEach(async () => {
  await page.close();
});

it('check logo route', async () => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'logo' }).click();
  expect(await page.url()).toBe('http://localhost:5173/');
});

it('check makers trademark text', async () => {
  await page.goto('http://localhost:5173/');
})

it('check search button click', async () => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Search' }).click();
  expect(await page.url()).toBe('http://localhost:5173/search');
})

it('check sign in button click', async () => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Sign In' }).click();
  expect(await page.url()).toBe('http://localhost:5173/signin');
})

it('check sign up button', async () => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Create an Account' }).click();
  expect(await page.url()).toBe('http://localhost:5173/signup');
})

/* 
it('create new user', async () => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Create an Account' }).click();
  await page.getByPlaceholder('Name', { exact: true }).click();
  await page.getByPlaceholder('Name', { exact: true }).fill('Juliana Testadora');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('donajulianavendedora');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('donajulianavendedora@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('passwordsegura');
  await page.getByPlaceholder('City').click();
  await page.getByPlaceholder('City').fill('Aveiro');
  await page.getByPlaceholder('Region').click();
  await page.getByPlaceholder('Region').fill('Aveiro');
  await page.getByRole('button', { name: 'Sign Up' }).click();
}) */
