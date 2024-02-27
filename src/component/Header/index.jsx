"use client";
import React from 'react'
import {
    Sheet,
    Container,
    Grid,
    Box,
    Text,
    Badge,
    Avatar,
    Button,
    Divider,
    Typography,
    Link,
    Stack,
    ListItem,
    List
} from '@mui/joy';
import { Img } from '@/component/Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import Notification4LineIcon from 'remixicon-react/Notification4LineIcon';
import SearchLineIcon from 'remixicon-react/SearchLineIcon';
import SunFillIcon from 'remixicon-react/SunFillIcon';
import ShoppingBag3LineIcon from 'remixicon-react/ShoppingBag3LineIcon';
import ArrowDownSLineIcon from 'remixicon-react/ArrowDownSLineIcon';

import { useTheme } from '@mui/joy/styles';
const index = () => {
    const theme = useTheme();
    return (
        <Grid container spacing={2} px={8} alignItems={"center"}>
            <Grid xs={7} md={9} display={"flex"}  >
                <Grid container spacing={4} maxWidth={"100%"} width={"100%"} alignItems={"center"}>
                    <Grid xs={3} display={"flex"} alignItems={"center"}>
                        <Box
                            component={"img"}
                            src="/images/img_erestro.svg"
                            sx={{ width: "80px" }}
                        />
                        <Box
                            component={"img"}
                            src="/images/eRestro_logo_2.svg" alt=""
                            sx={{ width: "80px" }}
                        />
                    </Grid>
                    <Grid xs={9}>
                        <Box display={"flex"} gap={8}>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={1}>
                                <Box>
                                    <FontAwesomeIcon icon={faLocationDot} width={"24px"} height={"24px"} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" fontWeight={"bold"}>
                                        Bhuj
                                    </Typography>
                                    <Typography >
                                        123, some place, some area
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display={"flex"} gap={8}>
                                <Link href="#" underline="none" color="inherit">
                                    <Typography fontSize={20} fontWeight={"bolder"}

                                    >
                                        Home
                                    </Typography>
                                </Link>
                                <Link href="#" underline="none" color="inherit">
                                    <Typography fontSize={20} fontWeight={"bolder"}
                                        display={"flex"} alignItems={"center"} justifyContent={"space-between"}
                                    >
                                        Menu
                                        <ArrowDownSLineIcon size={"28px"} color={theme.palette.primary[500]} fontWeight={"bolder"} />
                                    </Typography>
                                </Link>
                                <Link href="#" underline="none" color="inherit">
                                    <Typography fontSize={20} fontWeight={"bolder"}

                                    >
                                        Services
                                    </Typography>
                                </Link>
                                <Link href="#" underline="none" color="inherit">
                                    <Typography fontSize={20} fontWeight={"bolder"}

                                    >
                                        Offers
                                    </Typography>
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={5} md={3}>

                <Box display={"flex"} gap={8} alignItems={"center"}>
                    <Box display={"flex"} gap={4}>
                        <Notification4LineIcon size={"28px"} />
                        <SearchLineIcon size={"28px"} />
                        <Badge badgeContent={8} color="primary">
                            <ShoppingBag3LineIcon size={"28px"} />
                        </Badge>
                        <SunFillIcon size={"28px"} />
                    </Box>

                    <Box display={"flex"} alignItems={"center"} gap={2}>
                        <Avatar alt="Remy Sharp" src="https://ui-avatars.com/api/?background=random" />

                        <Typography level="h4" color='white' fontWeight={"bold"}> James </Typography>
                        <ArrowDownSLineIcon size={"28px"} color={theme.palette.primary[500]} fontWeight={"bolder"} />
                    </Box>
                </Box>

            </Grid>
        </Grid>
    )
}

export default index