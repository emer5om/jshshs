import { Quicksand } from "next/font/google";
import "./globals.css";
import Layout from "@/layouts/Layout";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import theme from "./theme";

export const metadata = {
  title: "eRestro Single vendor",
  description: "eRestro single vendor, orders foods and stuff ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <Layout>{children}</Layout>
        </CssVarsProvider>
      </body>
    </html>
  );
}
