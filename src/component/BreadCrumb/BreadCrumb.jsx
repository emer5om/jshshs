"use client";


import { Box, Breadcrumbs, Typography, useTheme } from '@mui/joy';
import Link from 'next/link';
import React from 'react'

// Pass pages in array
import Home4FillIcon from "remixicon-react/Home4FillIcon"
import ArrowRightSFillIcon from "remixicon-react/ArrowRightSFillIcon"

const BreadCrumb = ({ page }) => {

    const theme = useTheme();

    return (
        <div>
            <Box backgroundColor={theme.palette.primary[100]} px={2} py={1}>
                <Breadcrumbs separator={<ArrowRightSFillIcon color={theme.palette.text.currency} />} aria-label="breadcrumbs" >
                    <Link color="primary" href="/">
                        <Home4FillIcon fontSize={theme.fontSize.xl} color={theme.palette.text.currency} />
                    </Link>

                    {page.map((item, index) => {
                        return (
                            <Typography component={Link} href={item.link} textColor={"text.currency"} fontWeight={"xl"} fontSize={"lg"} key={index}>{item.name}</Typography>
                        )
                    })}
                </Breadcrumbs>
            </Box>
        </div>
    )
}

export default BreadCrumb