import Profile from '@/views/Profile'
import React from 'react'
// import UserLayout from '../UserLayout'
import { Box } from '@mui/joy'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb'
import {validateView} from "@/helpers/authGuard";
import dynamic from "next/dynamic";
import {HeadTitle} from "@/component/HeadTitle";
import {useTranslation} from "react-i18next";
const UserLayout = dynamic(() => import('@/pages/user/UserLayout'), {
    ssr: false
});


const index = () => {

    const {t} = useTranslation()
    return (
        <Box width={"100%"}>
            <HeadTitle title={"my-profile"} />

            <Box mb={4}>
                <BreadCrumb page={[{ name: t("my-profile"), link: "#" }]} />
            </Box>


            <UserLayout>
                <Profile />
            </UserLayout>
        </Box>
    )
}

export default validateView(index)