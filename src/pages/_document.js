import { Html, Head, Main, NextScript } from "next/document";
import { getInitColorSchemeScript } from '@mui/joy/styles';

export default function Document() {
  
  return (
    <Html id="root-html" lang="en" >
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
