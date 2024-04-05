"use client"
import React from 'react'
import { Box } from '@mui/joy';
import dynamic from "next/dynamic";
import { HeadTitle } from "@/component/HeadTitle";
import { useTranslation } from 'react-i18next';
// import OffersView from '@/views/OffersView';
const OrderPlaced = dynamic(() => import('@/views/OrderPlaced'), {
    ssr: false
});

const BreadCrumb = dynamic(() => import("@/component/BreadCrumb/BreadCrumb"), {
    ssr: false
  });


const index = () => {
    const { t } = useTranslation()

    return (
        <Box>
            <HeadTitle title={"Order placed"} />
            <Box>
                <BreadCrumb page={[{ name: t("Order placed"), link: "#" }]} />
            </Box>
            <Box>
                <OrderPlaced />
            </Box>
        </Box>
    )
}

export default index