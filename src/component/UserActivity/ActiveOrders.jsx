"use client"

import { Box, Card, CardContent, CardOverflow, useTheme, Typography } from '@mui/joy'
import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'

// icons

import MapPin5LineIcon from "remixicon-react/MapPin5LineIcon"
import ArrowRightCircleFillIcon from "remixicon-react/ArrowRightCircleFillIcon"

const ActiveOrders = () => {
  const theme = useTheme()
  return (
    <Box bgcolor={theme.palette.background.activeOrders} px={4} py={3} borderRadius={theme.radius.xl}
      boxShadow={"8px 0px 36px 0px #002F3514"}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <SectionHeading title={"Active Orders"} color='currency'></SectionHeading>

        <Card orientation="horizontal" sx={{ mt: 2, my: 3 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", flexDirection: "row", px: 1, py: 2 }}>
            <Box >
              <CardOverflow>
                <MapPin5LineIcon color={theme.palette.text.currency} />
              </CardOverflow>
            </Box>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
              <Box>
                <Typography fontWeight="md" fontSize={"xl2"}>
                  Paneer Tikka Masala And More
                </Typography>
                <Typography fontWeight={"sm"} fontSize={"xl"}>
                  Your Order is Out For Delivery
                </Typography>
              </Box>
              <Box>
                <ArrowRightCircleFillIcon color={theme.palette.text.currency} size={theme.fontSize.xl2} />
              </Box>
            </Box>
          </CardContent>
        </Card>

      </Box>

    </Box>
  )
}

export default ActiveOrders