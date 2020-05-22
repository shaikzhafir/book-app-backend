const puppeteer = require("puppeteer");

export async function scrape(bookTitle){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log('im running')
  await page.goto("https://www.bookdepository.com/search?searchTerm=" + bookTitle + "&search=Find+book")
  // needs to wait cos lazy loaded
  await page.waitFor(500);
  const image = await page.evaluate(() => document.querySelector("div.item-img a img").getAttribute('src'))
  console.log(image);
  await page.screenshot({path: 'example.png'});

  await browser.close();
}