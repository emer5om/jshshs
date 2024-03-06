import Profile from '@/views/Profile'
import React from 'react'
import UserLayout from '../UserLayout'
import { Box } from '@mui/joy'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb'
import Wallet from '@/views/Wallet'


export const metadata = {
    title: "Your Wallet | eRestro Single vendor",
    description: "Your Wallet, eRestro single vendor, orders foods and stuff ",
};
const page = () => {

    return (
        <Box width={"100%"}>
            <Box mb={4}>
                <BreadCrumb page={[{ name: "My Profile", link: "/user/profile" }, {name: "Wallet", link: "#"}]} />
            </Box>


            <UserLayout>
                <Wallet />
            </UserLayout>
        </Box>
    )
}

export default page