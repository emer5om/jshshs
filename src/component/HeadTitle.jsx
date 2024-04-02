import Head from "next/head";
import {getHeaderTitle} from "@/helpers/functonHelpers";
import {useTranslation} from "react-i18next";

export const HeadTitle = ({title}) => {
    const { t } = useTranslation();
    return (
        <Head>
            <title>{getHeaderTitle(t(title))}</title>
        </Head>
    )
}