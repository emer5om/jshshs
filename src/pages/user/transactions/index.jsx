"use client"
import Profile from '@/views/Profile'

import React from 'react'
import { Box, Grid } from '@mui/joy'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb'
import Wallet from '@/views/Wallet'
import Transactions from '@/component/Cards/Transactions'
import TransactionsView from '@/views/TransactionsView'
import { validateView } from "@/helpers/authGuard";
import dynamic from "next/dynamic";
import { HeadTitle } from "@/component/HeadTitle";

const UserLayout = dynamic(() => import('@/pages/user/UserLayout'), {
    ssr: false
});



import { useTranslation } from "react-i18next";


const index = () => {
    const { t } = useTranslation()

    return (
        <Box width={"100%"}>
            <HeadTitle title={"transactions"} />

            <Box mb={4}>
                <BreadCrumb page={[{ name: t("my-profile"), link: "/user/profile" }, { name: t("transactions"), link: "#" }]} />
            </Box>


            <UserLayout>
                <TransactionsView />
            </UserLayout>
        </Box>
    )
}

export default validateView(index)