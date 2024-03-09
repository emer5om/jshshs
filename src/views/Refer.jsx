"use client";

import React from 'react'
import { Box, Chip, Typography } from '@mui/joy'

import { toast } from 'react-toastify';

import "@lottiefiles/lottie-player";

const Refer = () => {


    const handleCopyClick = async (value) => {
        try {
            await navigator.clipboard.writeText(value);
            toast("Code Copied")
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    return (
        <Box width={"100%"}>
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} >
                <Box maxWidth={"100%"} maxHeight={"100%"}>
                    <Box width={"100%"} height={"400px"}>
                        <lottie-player
                            autoplay
                            loop
                            mode="normal"
                            src="/animations/refer.json"
                        >
                        </lottie-player>
                    </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} gap={1} textAlign={"center"}>
                    <Typography fontSize={"xl"} fontWeight={"xl"} textColor={"text.menuText"}>
                        Refer and Earn
                    </Typography>
                    <Typography fontSize={"lg"} fontWeight={"md"}>
                        Invite your friends to join and get the reward as soon as your friend first order.
                    </Typography>
                    <Typography fontSize={"md"} fontWeight={"md"}>
                        Your Referral code
                    </Typography>
                    <Chip color="warning" sx={{ borderStyle: "dashed", borderWidth: "1px", borderRadius: "sm" }}
                        onClick={e => handleCopyClick("A2XYD3R7E0")}
                    >
                        A2XYD3R7E0
                    </Chip>
                </Box>
            </Box>
        </Box>
    )
}

export default Refer