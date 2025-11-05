import puppeteer from "puppeteer-core";
import { getStore } from "@netlify/blobs";

export async function renderScreenshotWithPuppeteer(url) {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot({
    encoding: "binary",
    type: "jpeg",
  });
  await browser.close();
  return screenshot;
}

const getDefaultImagesStore = () => {
  return getStore("default-images", {
    siteID: process.env.NETLIFY_SITE_ID,
    token: process.env.NETLIFY_ACCESS_TOKEN,
  });
};

const handler = async (_req, context) => {
  // @todo Only allow *.crossroads.net + Netlify preview for the URL param  and requester.
  // @todo Read Me: How to install Chrome locally + error messaging to direct to the read me
  // const store = getDefaultImagesStore();
  // const url = new URL(context.url).searchParams.get("url");
  // let image = "";

  // try {
  //   image = await store.get(url, { type: "stream" });

  //   if (!image) {
  //     image = await renderScreenshotWithPuppeteer(url);
  //     await store.set(url, image);
  //   }
  // } catch (error) {
  //   console.error(error);
  // } finally {
  //   return new Response(image, {
  //     headers: { "content-type": "image/jpeg" },
  //   });
  // }

  return new Response(
    JSON.stringify({
      CHROME_PATH: process.env.CHROME_PATH ?? "None",
    })
  );
};

export default handler;

export const config = {
  path: "/api/screenshot",
};
