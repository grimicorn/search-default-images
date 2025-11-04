import { renderScreenshotWithPuppeteer } from "@/app/lib/puppeteer";
import { unstable_noStore } from "next/cache";

export async function POST(request) {
  // do not cache
  unstable_noStore();

  // parse request and get the website URL to render
  const data = await request.json();

  // get the screenshot
  const screenshot = await renderScreenshotWithPuppeteer(data.url);

  // @todo Store the image and return the path to it instead.
  // @todo Allow for busting the cache to get a new one.

  // return the image
  return new Response(screenshot, {
    headers: { "content-type": "image/jpeg" },
  });
}
