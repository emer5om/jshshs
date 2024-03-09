"use client";

import React, { useState } from 'react'
import { Avatar, Box, FormLabel, Grid, Input, Radio, RadioGroup, Sheet, Textarea, Typography } from '@mui/joy'
import PhoneInput from 'react-phone-input-2'
import dayjs from "dayjs"

// icons
import { RiPencilLine } from "@remixicon/react"
import CustomButton from '@/component/Buttons/CustomButton';
// CSS
import 'react-phone-input-2/lib/material.css'
const Profile = () => {

    const countryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE
    const [prefill, setPrefill] = useState({
        first_name: "james",
        last_name: "carter",
        email: "test.user@mail.com",
        country: "in",
        phone: "+919876543210",
        date_of_birth: dayjs("15-07-1999"),
        gender: "male",
    })


    const addValueProps = (name, file = false) => {
        if (!file) {
            return {
                value: prefill[name] || '',
                onChange: e => {
                    setPrefill({ ...prefill, [name]: e.target.value })
                }
            }
        }

        return {
            defaultImage: prefill[name] || '',
            onChange: e => {
                setPrefill({ ...prefill, [name]: e.target.files[0] })
            }
        }
    }


    const handleSubmit = () => {
        console.log("test");
        console.log(prefill);
    }

    return (
        <Box width={"100%"}>
            <Grid container >
                <Grid xs={12} >

                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} >
                        <Box>
                            <Box height={150} >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://ui-avatars.com/api/?background=random"
                                    sx={{
                                        height: "150px",
                                        width: "100%"
                                    }}
                                />

                                <Box
                                    width={"25%"}
                                    position={"relative"} right={"-70%"} top={"-50px"} bgcolor={"primary.300"} borderRadius={"50%"} display={"flex"} justifyContent={"center"} alignItems={"center"} p={1}>
                                    <RiPencilLine />
                                </Box>
                            </Box>
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={1}>
                                <Typography fontSize={"lg"} fontWeight={"xl"}>
                                    James Carter
                                </Typography>
                            </Box>
                        </Box>
                    </Box>


                </Grid>
                <Grid xs={12} mt={5}>
                    <Box display={"flex"} justifyContent={"start"} alignItems={"center"} my={2}>
                        <Typography fontSize={"lg"} fontWeight={"md"} textColor={"text.currency"}>
                            Personal Information
                        </Typography>
                    </Box>
                    <Box>
                        <Grid container spacing={{ md: 2, xs: 0 }} gap={{ xs: 2, md: 0 }} sx={{ flexGrow: 1 }}>
                            <Grid xs={12} md={6}>
                                <FormLabel sx={{ mb: 1, color: "text.tertiary" }}>First Name</FormLabel>
                                <Input size='lg' placeholder="Type in here…" variant="outlined"
                                    {...addValueProps('first_name')} />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <FormLabel sx={{ mb: 1, color: "text.tertiary" }}>Last Name</FormLabel>
                                <Input size='lg' placeholder="Type in here…" variant="outlined"
                                    {...addValueProps('last_name')} />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <FormLabel sx={{ mb: 1, color: "text.tertiary" }} >Phone Number</FormLabel>
                                <PhoneInput
                                    country={countryCode}
                                    placeholder="Enter phone number"
                                    {...addValueProps('phone')}
                                    inputStyle={{ width: "100%", height: "45px" }}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <FormLabel sx={{ mb: 1, color: "text.tertiary" }}>Date of Birth</FormLabel>
                                <Input size='lg' placeholder="Type in here…" variant="outlined"
                                    type="date"
                                    defaultValue={prefill.date_of_birth}
                                    value={prefill.date_of_birth}
                                    {...addValueProps('date_of_birth')}
                                    slotProps={{
                                        input: {
                                            defaultValue: prefill.date_of_birth,
                                            value: prefill.date_of_birth,
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>

                                <FormLabel sx={{ mb: 1, color: "text.tertiary" }}>Date of Birth</FormLabel>
                                <RadioGroup
                                    aria-labelledby="storage-label"
                                    value={prefill.gender}
                                    {...addValueProps('gender')}
                                    size="sm"
                                    sx={{ display: "flex", gap: 1.5, flexDirection: "row" }}
                                >
                                    {['male', 'female', 'others'].map((value) => (
                                        <Sheet
                                            key={value}
                                            sx={{
                                                p: 2,
                                                borderRadius: 'md',
                                                boxShadow: 'sm',
                                                width: "33%",
                                                backgroundColor: value === prefill.gender ? "primary.200" : ""
                                            }}
                                        >
                                            <Radio
                                                label={`${value}`}
                                                overlay
                                                disableIcon
                                                value={value}
                                                slotProps={{
                                                    label: ({ checked }) => ({
                                                        sx: {
                                                            fontWeight: 'lg',
                                                            fontSize: 'md',
                                                            color: checked ? 'text.primary' : 'text.secondary',
                                                        },
                                                    }),
                                                    action: ({ checked }) => ({
                                                        sx: (theme) => ({
                                                            ...(checked && {
                                                                '--variant-borderWidth': '2px',
                                                                '&&': {
                                                                    // && to increase the specificity to win the base :hover styles
                                                                    borderColor: theme.vars.palette.primary[500],
                                                                },
                                                            }),
                                                        }),
                                                    }),
                                                }}
                                            />
                                        </Sheet>
                                    ))}
                                </RadioGroup>
                            </Grid>


                            <Grid xs={12} md={12} my={2}>
                                <Box display={"flex"} flexDirection={"column"} gap={2}>
                                    <Box>
                                        <Typography fontSize={"sm"} fontWeight={"md"}>
                                            In order to access some features of the Service, you will have fill out
                                            your account  details.
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <CustomButton text={"Save"} onClick={handleSubmit} customStyle={{ px: 4, py: 1 }} variant="solid" />
                                    </Box>
                                </Box>
                            </Grid>

                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Profile