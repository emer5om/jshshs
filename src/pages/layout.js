"use client";
import { store } from "@/store/store";
import Layout from "@/layouts/Layout";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import theme from "@/theme";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Provider, useSelector } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { onAppLoad } from "@/events/events";
import Loader from "@/component/Loader";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import BackToTop from "@/component/Buttons/BackToTop";





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
    onAppLoad();
  }, []);

  

  return (
    <>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=places`}
          type="text/javascript"
          async
        />
      </Head>
      <CssVarsProvider defaultMode="system" theme={theme}   dir={"rtl"}>
        
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            
            {/*<PersistGate loading={null} persistor={persistor}>*/}
            <Loader />
            {isRootPath ? children : <Layout>{children}</Layout>}
            {/*</PersistGate>*/}
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <BackToTop />

        <ProgressBar
          height="4px"
          color={"#fcd34d"}
          options={{ showSpinner: false }}
          shallowRouting
        />
        <Toaster position="top-right" />
      </CssVarsProvider>
    </>
  );
}
