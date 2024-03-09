"use client";

import React from 'react'

import { Box, Grid } from '@mui/joy';
import Transactions from '../Cards/Transactions';

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

const WalletTransactions = () => {
  return (
    <Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {data.map((item, index) => {
          return (
            <Grid xs={12} md={3} key={index}>
              <Transactions id={item.id} status={item.status} date={item.date} type={item.type} message={item.message} amount={item.amount} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default WalletTransactions