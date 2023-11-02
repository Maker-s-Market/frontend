const { Builder, By, Key, until } = require('selenium-webdriver')
var webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const geckodriver = require('geckodriver');
const assert = require('assert')



// firefox.setDefaultService(new firefox.ServiceBuilder(geckodriver.path).build());

//new firefox.ServiceBuilder("C:\\Users\\Mateus\\geckodriver.exe").build();


var driver = new webdriver.Builder()
                 .withCapabilities(webdriver.Capabilities.firefox())
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