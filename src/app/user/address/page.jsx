import React from 'react'
import UserLayout from '../UserLayout'
import { Box } from '@mui/joy'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb'
import Address from '@/views/Address';


export const metadata = {
    title: "Your Address | eRestro Single vendor",
    description: "Your Address, eRestro single vendor, orders foods and stuff ",
};
const page = () => {

    return (
        <Box width={"100%"}>
            <Box mb={4}>
                <BreadCrumb page={[{ name: "My Profile", link: "/user/profile" }, { name: "Address", link: "#" }]} />
            </Box>


            <UserLayout>
                <Address />
            </UserLayout>
        </Box>
    )
}

export default page