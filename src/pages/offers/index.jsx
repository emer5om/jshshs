"use client"
import React from 'react'
import { Box } from '@mui/joy';
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import dynamic from "next/dynamic";
import { HeadTitle } from "@/component/HeadTitle";
import { useTranslation } from 'react-i18next';
// import OffersView from '@/views/OffersView';
const OffersView = dynamic(() => import('@/views/OffersView'), {
    ssr: false
});


const index = () => {
    const { t } = useTranslation()

    return (
        <Box>
            <HeadTitle title={"offers"} />
            <Box>
                <BreadCrumb page={[{ name: t("offers"), link: "#" }]} />
            </Box>
            <Box>
                <OffersView />
            </Box>
        </Box>
    )
}

export default index