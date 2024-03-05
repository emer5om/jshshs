import Profile from '@/views/Profile'
import React from 'react'
import UserLayout from '../UserLayout'
import { Box } from '@mui/joy'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb'


export const metadata = {
    title: "User Profile | eRestro Single vendor",
    description: "User Profile, eRestro single vendor, orders foods and stuff ",
  };
const page = () => {

    return (
        <Box width={"100%"}>
            <Box mb={4}>
                <BreadCrumb page={["My Profile"]} />
            </Box>


            <UserLayout>
                <Profile />
            </UserLayout>
        </Box>
    )
}

export default page