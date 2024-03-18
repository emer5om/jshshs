import Profile from '@/views/Profile'
import React from 'react'
import UserLayout from '../UserLayout'
import { Box, Grid } from '@mui/joy'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb'
import Wallet from '@/views/Wallet'
import Transactions from '@/component/Cards/Transactions'
import TransactionsView from '@/views/TransactionsView'


export const metadata = {
    title: "Your Transactions | eRestro Single vendor",
    description: "Your Transactions, eRestro single vendor, orders foods and stuff ",
};


const data = [
    {
        id: "001",
        status: "success",
        date: "2024-02-01",
        type: "credit",
        message: "Balance credited against item collection",
        amount: 300.00
    },
    {
        id: "002",
        status: "success",
        date: "2024-02-02",
        type: "credit",
        message: "Balance credited against item collection",
        amount: 100.00
    },
    {
        id: "003",
        status: "failed",
        date: "2024-02-02",
        type: "credit",
        message: "Balance credited against item collection",
        amount: 150.00
    },
    {
        id: "003",
        status: "pending",
        date: "2024-02-02",
        type: "credit",
        message: "Balance credited against item collection",
        amount: 100.00
    },
    {
        id: "004",
        status: "authorized",
        date: "2024-02-02",
        type: "credit",
        message: "Balance credited against item collection",
        amount: 150.00
    }
]


const page = () => {

    return (
        <Box width={"100%"}>
            <Box mb={4}>
                <BreadCrumb page={[{ name: "My Profile", link: "/user/profile" }, { name: "Transactions", link: "#" }]} />
            </Box>


            <UserLayout>
                <Grid container my={4}>
                    <Grid xs={12}>
                        <TransactionsView />
                    </Grid>
                </Grid>
            </UserLayout>
        </Box>
    )
}

export default page