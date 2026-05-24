import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

const pageMarkup = fs.readFileSync(
  path.join(process.cwd(), "app/content/body.html"),
  "utf8"
);

export default function HomePage() {
  return (
    <>
      <main suppressHydrationWarning dangerouslySetInnerHTML={{ __html: pageMarkup }} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
