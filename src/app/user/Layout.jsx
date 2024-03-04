"use client"
import React from 'react'
import { Grid, Card, CardOverflow, AspectRatio, CardContent, Typography, Box, useTheme } from '@mui/joy'
import Link from 'next/link'

const Layout = ({ children }) => {
    const theme = useTheme()
    return (
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid xs={12} md={4}>
                <Card sx={{ border: "none" }}>
                    <CardContent>
                        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                            <Grid xs={12}>
                                <Box bgcolor={"primary.400"} height={"100px"} width={"100%"}
                                    sx={{ borderTopRightRadius: theme.radius.xl, borderTopLeftRadius: theme.radius.xl }}>
                                </Box>
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{
                                    position: "relative",
                                    top: "-25%"
                                }}>
                                    <Card
                                        variant="outlined"
                                        orientation="horizontal"
                                        sx={{
                                            width: "70%",
                                            borderRadius: "xl"
                                        }}
                                    >
                                        <AspectRatio ratio="1" sx={{ width: 90 }}>
                                            <Box
                                                component={"img"}
                                                src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                                                srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                                                loading="lazy"
                                                alt=""
                                            >
                                            </Box>
                                        </AspectRatio>
                                        <CardContent>
                                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"flex-start"}>
                                                <Typography level="title-lg" id="card-description">
                                                    Yosemite Park
                                                </Typography>
                                                <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                                                    California, USA
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Grid>
                            <Grid xs={12}>
                                Section 2
                            </Grid>
                            <Grid xs={12}>
                                Section 3
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={12} md={8}>
                {children}
            </Grid>
        </Grid>
    )
}

export default Layout