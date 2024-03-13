"use client";
import CustomButton from '@/component/Buttons/CustomButton';
import { Box, Button, Card, CardContent, Divider, Grid, Input, Typography, useTheme } from '@mui/joy';
import React from 'react'

const Coupons = () => {
    const theme = useTheme()
    return (
        <Box>

            <Grid container spacing={1}>
                <Grid xs={12}>
                    <Input
                        variant="soft"
                        sx={{ '--Input-decoratorChildHeight': '45px', width: "40%" }}
                        endDecorator={
                            <Button
                                variant="text"
                                color="primary"
                                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            >
                                <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.menuText"}>
                                    Apply
                                </Typography>
                            </Button>
                        }
                    />
                </Grid>
            </Grid>



            <Grid container gap={2} mt={4}>
                <Grid xs={12} md={4} >

                    <Card sx={{
                        borderRadius: "xl", display: "flex", flexDirection: "row", maxWidth: "100%",
                        backgroundColor: "primary.100",
                        height: 200
                    }}>
                        <CardContent sx={{ minWidth: { md: "60%", sm: "50%" }, width: "100%" }} >
                            <Box maxWidth={"100%"} maxHeight={"100%"}>
                                <Box
                                    component={"img"}
                                    src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=100"
                                    srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                                    loading="lazy"
                                    alt=""
                                    width={"auto"}
                                    height={"70px"}
                                    sx={{ objectFit: "cover" }}
                                ></Box>
                            </Box>
                            <Box width={"100%"} gap={3} display={"flex"} alignItems={"start"} flexDirection={"column"} justifyContent={"space-between"}>
                                <Box>
                                    <Typography textColor={"text.meuText"} fontSize={"md"} fontWeight={"lg"}>
                                        GET 15 % OFF
                                    </Typography>
                                    <Typography textColor={"text.currency"} fontSize={"sm"} fontWeight={"md"}>
                                        Use Code "XXYY" & enjoy an appetizing 15% off
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography textColor={"neutral.500"} fontSize={"sm"} fontWeight={"md"}>expiry Date: 12, AUG 2023 </Typography>
                                </Box>
                            </Box>
                        </CardContent>

                        <Box>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                <Box
                                    sx={{
                                        background: theme.palette.background.body,
                                        borderBottom: `var(--variant-borderWidth) solid`,
                                        p: 2.5, borderRadius: "50%"
                                    }}
                                    position={"absolute"}
                                    zIndex={"9"}
                                    top={{ md: "-10%", xs: "-7%" }}
                                ></Box>
                            </Box>
                            <Divider orientation="vertical" sx={{ height: "100%" }}></Divider>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                <Box
                                    sx={{ background: theme.palette.background.body, borderTop: `var(--variant-borderWidth) solid`, p: 2.5, borderRadius: "50%" }}
                                    position={"absolute"}
                                    bottom={{ md: "-10%", xs: "-7%" }}
                                ></Box>
                            </Box>
                        </Box>

                        <CardContent orientation="vertical"
                            sx={{ alignItems: "center", justifyContent: "center", maxWidth: "40%", textAlign: "center" }}>
                            <Typography textColor={"text.menuText"} fontSize={"sm"} fontWeight={"md"} >Coupon Code</Typography>
                            <Typography textColor={"text.menuText"} fontSize={"lg"} fontWeight={"xl"} >XXYY</Typography>
                            <CustomButton text={"Redeem"} variant='solid' customStyle={{
                                px: 2, py: 1
                            }} />
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>

        </Box>
    )
}

export default Coupons