"use client";
import "./globals.css";
import { store, persistor } from "../store/store";
import Layout from "@/layouts/Layout";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import theme from "./theme";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import {useEffect} from "react";
import {onAppLoad} from "@/events/events";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000,
      refetchOnWindowFocus: false, // default: true
    },
  },
});
export default function RootLayout({ children }) {
  // const theme = useTheme()

  const pathname = usePathname();
  const isRootPath = pathname === "/";
  useEffect(() => {
    onAppLoad()
  }, []);

  return (
    <html lang="en">
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=places`}
        type="text/javascript"
        async
      />

      <body>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              {/*<PersistGate loading={null} persistor={persistor}>*/}
              {isRootPath ? children : <Layout>{children}</Layout>}
              {/*</PersistGate>*/}
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>

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
