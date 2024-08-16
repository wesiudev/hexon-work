"use client";
import Script from "next/script";

export default function Success() {
  return (
    <Script id="conversion" async>
      {`
        gtag('event', 'conversion', {'send_to': 'AW-16664946086/8Ko0CPGRhsoZEKbLu4o-'});
      `}
    </Script>
  );
}
