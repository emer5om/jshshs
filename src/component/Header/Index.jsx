"use client";
import React from 'react'
import {
    Grid,
    Box,
    Badge,
    Avatar,
    Typography,
    Menu,
    MenuItem
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
import NavMenuButton from './NavMenuButton';
import Link from 'next/link';
const Index = () => {

    const [menuIndex, setMenuIndex] = React.useState(null);
    const itemProps = {
        onClick: () => setMenuIndex(null),
    };


    const createHandleLeaveMenu = (index) => (getIsOnButton) => {
        setTimeout(() => {
            const isOnButton = getIsOnButton();
            if (!isOnButton) {
                setMenuIndex((latestIndex) => {
                    if (index === latestIndex) {
                        return null;
                    }
                    return latestIndex;
                });
            }
        }, 200);
    };


    const theme = useTheme();
    return (
        <Grid container spacing={2} px={8} alignItems={"center"}>
            <Grid xs={7} md={9} display={"flex"}  >
                <Grid container spacing={4} maxWidth={"100%"} width={"100%"} alignItems={"center"}>
                    <Grid xs={3} display={"flex"} alignItems={"center"}>
                        <Box
                            component={"img"}
                            src="/images/logo.png"
                            sx={{ width: "100%", height: "50px" }}
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
                            <Box display={"flex"} gap={8} alignItems={"center"}>
                                <Link href="#" underline="none" color="inherit">
                                    <Typography fontSize={20} fontWeight={"bolder"}

                                    >
                                        Home
                                    </Typography>
                                </Link>
                                <NavMenuButton
                                    label="Apps"
                                    open={menuIndex === 0}
                                    onOpen={() => setMenuIndex(0)}
                                    onLeaveMenu={createHandleLeaveMenu(0)}
                                    menu={
                                        <Menu onClose={() => setMenuIndex(null)}>
                                            <Grid container spacing={2} width={"100%"} height={"100%"} p={2}>
                                                <Grid xs={4}>
                                                    <MenuItem {...itemProps}>Spicy Burger</MenuItem>
                                                    <MenuItem {...itemProps}>Fried Chicken</MenuItem>
                                                    <MenuItem {...itemProps}>Chole Bhature</MenuItem>
                                                    <MenuItem {...itemProps}>Delicious Dessert</MenuItem>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <MenuItem {...itemProps}>South Indian</MenuItem>
                                                    <MenuItem {...itemProps}>Crispy Wrap</MenuItem>
                                                    <MenuItem {...itemProps}>Delicious Thali</MenuItem>
                                                    <MenuItem {...itemProps}>Healthy Food</MenuItem>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <MenuItem {...itemProps}>Chinese Food</MenuItem>
                                                    <MenuItem {...itemProps}>Pizza</MenuItem>
                                                    <MenuItem {...itemProps}>Punjabi Food</MenuItem>
                                                    <MenuItem {...itemProps}>Sea Food</MenuItem>
                                                </Grid>
                                            </Grid>
                                        </Menu>
                                    }
                                >
                                    <Typography fontSize={20} display={"flex"} alignItems={"center"} gap={1}>
                                        Menu
                                        <ArrowDownSLineIcon color={theme.palette.primary[500]} />
                                    </Typography>
                                </NavMenuButton>
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

                        <Typography component={Link} href={"/user/profile"} level="h4" color='white' fontWeight={"bold"}> James </Typography>
                        <ArrowDownSLineIcon size={"28px"} color={theme.palette.primary[500]} fontWeight={"bolder"} />
                    </Box>
                </Box>

            </Grid>
        </Grid>
    )
}

export default Index