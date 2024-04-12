import { Html, Head, Main, NextScript } from "next/document";
import { getInitColorSchemeScript } from '@mui/joy/styles';
import { useEffect } from "react";

export default function Document() {

  // useEffect(() => {
  //   const rootHtml = document.getElementById("root-html");

  //   if (rootHtml) {
  //     rootHtml.setAttribute("dir", "rtl");
  //   }
  // }, []);
  
  return (
    <Html id="root-html" lang="en"  >
      <Head />
        <body>
        {getInitColorSchemeScript()}

        <Main/>
        <NextScript/>
        <script src="https://checkout.razorpay.com/v1/checkout.js" />
        </body>
    </Html>
);
}
