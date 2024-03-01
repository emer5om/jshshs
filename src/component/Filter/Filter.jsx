"use client";

import { Box, Card, Grid, useTheme, Typography, RadioGroup, List, ListItem, Radio, Checkbox } from '@mui/joy';
import React from 'react'


// icons
import Filter3FillIcon from "remixicon-react/Filter3FillIcon"

const Filter = () => {
    const theme = useTheme();
    return (
        <Box>
            <Card sx={{ maxWidth: "100%", borderRadius: "xl" }}>

                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid xs={12} md={5}>
                        <Box>
                            <Filter3FillIcon fontWeight={theme.fontWeight.xl} />
                        </Box>
                        <Grid container spacing={2} sx={{ p: 2 }}>
                            <Grid xs={12} md={6}>
                                <Box display={"flex"} flexDirection={"column"} gap={2} width={"100%"}>
                                    <Box>
                                        <Typography fontSize={"lg"} fontWeight={"xl"}> Food Type </Typography>
                                    </Box>
                                    <Box>
                                        <RadioGroup aria-label="Your plan" name="food-type" defaultValue="Individual">
                                            <List
                                                sx={{
                                                    minWidth: "100%",
                                                    '--List-gap': '0.5rem',
                                                    '--ListItem-paddingY': '1rem',
                                                    '--ListItem-paddingRight': '1.5rem',
                                                    '--ListItem-radius': '8px',
                                                    '--ListItemDecorator-size': '32px',
                                                    px: 0,
                                                }}
                                                orientation={{ xs: "vertical", sm: "horizontal" }}
                                            >

                                                {['Pure Veg', 'Non Veg'].map((item, index) => (
                                                    <ListItem variant="outlined" sx={{
                                                        boxShadow: 'sm', "&:hover": {
                                                            cursor: "pointer", // Optional: Add pointer cursor
                                                            backgroundColor: theme.palette.primary[100],
                                                            minWidth: "100%"
                                                        },
                                                    }}>
                                                        <Radio
                                                            overlay
                                                            value={item}
                                                            label={item}
                                                            sx={{
                                                                flexGrow: 1,
                                                            }}
                                                            slotProps={{
                                                                action: ({ checked }) => ({
                                                                    sx: (theme) => ({
                                                                        ...(checked && {
                                                                            inset: -1,
                                                                        }),
                                                                    }),
                                                                }),
                                                            }}
                                                        />
                                                    </ListItem>
                                                ))}

                                            </List>
                                        </RadioGroup>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid xs={12} md={6}>
                                <Box display={"flex"} flexDirection={"column"} gap={2}>
                                    <Box>
                                        <Typography fontSize={"lg"} fontWeight={"xl"}> Price </Typography>
                                    </Box>
                                    <Box>
                                        <RadioGroup aria-label="Your plan" name="price" defaultValue="Individual">
                                            <List
                                                sx={{
                                                    minWidth: 240,
                                                    '--List-gap': '0.5rem',
                                                    '--ListItem-paddingY': '1rem',
                                                    '--ListItem-paddingRight': '1.5rem',
                                                    '--ListItem-radius': '8px',
                                                    '--ListItemDecorator-size': '32px',
                                                    px: 0,
                                                }}
                                                orientation="horizontal"
                                            >
                                                {['Low to High', 'Hight to Low'].map((item, index) => (
                                                    <ListItem variant="outlined" key={item} sx={{
                                                        boxShadow: 'sm', "&:hover": {
                                                            cursor: "pointer", // Optional: Add pointer cursor
                                                            backgroundColor: theme.palette.primary[100],
                                                        },
                                                    }}>
                                                        <Radio
                                                            overlay
                                                            value={item}
                                                            label={item}
                                                            sx={{
                                                                flexGrow: 1,
                                                            }}
                                                            slotProps={{
                                                                action: ({ checked }) => ({
                                                                    sx: (theme) => ({
                                                                        ...(checked && {
                                                                            inset: -1,
                                                                        }),
                                                                    }),
                                                                }),
                                                            }}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </RadioGroup>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        {/* <Box display={"flex"} flexDirection={"column"} gap={1}>
                        </Box> */}
                    </Grid>
                    <Grid xs={12} md={7}>

                        <Box sx={{ width: "100%" }}>
                            <div role="group" aria-labelledby="topping">
                                <List
                                    orientation="horizontal"
                                    wrap
                                    sx={{
                                        '--List-gap': '8px',
                                        '--ListItem-radius': '20px',
                                    }}
                                >
                                    {[
                                        'Spicy Burger',
                                        'Fried Chicken',
                                        'Chole Bhature',
                                        'Delicious Desserts',
                                        'South Indian',
                                        'Crispy Wrap',
                                        'Healthy Salad',
                                        'Cheese SandWich',
                                        'Delicious Thali',
                                        'North Indian',
                                        'Chinese Food',
                                        'Break Fast',
                                        'Juice',
                                        'Cold Beverages',
                                        'Hot Beverages',
                                    ].map((item, index) => (
                                        <ListItem key={item}>
                                            <Checkbox
                                                overlay
                                                disableIcon
                                                variant="outlined"
                                                label={item}
                                                slotProps={{
                                                    action: ({ checked }) => ({
                                                        sx: (theme) => ({
                                                            ...(checked && {
                                                                backgroundColor: "primary.100"
                                                            }),
                                                        }),
                                                    }),
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </Box>

                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}

export default Filter