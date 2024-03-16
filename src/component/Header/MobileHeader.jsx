"use client";
import React from 'react'
import { Box, Avatar, useTheme, Drawer, IconButton, DialogContent, Stack, Typography, Button } from '@mui/joy';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';



// icons
import MenuFillIcon from 'remixicon-react/MenuFillIcon';
import CloseCircleLineIcon from 'remixicon-react/CloseCircleLineIcon';
import {
    RiArrowRightLine,
    RiArrowLeftLine,
    RiSettings5Line,
    RiNotificationLine,
    RiShoppingBag4Line,
    RiDiscountPercentLine,
    RiLayoutGrid2Fill
} from "@remixicon/react"
import Image from 'next/image';

const MobileNavigation = () => {

    const theme = useTheme()
    const settings = useSelector((state) => state.settings);
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [openSettings, setOpenSettings] = React.useState(false);

    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(inOpen);
    };
    const toggleSettingsDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenSettings(inOpen);
    };



    return (
        <Box>

            <Box display={"flex"} px={2} alignItems={"center"} justifyContent={"space-between"}>
                <Box component={Link} href={"/"} display={"flex"} alignItems={"center"}>
                    <Box
                        sx={{ width: "150px" }}
                    >
                        <Image
                            src={
                                settings?.value?.logo ?
                                    settings.value.logo[0]
                                    : "/images/logo-backend.png"
                            }
                            alt="logo"
                            height={50}
                            width={0}
                            style={{ width: '100%' }}
                            loading="lazy"
                        />
                    </Box>
                </Box>
                <Box display={"flex"} gap={1} ps={2} alignItems={"center"} justifyContent={"space-between"}>
                    <Box>
                        <Box component={Link} href={"/user/profile"} display={"flex"} alignItems={"center"} gap={2}>
                            <Avatar alt="Remy Sharp" src="https://ui-avatars.com/api/?background=random" title="profile" />
                        </Box>
                    </Box>
                    <IconButton>
                        {open ?
                            <CloseCircleLineIcon size={"28px"} color={theme.palette.primary[500]} fontWeight={"bolder"} onClick={toggleDrawer(false)} />
                            :
                            <MenuFillIcon size={"28px"} color={theme.palette.primary[500]} fontWeight={"bolder"} onClick={toggleDrawer(true)} />
                        }
                    </IconButton>
                </Box>
            </Box>


            <Drawer open={open}
                onClose={toggleDrawer(false)}
                size="lg"
            >
                <DialogContent>
                    <Box
                        role="presentation"
                        width={"100%"}
                    >
                        <Box width={"100%"} justifyContent={"end"} display={"flex"} alignItems={"center"}>
                            <RiArrowRightLine size={theme.fontSize.xl4} fontWeight={"bolder"} onClick={toggleDrawer(false)} />
                        </Box>

                        <Box width={"100%"} justifyContent={"center"} display={"flex"} alignItems={"left"} textAlign={"start"} my={4} px={4}>
                            <Stack spacing={4} width={"100%"}>
                                {/* {['categories', 'offers', 'notifications']} */}
                                <Typography
                                    fontSize={"md"} fontWeight={"lg"}
                                    component={Link}
                                    href={`/categories`}
                                    startDecorator={<RiLayoutGrid2Fill />}
                                    onClick={toggleDrawer(false)}
                                >
                                    categories
                                </Typography>
                                <Typography
                                    fontSize={"md"} fontWeight={"lg"}
                                    component={Link}
                                    href={`/offers`}
                                    startDecorator={<RiDiscountPercentLine />}
                                    onClick={toggleDrawer(false)}
                                >
                                    offers
                                </Typography>
                                <Typography
                                    fontSize={"md"} fontWeight={"lg"}
                                    component={Link}
                                    href={`/user/notifications`}
                                    startDecorator={<RiNotificationLine />}
                                    onClick={toggleDrawer(false)}
                                >
                                    notifications
                                </Typography>
                                <Typography
                                    fontSize={"md"} fontWeight={"lg"}
                                    component={Link}
                                    href={`/user/cart`}
                                    startDecorator={<RiShoppingBag4Line />}
                                    onClick={toggleDrawer(false)}
                                >
                                    Cart
                                </Typography>
                                <Button variant='text' onClick={toggleSettingsDrawer(true)} sx={{ textAlign: "start", justifyContent: "start", p: 0 }}>
                                    <Typography
                                        fontSize={"md"} fontWeight={"lg"}
                                        startDecorator={<RiSettings5Line />}
                                    >
                                        Settings
                                    </Typography>
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </DialogContent>
            </Drawer>


            {/* This is Settings Drawer */}
            <Drawer open={openSettings} onClose={toggleSettingsDrawer(false)}
                anchor="right"
                size="lg"
            >
                <DialogContent>
                    <Box
                        role="presentation"
                        width={"100%"}
                    >
                        <Box width={"100%"} justifyContent={"start"} display={"flex"} alignItems={"center"}>
                            <RiArrowLeftLine size={theme.fontSize.xl4} fontWeight={"bolder"} onClick={toggleSettingsDrawer(false)} />
                        </Box>

                    </Box>
                </DialogContent>
            </Drawer>

        </Box>
    )
}

export default MobileNavigation