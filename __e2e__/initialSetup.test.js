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

test('initialSetup', async () => {
  await page.goto('http://localhost:8080/')

  // test will fail if the header never appears
  await page.waitFor('h1#hello-vuepress')
})
