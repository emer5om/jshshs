"use client";
import React from 'react'

import { Box, Card, CardActions, CardContent, Checkbox, Typography, useTheme } from '@mui/joy';
import CustomButton from '../Buttons/CustomButton';

// icons
import { RiHomeSmileLine, RiBuildingLine, RiMapPinLine } from "@remixicon/react"

const AddressCard = ({ type, isDefault, address }) => {
    const theme = useTheme();
    return (
        <Card>
            <CardContent sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexDirection: "row" }}>
                <Box maxWidth={"90%"} display={"flex"} justifyContent={"center"} flexDirection={"column"} gap={2}>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                        {
                            type == "home" ?
                                <RiHomeSmileLine color={theme.palette.text.currency} />
                                : (type == "office" ?
                                    <RiBuildingLine color={theme.palette.text.currency} />
                                    :
                                    <RiMapPinLine color={theme.palette.text.currency} />
                                )
                        }
                        <Typography textColor={"text.currency"} fontSize={"md"} fontWeight={"lg"}>
                            {type}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{
                            textOverflow: "ellipsis",
                            textWrap: "wrap",
                            overflow: "hidden",
                            maxWidth: "100%",
                        }}
                            fontWeight={"lg"}
                        >
                            {address}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Checkbox variant="soft" color="success" defaultChecked={isDefault} />
                </Box>

            </CardContent>
            <CardActions>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                    <CustomButton text={"Edit"} color="success" variant='outlined' customStyle={{ px: 2, py: 1 }} />
                    <CustomButton text={"Delete"} color="danger" variant='soft' customStyle={{ px: 2, py: 1 }} />
                </Box>
            </CardActions>
        </Card>
    )
}

export default AddressCard