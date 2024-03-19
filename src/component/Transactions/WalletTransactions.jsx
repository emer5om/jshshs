"use client";

import React, { useState, useEffect } from 'react'

import { Box, Card, CardContent, Grid, Typography } from '@mui/joy';
import Transactions from '../Cards/Transactions';

import { get_transactions } from "@/interceptor/routes"

import TransactionSkeleton from "../Skeleton/TransactionSkeleton"
import { useSelector, useDispatch } from 'react-redux';
import { setCredit } from "@/store/reducers/walletSlice"

const WalletTransactions = () => {
  const credit = useSelector((state) => state.wallet.credit);
  const dispatch = useDispatch();

  const [allTransactions, getAllTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const getTransactions = async () => {
    try {
      const transactions = await get_transactions({ transaction_type: "wallet", type: 'credit' })
      if (transactions.error) {
        return toast.error(transactions.message)
      } else {
        setLoading(false)
        dispatch(setCredit(transactions.data))
      }
      console.log("wallet transactions type credit", transactions)
    } catch (error) {
      console.error("got error while fetching all transactions", error)
    }
  }

  useEffect(() => {
    if (credit.length === 0) {
      getTransactions()
    } else {
      setLoading(false)
      getAllTransactions(credit)
    }
  }, [])

  return (
    <Box minHeight={200}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }} maxWidth={"100%"} maxHeight={"100%"}>
        {loading ?
          [1, 2, 3, 4].map((item, index) => {
            return (
              <Grid key={index} xs={12} md={3} width={"100%"}>
                <TransactionSkeleton />
              </Grid>
            )
          })
          :
          allTransactions.length > 0 && allTransactions.map((item, index) => {
            return (
              <Grid xs={12} md={3} key={index}>
                <Transactions id={item.id} status={item.status.toLowerCase()} date={item.date} type={item.type} message={item.message} amount={item.amount} />
              </Grid>
            )
          })
        }


        {!loading && allTransactions.length === 0 &&
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
    </Box>
  )
}

export default WalletTransactions