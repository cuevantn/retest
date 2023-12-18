import { UAParser } from "ua-parser-js";
import { headers } from "next/headers";
import crypto from "crypto";

function hashIpAddress(ipAddress: string) {
  const hash = crypto.createHash("sha256");
  hash.update(ipAddress);
  return hash.digest("hex");
}

function getClientData() {
  if (process.env.NODE_ENV === "development") {
    return {
      hashedIpAddress: "test_hashedIpAddress",
      country: "test_country",
      browser: "test_browser",
      os: "test_os",
    };
  }

  const headersList = headers();
  const ip = headersList.get("x-vercel-forwarded-for") || undefined;
  const hashedIpAddress = ip ? hashIpAddress(ip) : undefined;
  const country = headersList.get("x-vercel-ip-country") || undefined;
  const userAgent = headersList.get("user-agent") || undefined;

  let browser: string | undefined;
  let os: string | undefined;

  if (userAgent) {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    browser = result.browser.name;
    os = result.os.name;
  }

  return {
    hashedIpAddress,
    country,
    browser,
    os,
  };
}

export { getClientData };
