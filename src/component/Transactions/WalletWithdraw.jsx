"use client"

import React from 'react'


import { Box, Grid } from '@mui/joy';
import Transactions from '../Cards/Transactions';

const data = [
  {
    id: "005",
    status: "success",
    date: "2024-02-01",
    type: "credit",
    message: "For Personal use",
    amount: 200.00
  },
  {
    id: "006",
    status: "pending",
    date: "2024-02-02",
    type: "credit",
    message: "I needed it",
    amount: 100.00
  },
]


const WalletWithdraw = () => {
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

export default WalletWithdraw