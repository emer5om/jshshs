"use client";

import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Checkbox, DialogActions, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog, Radio, RadioGroup, Sheet, Typography, useTheme } from '@mui/joy';
import { useSelector, useDispatch } from 'react-redux';
import { RiBuildingLine, RiHomeSmileLine, RiMapPinLine } from '@remixicon/react';
import { setDeliveryAddress } from "../../store/reducers/selectedDeliverySlice"
import {useTranslation} from "react-i18next";
import AddUserAddressesModal from '../Modals/AddUserAddressesModal';

const AddressSelector = () => {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const userAddresses = useSelector((state) => state.userAddresses)?.value;
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedDeliveryAddress = useSelector((state) => state.selectedDeliveryAddress)?.value;

  // Find the default address from userAddresses
  const defaultAddress = userAddresses?.find((item) => item.is_default === "1");

  // Set the default address in the component's effect
  React.useEffect(() => {
    if (defaultAddress) {
      setSelectedAddress(selectedDeliveryAddress ? selectedDeliveryAddress.id : defaultAddress.id);
    }
  }, [defaultAddress]);


 

  const handleAddressSelection = () => {
    const address = userAddresses?.find((item) => item.id === selectedAddress);
    // console.log(address)
    dispatch(setDeliveryAddress(address))
    setOpen(false)
  }
  const {t} = useTranslation()
  return (
    <>
      <Button
        variant="text"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <Typography  textColor={
                          theme.palette.mode === "light"
                            ? "text.menuText"
                            : "text.secondary"
                        }>
          {t("change")}
        </Typography>
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog size='lg' sx={{ maxHeight: "100%", height: "auto",minWidth:{sm:600,md:800} }}>
          <ModalClose />
          <DialogTitle>{t("select-Delivery-Address")}</DialogTitle>
          <DialogContent>Select Drop Location!</DialogContent>
          <AddUserAddressesModal />
          <RadioGroup
            aria-labelledby="storage-label"
            defaultValue={selectedAddress}
            size="lg"
            sx={{ gap: 1.5 }}
            onChange={e => setSelectedAddress(e.target.value)}
          >
            {userAddresses?.map((item, index) => {
              return (
                <Sheet
                  key={item.id}
                  sx={{
                    p: 2,
                    borderRadius: 'md',
                    boxShadow: 'sm',
                  }}
                >
                  <Radio
                    label={
                      <Typography

                        startDecorator=
                        {item.type == "home" ? <RiHomeSmileLine /> : (item.type == "office" ? <RiBuildingLine /> : <RiMapPinLine />)}
                      >
                        {item.address}
                      </Typography>
                    }
                    overlay
                    disableIcon
                    value={item.id}
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
              )
            })}
          </RadioGroup>

          <DialogActions>
            <Button fullWidth onClick={() => handleAddressSelection()}> Use This Location! </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default AddressSelector

/**
 * 
 *  ${item.type == "home" ? <RiHomeSmileLine /> : (item.type == "office" ? <RiBuildingLine /> : <RiMapPinLine />)}
                    ${item.address}
 */