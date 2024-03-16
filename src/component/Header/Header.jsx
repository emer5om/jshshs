"use client";
import React from 'react'
import {
    Avatar,
    Badge,
    Box,
    Button,
    Dropdown,
    Grid,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    Typography,
    useTheme
} from '@mui/joy';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';

import Notification4LineIcon from 'remixicon-react/Notification4LineIcon';
import SunFillIcon from 'remixicon-react/SunFillIcon';
import ShoppingBag3LineIcon from 'remixicon-react/ShoppingBag3LineIcon';
import ArrowDownSLineIcon from 'remixicon-react/ArrowDownSLineIcon';

import NavMenuButton from './NavMenuButton';
import Link from 'next/link';
import Image from 'next/image';
import SmallNotificationCard from '../Cards/SmallNotificationCard';
import {RiGlobalLine, RiHeartLine, RiShutDownLine, RiUser3Line} from '@remixicon/react';

import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '@/store/reducers/languageSlice';
import SearchModal from "@/component/Modals/SearchModal";


const Header = () => {
    const settings = useSelector((state) => state.settings);
    const dispatch = useDispatch();
    // const settings = useSelector((state) => state.settings);
    // console.log(settings)
    // const language = useSelector((state) => state.language.value);
    // const userDetails = useSelector((state) => state.authentication.value);
    const userDetails = [[0, 1]]


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


    const notificationData = [
        {
            id: 1,
            title: "notification 1",
            description: "Lorem ipsum dolor dfghdfklgndklfngldfnjkdgkn sit amet consectetur adipisicing elit. Veritatis dolorum voluptate maiores. Animi.",
            image: "/images/demo-images/salad-1.png"
        },
        {
            id: 2,
            title: "notification 2",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dolorum voluptate maiores. Animi.",
            image: "/images/demo-images/noodles.png"
        },
        {
            id: 3,
            title: "notification 3",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dolorum voluptate maiores. Animi.",
            image: "/images/demo-images/pizza-1.png"
        },
    ]

    const theme = useTheme();
    return (
        <Grid container spacing={2} px={8} alignItems={"center"}>
            <Grid xs={7} md={9} display={"flex"}>
                <Grid container spacing={4} maxWidth={"100%"} width={"100%"} alignItems={"center"}>
                    <Grid xs={3} display="flex" alignItems="center">
                        <Grid xs={3} display="flex" alignItems="center">

                            {/*<Box*/}
                            {/*    component={"img"}*/}
                            {/*></Box>*/}

                            {/*{console.log(settings.value.logo[0])}*/}
                            <Image
                                src={
                                    settings?.value?.logo ?
                                        settings.value.logo[0]
                                        : "/images/logo-backend.png"
                                }
                                alt="logo"
                                height={50}
                                width={0}
                                style={{width: '100%'}}
                                loading="lazy"
                            />

                            {/*{settings.fetched && settings.value.logo && (*/}
                            {/*    */}
                            {/*)}*/}
                        </Grid>

                    </Grid>

                    <Grid xs={9}>
                        <Box display={"flex"} gap={8}>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={1}>
                                <Box>
                                    <FontAwesomeIcon icon={faLocationDot} width={"24px"} height={"24px"}/>
                                </Box>
                                <Box>
                                    <Typography variant="h4" fontWeight={"bold"}>
                                        Bhuj
                                    </Typography>
                                    <Typography>
                                        123, some place, some area
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display={"flex"} gap={8} alignItems={"center"}>
                                <Link href="/" underline="none" color="inherit">
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
                                                    <MenuItem sx={{borderRadius: 'md'}} {...itemProps}>Spicy
                                                        Burger</MenuItem>
                                                    <MenuItem sx={{borderRadius: 'md'}} {...itemProps}>Fried
                                                        Chicken</MenuItem>
                                                    <MenuItem sx={{borderRadius: 'md'}} {...itemProps}>Chole
                                                        Bhature</MenuItem>
                                                    <MenuItem sx={{borderRadius: 'md'}} {...itemProps}>Delicious
                                                        Dessert</MenuItem>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <MenuItem sx={{borderRadius: 'md'}} {...itemProps}>South
                                                        Indian</MenuItem>
                                                    <MenuItem sx={{borderRadius: 'md'}} {...itemProps}>Crispy
                                                        Wrap</MenuItem>
                                                    <MenuItem sx={{borderRadius: 'md'}} {...itemProps}>Delicious
                                                        Thali</MenuItem>
                                                    <MenuItem sx={{borderRadius: 'md'}} {...itemProps}>Healthy
                                                        Food</MenuItem>
                                                </Grid>
                                                <Grid xs={4}>
                                                    <MenuItem sx={{borderRadius: 'md'}} {...itemProps}>Chinese
                                                        Food</MenuItem>
                                                    <MenuItem sx={{borderRadius: 'md'}} {...itemProps}>Pizza</MenuItem>
                                                    <MenuItem sx={{borderRadius: 'md'}} {...itemProps}>Punjabi
                                                        Food</MenuItem>
                                                    <MenuItem sx={{borderRadius: 'md'}} {...itemProps}>Sea
                                                        Food</MenuItem>
                                                </Grid>
                                            </Grid>
                                        </Menu>
                                    }
                                >
                                    <Typography fontSize={20} display={"flex"} alignItems={"center"} gap={1}>
                                        Menu
                                        <ArrowDownSLineIcon color={theme.palette.primary[500]}/>
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
                    <Box display={"flex"} alignItems={"center"} gap={2}>
                        <Dropdown>
                            <MenuButton
                                slots={{root: IconButton}}
                                slotProps={{root: {variant: "text", color: 'neutral',}}}
                            >
                                <Notification4LineIcon size={"20px"}/>
                            </MenuButton>
                            <Menu sx={{
                                width: 450, p: 2, bgcolor: "rgba(211, 211, 211, 0.5)",
                                '& .MuiMenuItem-root:last-child:hover': {
                                    backgroundColor: 'transparent',
                                    fontWeight: "lg",
                                    color: "primary.500"
                                }
                            }}>
                                {notificationData.map((item) => {
                                    return (
                                        <MenuItem key={item.id}>
                                            <SmallNotificationCard
                                                image={item.image}
                                                title={item.title}
                                                description={item.description}
                                            />
                                        </MenuItem>
                                    )
                                })}
                                <MenuItem component={Link} href='#' sx={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "end",
                                    fontWeight: "md",
                                    '&:hover': {backgroundColor: "transparent"},
                                }}>
                                    Show More
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                        <SearchModal displayStyle={"icon"}/>
                        <Badge component={Link} href={"/user/cart"} badgeContent={8} color="primary">
                            <ShoppingBag3LineIcon size={"25px"} color="black"/>
                        </Badge>
                        <IconButton>
                            <SunFillIcon size={"20px"}/>
                        </IconButton>

                        <Dropdown>
                            <MenuButton
                                slots={{root: IconButton}}
                                slotProps={{root: {variant: "plain", color: 'neutral'}}}
                            >
                                <RiGlobalLine size={"20px"}/>
                            </MenuButton>
                            <Menu>
                                <MenuItem onClick={() => dispatch(setLanguage("en"))}>English</MenuItem>
                                <MenuItem onClick={() => dispatch(setLanguage("hi"))}>Hindi</MenuItem>
                                <MenuItem onClick={() => dispatch(setLanguage("fr"))}>French</MenuItem>
                            </Menu>
                        </Dropdown>

                    </Box>

                    <Box display={"flex"} alignItems={"center"} gap={2}>
                        {userDetails.length === 0 ?

                            <Button variant='text'>
                                Login
                            </Button>

                            :
                            <Dropdown>
                                <MenuButton
                                    variant="plain"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        "&:hover": {
                                            backgroundColor: 'transparent'
                                        }
                                    }}

                                    endDecorator={
                                        <Box width={"30px"} mt={"5px"}>
                                            <ArrowDownSLineIcon size={"28px"} color={theme.palette.primary[500]}/>
                                        </Box>
                                    }
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            "&:hover": {
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                    >

                                        <Avatar alt="Remy Sharp" src="https://ui-avatars.com/api/?background=random"/>

                                        <Typography level="h4" color='white' fontWeight={"bold"}
                                        > James </Typography>
                                    </Box>


                                </MenuButton>
                                <Menu>
                                    <MenuItem
                                        component={Link}
                                        href='/user/profile'
                                        sx={{
                                            "&:hover .MuiTypography-root": {
                                                color: theme.palette.text.menuText
                                            }
                                        }}
                                    >
                                        <Typography fontSize={"sm"} fontWeight={"md"}
                                                    startDecorator={<RiUser3Line size={theme.fontSize.lg}/>}>
                                            My Profile
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        href={"/user/favourites"}
                                        sx={{
                                            "&:hover .MuiTypography-root": {
                                                color: theme.palette.text.menuText
                                            }
                                        }}
                                    >
                                        <Typography fontSize={"sm"} fontWeight={"md"}
                                                    startDecorator={<RiHeartLine size={theme.fontSize.lg}/>}>
                                            favourites
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        sx={{
                                            "&:hover .MuiTypography-root": {
                                                color: theme.palette.danger[500]
                                            }
                                        }}
                                    >
                                        <Typography fontSize={"sm"} fontWeight={"md"}
                                                    startDecorator={<RiShutDownLine size={theme.fontSize.lg}/>}>
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Dropdown>
                        }


                    </Box>
                </Box>

            </Grid>
        </Grid>
    )
}

export default Header