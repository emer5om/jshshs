import Profile from '@/views/Profile'
import React from 'react'
import UserLayout from '../UserLayout'
import { Box, Chip, Typography } from '@mui/joy'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb'
import Refer from '@/views/Refer'


export const metadata = {
    title: "Refer & Earn | eRestro Single vendor",
    description: "Refer & Earn, eRestro single vendor, orders foods and stuff ",
};
const page = () => {



    return (
        <Box width={"100%"}>
            <Box mb={4}>
                <BreadCrumb page={[{ name: "My Profile", link: "#" }, { name: "Refer & Earn", link: "#" }]} />
            </Box>


            <UserLayout>
                <Refer />
            </UserLayout>
        </Box>
    )
}

export default page