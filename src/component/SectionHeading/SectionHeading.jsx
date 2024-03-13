"use client";
import { Box, Typography } from '@mui/joy'
import React from 'react'
import { useTheme } from '@mui/joy/styles';
import Link from 'next/link';

// icons
import ArrowRightCircleFillIcon from 'remixicon-react/ArrowRightCircleFillIcon'

const SectionHeading = ({ title, showMore = false, showMoreLink = "", color = "primary" }) => {
    const theme = useTheme()
    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={showMore === true ? "space-between" : "start"}
        >
            <Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={2}>
                <Box sx={{
                    height: "35px",
                    bgcolor: color === "primary" ? theme.palette.primary[500] : theme.palette.text.currency,
                    width: "10px",
                    borderRadius: theme.radius.xl
                }} />
                <Typography
                    sx={{
                        color: color === "primary" ? theme.palette.text.primary : theme.palette.text.currency,
                    }}
                    fontSize={"xl"}
                    fontWeight={theme.fontWeight.xl}>{title}</Typography>
            </Box>
            {showMore &&
                <Box>
                    <Link href={showMoreLink}>
                        <Typography
                            fontSize={theme.fontSize.md}
                            fontWeight={theme.fontWeight.xl}
                            sx={{
                                color: theme.palette.text.description,
                                textDecoration: "none",
                            }}
                            endDecorator={<ArrowRightCircleFillIcon />}>
                            Show more
                        </Typography>
                    </Link>
                </Box>
            }
        </Box>
    )
}

export default SectionHeading