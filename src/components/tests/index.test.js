const { Builder, By, Key, until } = require('selenium-webdriver')
var webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const assert = require('assert')

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

var driver = new webdriver.Builder()
                 .withCapabilities(webdriver.Capabilities.chrome())
                 .build();

beforeEach(async function() {

vars = {}
})

afterEach(async function() {
await driver.quit();
})

describe('search button check', function() {

  it('search button check', async function() {
    await driver.get("http://localhost:5173/")
    await driver.findElement(By.linkText("Search")).click()
  })
})