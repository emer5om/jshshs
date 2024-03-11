"use client";

import React from 'react'
import { Box, Grid } from '@mui/joy';
import UserOrderCard from '@/component/Cards/UserOrderCard';


// icons
const MyOrders = ({ data }) => {
  return (
    <Box maxWidth={"100%"} my={4}>
        <Grid container width={"100%"} spacing={2}>
          {data.map(item => {
            return (
              <Grid xs={12} md={6} maxWidth={"100%"}>
                <UserOrderCard
                  status={item.status}
                  image={item.image}
                  id={item.id}
                  name={item.name}
                  amount={item.amount}
                  type={item.type} 
                  qty={item.qty}
                  date={item.dateTime}
                  />
              </Grid>
            )
          })}
        </Grid>
    </Box>
  )
}

export default MyOrders