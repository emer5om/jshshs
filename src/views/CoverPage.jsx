"use client"
import React from 'react'
import { Box, Card, CardCover, Container, Grid, Typography, useTheme } from "@mui/joy";
const CoverPage = () => {
    const theme = useTheme()
    return (
        <Box display={"block"} sx={{
            backgroundImage: 'url("/images/back-grounds/cover-image.png")',
            height: "100%",
            width: "100%"
        }}>
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid xs={12}>
                    <Grid container sx={{ flexGrow: 1 }}>
                        <Grid xs={12} md={6}>
                            <Box>
                                <Typography>Taste the Difference Explore Our Menu!</Typography>
                                <Typography>
                                    Where Each Plate Weaves a Story of Culinary Mastery and
                                    Passionate Craftsmanship
                                </Typography>
                            </Box>
                            <Box>
                                <Box sx={{
                                    backgroundColor: theme.palette.neutral.plainActiveBg,
                                    p: 5
                                }}></Box>
                            </Box>
                        </Grid>
                        <Grid xs={12} md={6} maxWidth={"100% !important"}>
                            <Card sx={{ maxWidth: "100%", width: 700, height: 700 }}>
                                <CardCover>
                                    <Box
                                        component={"img"}
                                        src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format"
                                        srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&dpr=2 2x"
                                        loading="lazy"
                                        alt=""
                                        sx={{
                                            objectFit: "cover"
                                        }}
                                    />
                                </CardCover>
                            </Card>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12}></Grid>
                <Grid xs={12}></Grid>
            </Grid>
        </Box>
    )
}

export default CoverPage