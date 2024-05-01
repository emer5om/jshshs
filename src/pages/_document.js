import { Html, Head, Main, NextScript } from "next/document";
import { getInitColorSchemeScript } from "@mui/joy/styles";
import Script from "next/script";
import { useEffect } from "react";

export default function Document() {

  useEffect(() => {
    // Check if the item exists in local storage
    console.log("hello")

    if (localStorage.getItem("RTL") !== null) {
      var retrievedIsRTL = localStorage.getItem("RTL");
      // Now you can use the retrieved boolean value
      console.log("hello")
      if (retrievedIsRTL) {
          console.log("Text is RTL");
      } else {
          console.log("Text is not RTL");
      }
    } else {
      console.log("Item not found in local storage");
    }
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return (
    <Html id="root-html" lang="en">
      <Head >
        <meta name="description" content="Erestro: Your go-to for delicious food delivery. Explore mouthwatering recipes like Mary's maple bacon donuts. Order now and satisfy your cravings with Erestro." />
      </Head>
      <body>
        {getInitColorSchemeScript()}
        <Main />
        <NextScript />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>
    </Html>
  );
}
