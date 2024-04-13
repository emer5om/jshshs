import "@/styles/globals.css";
import RootLayout from "@/pages/layout";
import i18n from '../i18n';
import { I18nextProvider } from 'react-i18next';
import '@etchteam/next-pagination/dist/index.css'

export default function App({ Component, pageProps }) {

  return <I18nextProvider i18n={i18n}>
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  </I18nextProvider>;
}
