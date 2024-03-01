"use client";
import React from 'react'
import { Box, Avatar, useTheme, Drawer, IconButton, DialogContent, Stack,Typography } from '@mui/joy';

// icons
import ArrowDownSLineIcon from 'remixicon-react/ArrowDownSLineIcon';
import MenuFillIcon from 'remixicon-react/MenuFillIcon';
import SunFillIcon from 'remixicon-react/SunFillIcon';
import CloseCircleLineIcon from 'remixicon-react/CloseCircleLineIcon';

const MobileNavigation = () => {

    const theme = useTheme()


    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(inOpen);
    };



    return (
        <Box>

            <Box display={"flex"} px={2} alignItems={"center"} justifyContent={"space-between"}>
                <Box display={"flex"} alignItems={"center"}>
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
                </Box>
                <Box>
                    <Box display={"flex"} alignItems={"center"} gap={2}>
                        <Avatar alt="Remy Sharp" src="https://ui-avatars.com/api/?background=random" />
                        <ArrowDownSLineIcon size={"28px"} color={theme.palette.primary[500]} fontWeight={"bolder"} />
                    </Box>
                </Box>
                <Box>
                    <SunFillIcon size={"28px"} />
                </Box>
                <Box>
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
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                        width={"100%"}
                    >
                        <Box width={"100%"} justifyContent={"center"} display={"flex"} alignItems={"center"}>
                            <CloseCircleLineIcon size={theme.fontSize.xl4} color={theme.palette.primary[500]} fontWeight={"bolder"} onClick={toggleDrawer(false)} />
                        </Box>

                        <Box width={"100%"} justifyContent={"center"} display={"flex"} alignItems={"center"} textAlign={"center"} my={4}>
                            <Stack spacing={2}>
                                {['Home', 'Services', 'Offers', 'Notifications', "Cart"].map((text, index) => (
                                    <Box component={Typography} fontSize={"xl"} fontWeight={"lg"} key={index}>{text}</Box>
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                </DialogContent>
            </Drawer>

        </Box>
    )
}

export default MobileNavigation