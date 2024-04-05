"use client"
import React from 'react'
import { Box } from '@mui/joy'

import dynamic from "next/dynamic";
import { validateView } from "@/helpers/authGuard";
import { HeadTitle } from "@/component/HeadTitle";
import { useTranslation } from 'react-i18next';

const Wallet = dynamic(() => import('@/views/Wallet'), {
    ssr: false
});
const UserLayout = dynamic(() => import('@/pages/user/UserLayout'), {
    ssr: false
});

const BreadCrumb = dynamic(() => import("@/component/BreadCrumb/BreadCrumb"), {
    ssr: false
  });

const index = () => {
    <HeadTitle title={"wallet"} />
    const { t } = useTranslation()

    return (
        <Box width={"100%"}>
            <Box mb={4}>
                <BreadCrumb page={[{ name: t("my-profile"), link: "/user/profile" }, { name: t("wallet"), link: "#" }]} />
            </Box>


            <UserLayout>
                <Wallet />
            </UserLayout>
        </Box>
    )
}

export default validateView(index)