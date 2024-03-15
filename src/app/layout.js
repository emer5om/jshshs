"use client";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { store, persistor } from "../store/store";
import Layout from "@/layouts/Layout";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import theme from "./theme";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  // const theme = useTheme()

  const pathname = usePathname();
  const isRootPath = pathname === "/";

  return (
    <html lang="en">
      <body>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            {/*<PersistGate loading={null} persistor={persistor}>*/}
            {!isRootPath ? <Layout>{children}</Layout> : children}
            {/*</PersistGate>*/}
          </Provider>
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
