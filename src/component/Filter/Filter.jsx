"use client";

import React from 'react'
import { Box, Card, Grid, useTheme, Typography, RadioGroup, List, ListItem, Radio, Checkbox, CardContent, radioClasses, Tabs, TabList, Tab, TabPanel } from '@mui/joy';


// icons
import Filter3FillIcon from "remixicon-react/Filter3FillIcon"
import GalleryLineIcon from "remixicon-react/LayoutGridFillIcon"
import ListCheck2Icon from "remixicon-react/ListCheck2Icon"

const Filter = ({ onViewChange, view, onCategorySelect, onTypeChange, onPriceChange }) => {
    const [alignment, setAlignment] = React.useState(view);
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
                                <Box display={"flex"} flexDirection={"column"} gap={1} width={"100%"}>
                                    <Box>
                                        <Typography fontSize={"lg"} fontWeight={"xl"}> Food Type </Typography>
                                    </Box>
                                    <Box>
                                        <RadioGroup aria-label="Your plan" name="food-type" defaultValue="Individual"
                                            onChange={e => onTypeChange(e.target.value)}
                                        >
                                            <List
                                                sx={{
                                                    minWidth: "100%",
                                                    // '--List-gap': '0.5rem',
                                                    '--ListItem-paddingY': '1rem',
                                                    '--ListItem-paddingRight': '1.5rem',
                                                    '--ListItem-radius': '8px',
                                                    '--ListItemDecorator-size': '32px',
                                                    px: 0,
                                                    px: 0,
                                                    display: "flex",
                                                    width: "100%",
                                                    flexDirection: { md: "row", xs: "column" },
                                                    gap: 1,
                                                    alignItems: "center"

                                                }}
                                            // orientation={{ xs: "vertical", sm: "horizontal" }}
                                            >

                                                {['Pure Veg', 'Non Veg'].map((item, index) => (
                                                    <ListItem variant="outlined" key={item} sx={{
                                                        boxShadow: 'sm', "&:hover": {
                                                            cursor: "pointer", // Optional: Add pointer cursor
                                                            backgroundColor: theme.palette.primary[100]
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
                                <Box display={"flex"} flexDirection={"column"} gap={1} width={"100%"} alignItems={"start"}>
                                    <Box>
                                        <Typography fontSize={"lg"} fontWeight={"xl"}> Price </Typography>
                                    </Box>
                                    <Box>
                                        <RadioGroup aria-label="Your plan" name="price" defaultValue="Individual" 
                                        onChange={e => onPriceChange(e.target.value)}
                                        >
                                            <List
                                                sx={{
                                                    minWidth: "100%",
                                                    // '--List-gap': '0.5rem',
                                                    '--ListItem-paddingY': '1rem',
                                                    '--ListItem-paddingRight': '1.5rem',
                                                    '--ListItem-radius': '8px',
                                                    '--ListItemDecorator-size': '32px',
                                                    px: 0,
                                                    px: 0,
                                                    display: "flex",
                                                    width: "100%",
                                                    flexDirection: { md: "row", xs: "column" },
                                                    gap: 1,
                                                    alignItems: "center"
                                                }}
                                            // orientation="horizontal"
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
                                                                maxWidth: "100%"
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
                                                name={item}
                                                onChange={e => onCategorySelect(e.target.checked, e.target.name)}
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

            <Card sx={{ display: "flex", alignItems: { xs: "center", md: "flex-end" }, border: "none", px: 0, py: 3 }}>
                <CardContent>
                    <RadioGroup
                        orientation="horizontal"
                        aria-label="Alignment"
                        name="alignment"
                        variant="outlined"
                        value={alignment}
                        onChange={(event) => {
                            setAlignment(event.target.value);
                            onViewChange(event.target.value); // Call the onViewChange function with the new alignment
                        }}
                    >
                        {['gallery', 'list'].map((item) => (
                            <Box
                                key={item}
                                sx={(theme) => ({
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 48,
                                    height: 48,
                                    '&:not([data-first-child])': {
                                        borderLeft: '1px solid',
                                        borderColor: 'divider',
                                    },
                                    [`&[data-first-child] .${radioClasses.action}`]: {
                                        borderTopLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                                        borderBottomLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                                    },
                                    [`&[data-last-child] .${radioClasses.action}`]: {
                                        borderTopRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                                        borderBottomRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                                    },
                                })}
                            >
                                <Radio
                                    value={item}
                                    disableIcon
                                    overlay
                                    label={
                                        {
                                            gallery: <GalleryLineIcon />,
                                            list: <ListCheck2Icon />,
                                        }[item]
                                    }
                                    variant={alignment === item ? 'solid' : 'plain'}
                                    slotProps={{
                                        input: { 'aria-label': item },
                                        action: {
                                            sx: { borderRadius: 0, transition: 'none' },
                                        },
                                        label: { sx: { lineHeight: 0 } },
                                    }}
                                />
                            </Box>
                        ))}
                    </RadioGroup>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Filter