import puppeteer from "puppeteer";

export async function renderScreenshotWithPuppeteer(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot({
    encoding: "binary",
    type: "jpeg",
  });
  await browser.close();
  return screenshot;
}

const handler = async (req, context) => {
  const { url } = await req.json();

  const screenshot = await renderScreenshotWithPuppeteer(url);
  console.log(screenshot);
  return new Response(screenshot, {
    headers: { "content-type": "image/jpeg" },
  });
};

export default handler;
