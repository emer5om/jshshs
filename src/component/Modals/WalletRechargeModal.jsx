"use client"
import { Box, Button, Modal, ModalClose, ModalDialog, DialogActions, DialogTitle, DialogContent, Stack, FormControl, FormLabel, Input, RadioGroup, List, ListItem, Radio } from '@mui/joy'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const WalletRechargeModal = () => {
    const settings = useSelector((state) => state.settings);
    console.log(settings.value.paymentMethod)


    const [open, setOpen] = useState(false);
    return (
        <Box>
            <Button
                variant="solid"
                color="primary"
                fullWidth
                onClick={() => setOpen(true)}
            >
                Add Money
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog size='lg' sx={{ maxHeight: "100%" }}>
                    <ModalClose />
                    <DialogTitle>Create new project</DialogTitle>
                    <DialogContent>Fill in the information of the project.</DialogContent>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input autoFocus required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input required />
                        </FormControl>

                        <RadioGroup aria-label="Your plan" name="people" defaultValue="Individual">
                            <List
                                sx={{
                                    minWidth: 240,
                                    '--List-gap': '0.5rem',
                                    '--ListItem-paddingY': '1rem',
                                    '--ListItem-radius': '8px',
                                    '--ListItemDecorator-size': '32px',
                                }}
                            >
                                {['Individual', 'Team', 'Enterprise'].map((item, index) => (
                                    <ListItem variant="outlined" key={item} sx={{ boxShadow: 'sm' }}>
                                        {/* <ListItemDecorator>
                                            {[<Person />, <People />, <Apartment />][index]}
                                        </ListItemDecorator> */}
                                        <Radio
                                            overlay
                                            value={item}
                                            label={item}
                                            sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                                            slotProps={{
                                                action: ({ checked }) => ({
                                                    sx: (theme) => ({
                                                        ...(checked && {
                                                            inset: -1,
                                                            border: '2px solid',
                                                            borderColor: theme.vars.palette.primary[500],
                                                        }),
                                                    }),
                                                }),
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </RadioGroup>
                        <Button >Submit</Button>
                    </Stack>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default WalletRechargeModal