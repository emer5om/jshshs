"use client";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Layout from "@/layouts/Layout";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import theme from "./theme";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
          <ToastContainer />
        </CssVarsProvider>
      </body>
    </html>
  );
}
