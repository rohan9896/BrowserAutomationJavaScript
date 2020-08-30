const puppeteer = require("puppeteer");
const data = require("./config.json");
let noOfPosts = process.argv[2];


(async function () {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto("https://www.instagram.com/", { waitUntil: "networkidle2" });
  await page.type("input[name='username']", data.user, { delay: 15 });
  await page.type("input[name='password']", data.pwd, { delay: 15 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    await page.click("button[type='submit']"),
  ]);

  await page.type("input[placeholder='Search']", "");  // username of the person
  await page.waitForSelector(".drKGC .fuqBx a", { visible: true });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    await page.click(".drKGC .fuqBx a"),
  ]);

  await page.waitForSelector("._9AhH0", { visible: true });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    await page.click("._9AhH0"),
  ]);

  let i = 0;

  do {
    await page.waitForSelector(".fr66n button", { visible: true });
    await page.click(".fr66n button");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      page.click(" ._65Bje.coreSpriteRightPaginationArrow"),
    ]);
    i++;
  } while (i < noOfPosts){

  }


  await browser.close();
})();
