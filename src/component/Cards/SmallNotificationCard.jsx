"use client"
import React from 'react'
import { AspectRatio, Box, Card, CardContent, Typography } from '@mui/joy'
import Link from 'next/link'

const SmallNotificationCard = ({
    image, title, description
}) => {
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                width: "100%",
                '&:hover': { boxShadow: "none", borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >

            <CardContent sx={{ maxWidth: "80%" }}>
                <Typography level="title-lg" id="card-description">
                    {title}
                </Typography>
                <Typography noWrap level="body-sm" aria-describedby="card-description" mb={1}>
                    {description}
                </Typography>
            </CardContent>

            <Box maxWidth={"100%"} maxHeight={"100%"}>
                <Box
                    component={"img"}
                    src={image}
                    srcSet={`${image} 2x`}
                    loading="lazy"
                    alt=""
                    sx={{objectFit: "cover"}}
                    width={"150px"}
                    height={"auto"}
                ></Box>
            </Box>
        </Card>
    )
}

export default SmallNotificationCard