"use client";

import React, { useState, useEffect } from 'react'
import { Box, Card, CardContent, Chip, Typography, useTheme, Grid, CardCover } from '@mui/joy';
import { format } from 'date-fns';
import { get_transactions } from "@/interceptor/routes"
import toast from 'react-hot-toast';
import Transactions from '@/component/Cards/Transactions';
import {useTranslation} from "react-i18next";


const TransactionsView = () => {
    const {t} = useTranslation()

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
        <Grid sx={{marginTop:1}} container spacing={2} ml={1} justifyContent={"start"}>
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
              <Grid xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Box sx={{ maxWidth: "100%", display: "flex", alignItems: "center", justifyContent: 'center' }}>
                  <Box sx={{ border: 'none', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center' }}>
                      <img src={"/images/assets/no-transactions.svg"} height={400} />
                      <Typography textAlign={"center"} fontSize={"xl"} fontWeight={"lg"} >
                      {t("No-Transactions")}
                      </Typography>
                      <Typography textAlign={"center"} fontSize={"lg"} fontWeight={"md"} >
                          {t("You-Have-Not-Made-Any-Transactions-So-Far")}
                      </Typography>
                  </Box>
              </Box>
          </Grid>
          

            }
        </Grid>
    )
}

export default TransactionsView