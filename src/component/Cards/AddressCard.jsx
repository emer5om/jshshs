"use client";
import React, { useState } from 'react'

import { Box, Button, Card, CardActions, CardContent, Checkbox, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog, Typography, useTheme } from '@mui/joy';
import CustomButton from '../Buttons/CustomButton';
import AddUserAddressesModal from '../Modals/AddUserAddressesModal';
import { deleteUserAddress, getUserAddress } from '../../interceptor/routes';

// icons
import { RiHomeSmileLine, RiBuildingLine, RiMapPinLine, RiAlertLine } from "@remixicon/react"
import { getUserData } from '@/events/getters';
import { useDispatch } from 'react-redux';
import { setUserAddresses } from '@/store/reducers/userAddressesSlice';
import { useTranslation } from "react-i18next";

const AddressCard = ({
    type,
    isDefault,
    address,
    mobile,
    alternate_mobile,
    city,
    area,
    landmark,
    id,
    latitude,
    longitude,
    pincode
}) => {
    const theme = useTheme();
    const userData = getUserData()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const { t } = useTranslation()


    const handleDelete = async (id) => {
        try {
            const deleteAddress = await deleteUserAddress({ id })
            if (deleteAddress.error) {
                toast.error(deleteAddress.message)
            } else {
                const data = await getUserAddress({ user_id: userData.id })
                if (!data.error) {
                    setAddresses(data.data)
                    dispatch(setUserAddresses(data.data))
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log("error while deleting user address", error)
        }

    }


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
                            {t(type)}
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
                    <Checkbox variant="soft" color="success" readOnly disabled defaultChecked={isDefault == "0" ? false : true} />
                </Box>

            </CardContent>
            <CardActions>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                    <AddUserAddressesModal
                        addressType={type}
                        address={address}
                        mobile={mobile}
                        alternate_mobile={alternate_mobile}
                        isDefault={isDefault}
                        area={area}
                        city={city}
                        landmark={landmark}
                        type="edit"
                        id={id}
                        latitude={latitude}
                        longitude={longitude}
                        pincode={pincode}
                    />

                    <Button color="danger" variant='soft' onClick={() => setOpen(true)}> {t("delete")} </Button>
                </Box>
            </CardActions>

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <RiAlertLine />
                        {t("confirmation")}
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        {t("address-delete-warning")}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={() => { setOpen(false); handleDelete(id) }}>
                            {t("delete-address")}
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            {t("cancel")}
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </Card>
    )
}

export default AddressCard