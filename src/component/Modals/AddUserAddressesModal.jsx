"use client";
import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    DialogActions,
    DialogTitle,
    FormControl,
    Grid,
    Input,
    Modal,
    ModalClose,
    ModalDialog,
    Typography,
    useTheme,
    FormLabel,
    FormHelperText,
    RadioGroup,
    Radio,
    Sheet,
    Checkbox
} from '@mui/joy';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { RiMapPinAddFill } from '@remixicon/react';
import { geocodeByAddress } from 'react-places-autocomplete';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { getUserData } from '@/events/getters'

import { updateAddress, addAddress, getUserAddress } from "../../interceptor/routes"
import { CustomButton } from "../Buttons/CustomButton"

import { setUserAddresses } from "../../store/reducers/userAddressesSlice"
import { useTranslation } from "react-i18next";

const AddUserAddressesModal = ({
    type = "update",
    addressType,
    isDefault,
    address,
    mobile,
    alternate_mobile,
    is_default,
    city, area,
    landmark, id,
    latitude,
    longitude, pincode
}) => {

    const theme = useTheme()
    const countryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE

    const initialCenter = { lat: latitude ?? 23.2420, lng: longitude ?? 69.6669 };
    const zoomLevel = 16;
    const userData = getUserData()
    const { t } = useTranslation()

    const [open, setOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({ lat: 23.2420, lng: 69.6669 });
    const [is_default_checked, set_is_default_checked] = useState(isDefault == "0" ? false : true);

    const dispatch = useDispatch();

    const [prefill, setPrefill] = useState({
        id: id ?? "",
        user_id: userData.id,
        address: address ?? "",
        area: area ?? "",
        mobile: mobile ?? "",
        alternate_mobile: alternate_mobile ?? "",
        landmark: landmark ?? "",
        city: city ?? "",
        pincode: pincode ?? "",
        type: addressType ?? "",
        latitude: latitude ?? "",
        longitude: longitude ?? "",
        is_default: is_default ?? "",
    })


    const addValueProps = (name, file = false) => {
        if (!file) {
            return {
                value: prefill[name] || '',
                onChange: e => {
                    setPrefill({ ...prefill, [name]: e?.target?.value ?? e })
                }
            }
        }
    }

    const containerStyle = {
        width: '100%',
        height: '350px'
    };

    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setPrefill({
                ...prefill,
                is_default: true, // Set is_default to true when checked
            });
        } else {
            // If the checkbox is unchecked, you can reset is_default to false or leave it unchanged
            setPrefill({
                ...prefill,
                is_default: false, // Set is_default to false when unchecked
            });
        }
        console.log(prefill)
    };

    const handleMapClick = async (event) => {
        setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });

        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();

        try {
            const results = await geocodeByAddress(`${latitude},${longitude}`);
            if (results && results.length > 0) {
                console.log(results[0])
                const address = results[0].formatted_address;
                const city = results[0].address_components.find(component =>
                    component.types.includes('locality')
                );
                const postalCOde = results[0].address_components.find(component =>
                    component.types.includes('postal_code')
                )?.long_name;
                console.log(postalCOde)
                if (city) {
                    setPrefill({
                        ...prefill,
                        address: address,
                        city: city.long_name,
                        pincode: postalCOde,
                        latitude: latitude,
                        longitude: longitude,
                    });
                } else {
                    return toast.error("Please Select City");
                }
            }
        } catch (error) {
            console.error('Error geocoding coordinates:', error);
        }
    };

    const handleAddAddress = async () => {

        setPrefill({
            ...prefill,
            is_default: is_default_checked
        });
        try {
            let addUserAddress
            if (type == "edit") {
                addUserAddress = await updateAddress(prefill)
            }
            else {
                addUserAddress = await addAddress(prefill)
            }

            if (addUserAddress.error) {
                toast.error(addUserAddress.message)
            } else {
                const getAddress = await getUserAddress({ user_id: userData.id })
                if (!getAddress.error) {
                    dispatch(setUserAddresses(getUserAddress.data))
                    setOpen(false)
                }
            }
        } catch (error) {
            console.log("error while getting adding address", error);
        }

    }

    return (
        <Box>
            {type === "edit" ?
                <Button color="success" variant='outlined' sx={{ px: 2, py: 1 }}
                    onClick={() => setOpen(true)}
                >
                    {t("edit")}
                </Button>
                :
                <Box
                    sx={{
                        cursor: "pointer",
                        px: 3,
                        py: 3,
                        border: `0.5px ${theme.palette.danger[500]} dashed`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'center'
                    }}
                    onClick={() => setOpen(true)}
                >
                    <RiMapPinAddFill />
                    {t("add-address")}
                </Box>
            }
            <Modal sx={{ overflow: "scroll", maxHeight: "100%" }} open={open} onClose={() => { setOpen(false) }}
            >
                <ModalDialog
                    sx={{
                        width: 800,
                        maxHeight: "100%",
                        overflowY: "scroll"
                    }}
                >
                    <ModalClose />
                    <DialogTitle>
                        <Typography fontSize={"lg"} fontWeight={"xl"}>
                            {t("choose-your-location")}
                        </Typography>
                    </DialogTitle>


                    <Grid container spacing={2} sx={{ flexGrow: 1, mt: 2 }}>
                        <Grid xs={12} width={"100%"}>
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={selectedLocation}
                                zoom={zoomLevel}
                                onClick={handleMapClick}
                                options={{ streetViewControl: false, maxZoom: "16" }}
                            >
                                <Marker position={initialCenter} />
                            </GoogleMap>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ flexGrow: 1, mt: 2 }}>
                        <Grid xs={12} width={"100%"}>
                            <FormControl>
                                <FormLabel> {t("address")} </FormLabel>
                                <Input placeholder="Fill in the Address" {...addValueProps('address')} />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} width={"100%"}>
                            <FormControl>
                                <FormLabel> {t("area")} </FormLabel>
                                <Input placeholder="Fill in the Area" {...addValueProps('area')} />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} width={"100%"}>
                            <FormControl>
                                <FormLabel> {t("city")} </FormLabel>
                                <Input placeholder="Fill in the City" {...addValueProps('city')} />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} width={"100%"}>
                            <FormControl>
                                <FormLabel> {t("pincode")} </FormLabel>
                                <Input placeholder="Fill in the pincode" {...addValueProps('pincode')} />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} width={"100%"}>
                            <FormControl>
                                <FormLabel> {t("landmark")} </FormLabel>
                                <Input placeholder="Fill in the LandMark" {...addValueProps('landmark')} />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} width={"100%"}>
                            <FormLabel sx={{ mb: 1, color: "text.tertiary" }} > {t("mobile-number")} </FormLabel>
                            <PhoneInput
                                country={countryCode}
                                inputClass='generalClass'
                                placeholder="Enter phone number"
                                {...addValueProps('mobile')}
                                 inputStyle={{
                    width: "100%",
                    height: "45px",
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? theme.palette.primary[50]
                        : "#3B3B3B",
                   
                  }}
                            />
                        </Grid>
                        <Grid xs={12} width={"100%"}>
                            <FormLabel sx={{ mb: 1, color: "text.tertiary" }} >{t("alternate-mobile-number")}</FormLabel>
                            <PhoneInput
                                country={countryCode}
                                inputClass='generalClass'
                                placeholder="Enter alternate phone number"
                                {...addValueProps('alternate_mobile')}
                                 inputStyle={{
                    width: "100%",
                    height: "45px",
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? theme.palette.primary[50]
                        : "#3B3B3B",
                   
                  }}
                            />
                        </Grid>
                        <Grid xs={12} width={"100%"}>
                            <FormLabel sx={{ mb: 1, color: "text.tertiary" }} > {t("where-to")} </FormLabel>
                            <RadioGroup
                                aria-labelledby="storage-label"
                                size="sm"
                                {...addValueProps('type')}
                                sx={{ gap: 1.5, width: "100%", display: "flex", alignItems: "center", flexDirection: "row" }}
                            >
                                {['home', 'office', 'other'].map((value) => (
                                    <Sheet
                                        key={value}
                                        sx={{
                                            p: 2,
                                            borderRadius: 'md',
                                            boxShadow: 'sm',
                                            width: "33%",
                                        }}
                                    >
                                        <Radio
                                            key={value}
                                            label={t(value)}
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
                        <Grid xs={12}>
                            <Checkbox label={t("is-default")} color="primary"
                                checked={is_default_checked}
                                onChange={e => set_is_default_checked(e.target.checked)}
                            />
                        </Grid>
                    </Grid>

                    <DialogActions>
                        <Button fullWidth color="success" variant='solid' onClick={() => handleAddAddress()}>
                            {t("set-address")}
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </Box >
    );


}

export default AddUserAddressesModal