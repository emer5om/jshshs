import React from 'react'
import { Box } from '@mui/joy'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb'
import Address from '@/views/Address';
import { validateView } from "@/helpers/authGuard";
import dynamic from "next/dynamic";
import { HeadTitle } from "@/component/HeadTitle";
import { useTranslation } from 'react-i18next';
const UserLayout = dynamic(() => import('@/pages/user/UserLayout'), {
    ssr: false
});

export const metadata = {
    title: "Your Address | eRestro Single vendor",
    description: "Your Address, eRestro single vendor, orders foods and stuff ",
};
const index = () => {
    const { t } = useTranslation()

    return (
        <Box width={"100%"}>
            <HeadTitle title={"addresses"} />

            <Box mb={4}>
                <BreadCrumb page={[{ name: t("my-profile"), link: "/user/profile" }, { name: t('address'), link: "#" }]} />
            </Box>


            <UserLayout>
                <Address />
            </UserLayout>
        </Box>
    )
}

export default validateView(index)