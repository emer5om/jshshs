"use client";
import { AspectRatio, Box, Button, Card, CardContent, IconButton, Typography } from '@mui/joy'
import React from 'react'
import { useTheme } from '@mui/joy/styles';

const CategoryCards = ({ image, title, count }) => {
    const theme = useTheme();

    return (
        <Box>
            <Card
                sx={{
                    px:1,
                    width: 200,
                    height: "auto",
                    border: "none",
                    borderBottom: "1px solid #18274B14",
                    borderRadius: theme.radius.lg,
                    boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                    py: 2,
                    "&:hover": {
                        cursor: "pointer", // Optional: Add pointer cursor
                        backgroundColor: theme.palette.primary[50],
                        "& img": {
                            transform: "scale(1.07)", // Zoom-in effect on hover
                        },
                    },
                }}
            >
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <Box
                        width={"100px"}
                        height={"100px"}
                        bgcolor={"#F0BB62"}
                        borderRadius={"50%"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Box
                            component={"img"}
                            src={image}
                            srcSet={`${image} 2x`}
                            loading="lazy"
                            alt=""
                            borderRadius={"50%"}
                            maxHeight={"100%"}
                            maxWidth={"100%"}
                            sx={{ transition: "transform 0.3s ease-in-out" }} // Smooth transition
                        />
                    </Box>
                </Box>
                <CardContent orientation="horizontal">
                    <Box
                        sx={{ width: "100%" }}
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Typography fontWeight={"md"} fontSize={"md"}
                        sx={{textWrap:"nowrap", textOverflow:"ellipsis", overflow:"hidden"}}
                        >
                            {title}
                        </Typography>
                        <Typography fontSize="sm" sx={{ color: theme.palette.text.description }} fontWeight={theme.fontWeight.md}>
                            {"(" + count + " items )"}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CategoryCards