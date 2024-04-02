"use client"
import React from 'react'
import { Box } from '@mui/joy';
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import Favorites from '@/views/Favorites';
import { validateView } from "@/helpers/authGuard";
import dynamic from "next/dynamic";
import { HeadTitle } from "@/component/HeadTitle";
import { useTranslation } from 'react-i18next';



const UserLayout = dynamic(() => import('@/pages/user/UserLayout'), {
    ssr: false
});

const index = () => {
    const { t } = useTranslation()

    return (

        <Box width={"100%"}>
            <HeadTitle title={"favourites"} />

            <Box mb={4}>
                <BreadCrumb page={[{ name: t("my-profile"), link: "/user/profile" }, { name: t("favourites"), link: "#" }]} />
            </Box>


            <UserLayout>
                <Favorites />
            </UserLayout>
        </Box>
    )
}

export default validateView(index)