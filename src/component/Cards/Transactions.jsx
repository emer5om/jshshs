"use client";

import React from 'react'
import { Box, Card, CardContent, Chip, Typography, useTheme } from '@mui/joy';
import { format } from 'date-fns';

// icons
import { RiMoneyDollarCircleLine } from "@remixicon/react"

const Transactions = ({ id, status, date, type, message, amount }) => {
    const theme = useTheme()

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');

    return (
        <Card sx={{ borderRadius: 'lg', width: "100%" }}>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Typography textColor={"text.menuText"} fontSize={"md"} fontWeight={"lg"}>
                        ID:
                    </Typography>
                    <Typography textColor={"text.menuText"} fontSize={"md"} fontWeight={"lg"}>
                        #{id ?? "000"}
                    </Typography>
                </Box>
                <Box>
                    <Chip
                        color={
                            status === "success" ? "success" : (status === "pending" ? "warning" :
                                (status === "canceled" || status === "failed" ? "danger" : "primary"))
                        }
                        disabled={false}
                        size="lg"
                        sx={{ borderRadius: "md", textTransform: "capitalize" }}
                    >
                        {status ?? "pending"}
                    </Chip>
                </Box>
            </Box>

            <CardContent sx={{
                borderTop: `1px ${theme.palette.text.menuText} dashed`,
                borderBottom: `1px ${theme.palette.text.menuText} dashed`
            }}>
                <Box>
                    <Typography textColor={"text.menuText"} fontSize={"md"} fontWeight={"lg"}>
                        Date
                    </Typography>
                    <Typography textColor={"text.menuText"} fontSize={"sm"} fontWeight={"md"} sx={{ opacity: "75%" }}>
                        {date ?? formattedDate}
                    </Typography>
                </Box>
                <Box>
                    <Typography textColor={"text.menuText"} fontSize={"md"} fontWeight={"lg"}>
                        Type
                    </Typography>
                    <Typography textColor={"text.menuText"} fontSize={"sm"} fontWeight={"md"} sx={{ opacity: "75%" }}>
                        {type ?? "Credit"}
                    </Typography>
                </Box>
                <Box>
                    <Typography textColor={"text.menuText"} fontSize={"md"} fontWeight={"lg"}>
                        Message
                    </Typography>
                    <Typography textColor={"text.menuText"} fontSize={"sm"} fontWeight={"md"} sx={{ opacity: "75%" }}>
                        {message ?? "Payment Success"}
                    </Typography>
                </Box>
            </CardContent>

            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} >
                <Box display={"flex"} alignItems={"center"} gap={.5}>
                    <RiMoneyDollarCircleLine color={theme.palette.text.menuText} />
                    <Typography textColor={"text.menuText"} fontSize={"md"} fontWeight={"lg"}>Total Pay</Typography>
                </Box>
                <Box>
                    <Typography textColor={"text.currency"} fontSize={"md"} fontWeight={"lg"}>{amount ?? "00.00"}</Typography>
                </Box>
            </Box>
        </Card>
    )
}

export default Transactions