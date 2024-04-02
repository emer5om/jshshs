"use client"
import React, { useEffect } from 'react'
import { Box } from '@mui/joy'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb'
import MyOrders from '@/views/MyOrders';
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { isLogged } from "@/events/getters";
import { HeadTitle } from "@/component/HeadTitle";
import { useTranslation } from 'react-i18next';

const UserLayout = dynamic(() => import('@/pages/user/UserLayout'), {
    ssr: false
});




const index = () => {
    const { t } = useTranslation()

    return (

        <Box width={"100%"}>
            <HeadTitle title={"orders"} />

            <Box mb={4}>
                <BreadCrumb page={[{ name: t("my-profile"), link: "/user/profile" }, { name: t("my-orders"), link: "#" }]} />
            </Box>


            <UserLayout>
                <MyOrders />
            </UserLayout>
        </Box>
    )
}

export default index