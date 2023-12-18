import { UAParser } from "ua-parser-js";
import type { NextRequest } from "next/server";

import { geolocation } from "@vercel/edge";
import { ipAddress } from "@vercel/edge";

async function hashIpAddress(ipAddress: string) {
  // let encoder = new TextEncoder();
  // let data = encoder.encode(ipAddress);

  // let hash = await crypto.subtle.digest("sha256", data);

  // return Array.from(new Uint8Array(hash))
  //   .map((byte) => byte.toString(16).padStart(2, "0"))
  //   .join("");

  return ipAddress;
}

export async function getClientDataEdge(request: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    return {
      hashedIpAddress: "test_hashedIpAddress",
      country: "test_country",
      browser: "test_browser",
      os: "test_os",
    };
  }

  const headersList = request.headers;

  const { country } = geolocation(request);
  console.log(headersList);

  const ip = ipAddress(request);

  const hashedIpAddress = ip ? await hashIpAddress(ip) : undefined;

  const userAgent = headersList.get("user-agent") || undefined;

  let browser: string | undefined;
  let os: string | undefined;

  console.log(userAgent);

  if (userAgent) {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    browser = result.browser.name;
    os = result.os.name;
  }
  console.log(browser, os);
  return {
    hashedIpAddress,
    country,
    browser,
    os,
  };
}
