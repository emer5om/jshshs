"use client"
// import Profile from '@/views/Profile'
import React from 'react'
import { Box, Chip, Typography } from '@mui/joy'

import { validateView } from "@/helpers/authGuard";
import dynamic from "next/dynamic";
import { HeadTitle } from "@/component/HeadTitle";

import Refer from '@/views/Refer'
import { useTranslation } from 'react-i18next';

const BreadCrumb = dynamic(() => import("@/component/BreadCrumb/BreadCrumb"), {
    ssr: false
  });
// export const metadata = {
//     title: "Refer & Earn | eRestro Single vendor",
//     description: "Refer & Earn, eRestro single vendor, orders foods and stuff ",
// };

const UserLayout = dynamic(() => import('@/pages/user/UserLayout'), {
    ssr: false
});
const index = () => {

    const { t } = useTranslation()


    return (
        <Box width={"100%"}>
            <HeadTitle title={"refer"} />

            <Box mb={4}>
                <BreadCrumb page={[{ name: t("my-profile"), link: "#" }, { name: t("refer-and-earn"), link: "#" }]} />
            </Box>


            <UserLayout>
                <Refer />
            </UserLayout>
        </Box>
    )
}

export default validateView(index)