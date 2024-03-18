"use client";

import React, { useState, useEffect } from 'react'
import { Box, Card, CardContent, Chip, Typography, useTheme, Grid, CardCover } from '@mui/joy';
import { format } from 'date-fns';
import { get_transactions } from "@/interceptor/routes"
import { toast } from 'react-toastify';
import Transactions from '@/component/Cards/Transactions';


const TransactionsView = () => {

    const currentDate = new Date();
    const [allTransactions, getAllTransactions] = useState([])
    const getTransactions = async () => {
        try {
            const transactions = await get_transactions({ transaction_type: "transaction" })
            if (transactions.error) {
                return toast.error(transactions.message)
            } else {
                getAllTransactions(transactions.data)
            }
        } catch (error) {
            console.error("got error while fetching all transactions", error)
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])


    return (
        <Grid container spacing={2} ml={1}>
            {allTransactions.length > 0 &&
                allTransactions.map((item, index) => {
                    return (
                        <Grid xs={12} md={3} key={index}>
                            <Transactions id={item.id}
                                status={(item.status).toLowerCase()} date={item.date} type={item.type} message={item.message} amount={item.amount} />
                        </Grid>
                    )
                })
            }
            {allTransactions.length === 0 &&
                <Grid xs={12} >
                    <Card sx={{ border: 'none', maxWidth: "100%", display: "flex", alignItems: "center", justifyContent: 'center' }}>
                        <CardContent >
                            <Box component={"img"} src={"/images/assets/no-transactions.jpg"}
                                height={400}
                            ></Box>
                            <Typography textAlign={"center"} fontSize={"xl"} fontWeight={"lg"} >
                                No Transactions
                            </Typography>
                            <Typography textAlign={"center"} fontSize={"lg"} fontWeight={"md"} >
                                You have not made any transactions so far.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            }
        </Grid>
    )
}

export default TransactionsView