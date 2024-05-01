import Head from "next/head";
import {getHeaderTitle} from "@/helpers/functonHelpers";
import {useTranslation} from "react-i18next";

export const HeadTitle = ({title}) => {
    const { t } = useTranslation();
    return (
        <Head>

            <title>{getHeaderTitle(t(title))}</title>
            <meta name="description" content="Erestro: Your go-to for delicious food delivery. Explore mouthwatering recipes like Mary's maple bacon donuts. Order now and satisfy your cravings with Erestro."/>

        </Head>
    )
}