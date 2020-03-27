const qawolf = require('qawolf')

let browser
let page

/* eslint-env jest */
beforeAll(async () => {
  browser = await qawolf.launch()
  const context = await browser.newContext()
  await qawolf.register(context)
  page = await context.newPage()
})

afterAll(async () => {
  await qawolf.stopVideos()
  await browser.close()
})

test('linkAndSearch', async () => {
  await page.goto('http://localhost:8080/')
  await page.click('text="Get Started"')

  // test will fail if header never appears
  await page.waitFor('h1#get-started')

  await page.type('[aria-label="Search"]', 'hello')
  await page.click('ul a[href="/"]')

  // test will fail if header never appears
  await page.waitFor('h1#hello-vuepress')
})
