"use client";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Layout from "@/layouts/Layout";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import theme from "./theme";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

// export const metadata = {
//   title: "eRestro Single vendor",
//   description: "eRestro single vendor, orders foods and stuff ",
// };

export default function RootLayout({ children }) {
  // const theme = useTheme()
  return (
    <html lang="en">
      <body>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <Layout>{children}</Layout>
          <ProgressBar
            height="4px"
            color={"#fcd34d"}
            options={{ showSpinner: false }}
            shallowRouting
          />
        </CssVarsProvider>
      </body>
    </html>
  );
}
