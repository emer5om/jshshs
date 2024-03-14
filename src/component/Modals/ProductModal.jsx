"use client";
import React from 'react'
import { AspectRatio, Box, Button, Card, CardContent, Checkbox, DialogActions, DialogContent, DialogTitle, List, ListItem, Modal, ModalClose, ModalDialog, Radio, RadioGroup, Sheet, Typography, useTheme } from '@mui/joy';
import CustomButton from '../Buttons/CustomButton';
import Link from 'next/link';
import StarRatings from "react-star-ratings"
import { RiAddLine, RiSubtractLine } from '@remixicon/react';
import { formatePrice } from '@/helpers/functonHelpers';

const ProductModal = ({ image, title, rating, price, description, variants = [], addOns = [], currentQty, }) => {
    const [open, setOpen] = React.useState(false);
    const [qty, setQty] = React.useState(1);
    const theme = useTheme();

    const mainColor = theme.palette.text.menuText
    const currencyColor = theme.palette.text.currency
    return (
        <Box>

            <CustomButton text={"Add"} customStyle={{ px: 4, py: 0.5 }}

                onClick={() => setOpen(true)}
            />


            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: "scroll", maxHeight: "100%" }}
            >
                <ModalDialog variant={"soft"} size="lg" maxWidth={"sm"} sx={{ minHeight: 580 }}>
                    <ModalClose
                        color="warning"
                        component={Button}
                        sx={{
                            // width: "7%",
                            position: "absolute",
                            top: "-2%",
                            right: "-2%",
                        }}
                    />
                    <DialogTitle>
                        <Card
                            variant="outlined"
                            orientation="horizontal"
                            sx={{
                                width: "100%",
                                backgroundColor: "transparent",
                                border: "none",
                                p: 0
                            }}
                        >
                            <AspectRatio ratio="1" sx={{ width: 90 }}>
                                <img
                                    src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                                    srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                                    loading="lazy"
                                    alt=""
                                />
                            </AspectRatio>
                            <CardContent>
                                <Box display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}>
                                    <Typography level="title-lg" id="card-description">
                                        Tortilla wrap with fresh salad
                                    </Typography>
                                    <Box
                                        border={"1px solid"}
                                        borderColor={theme.palette.primary[400]}
                                        p={0.5}
                                        sx={{ backgroundColor: theme.palette.primary[400] }}
                                        borderRadius={"md"}
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                        width={"20%"}
                                        gap={0.5}
                                    >
                                        <CustomButton text={<RiAddLine color={mainColor} />} variant='soft' customStyle={{ color: "primary.500", backgroundColor: "background.body" }}
                                            onClick={() => { setQty(qty + 1) }}
                                        />
                                        <Typography fontSize={"sm"} fontWeight={"md"} textColor={mainColor}>
                                            {qty}
                                        </Typography>
                                        <CustomButton text={<RiSubtractLine color={mainColor} />} variant='text' customStyle={{ color: "primary.500", backgroundColor: "background.body" }}
                                            onClick={() => {
                                                if (qty > 0) {
                                                    setQty(qty - 1)
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Typography level="body-sm" aria-describedby="card-description" >
                                    <StarRatings rating={4.5} starDimension={theme.fontSize.xl} starSpacing='1px' starRatedColor={theme.palette.warning[400]} ></StarRatings>
                                </Typography>
                                <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.currency"} mb={1}>
                                    {formatePrice(120.00)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </DialogTitle>
                    <DialogContent
                        sx={{
                            height: "100%"
                        }}
                    >
                        <Box>
                            <Typography>
                                Fattoush salad is a refreshing Middle Eastern dish with fresh veggies, herbs, and crispy pita bread, dressed in a zesty mix of olive oil and ...
                            </Typography>
                        </Box>

                        <Box>

                            <Card variant="soft" color={theme.palette.neutral[50]}>
                                <CardContent>
                                    <Box>
                                        <Typography fontSize={"md"} fontWeight={"lg"} >
                                            Variants
                                        </Typography>
                                        <Box>
                                            <RadioGroup name="radio-buttons-group">

                                                <List
                                                    sx={{
                                                        minWidth: 240,
                                                        '--List-gap': '0.5rem',
                                                        '--ListItem-paddingY': '1rem',
                                                        '--ListItem-radius': '8px',
                                                        '--ListItemDecorator-size': '32px',
                                                    }}
                                                >
                                                    {[
                                                        { title: "small [server 1]", price: 150 },
                                                        { title: "medium [server 2]", price: 250 },
                                                        { title: "big [server 3]", price: 350 }

                                                    ].map((item, index) => (
                                                        <ListItem variant="plain" key={index} sx={{
                                                            pb: 0
                                                        }}>
                                                            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                                                                <Typography fontSize={"sm"} fontWeight={"md"} textColor={"text.currency"}>
                                                                    {item.title}
                                                                </Typography>
                                                                <Radio
                                                                    // overlay
                                                                    value={item.title}
                                                                    label={
                                                                        <Typography
                                                                            fontSize={"sm"} fontWeight={"md"} textColor={"text.currency"}
                                                                        >
                                                                            {item.price}
                                                                        </Typography>
                                                                    }
                                                                    variant="solid"
                                                                    sx={{ flexDirection: 'row-reverse' }}
                                                                />
                                                            </Box>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </RadioGroup>
                                        </Box>
                                    </Box>
                                </CardContent>

                                <CardContent>
                                    <Box>

                                        <Typography fontSize={"md"} fontWeight={"lg"} >
                                            Extra Add Ons
                                        </Typography>
                                        <Box>
                                            <List
                                                sx={{
                                                    minWidth: 240,
                                                    '--List-gap': '0.5rem',
                                                    '--ListItem-paddingY': '1rem',
                                                    '--ListItem-radius': '8px',
                                                    '--ListItemDecorator-size': '32px',
                                                }}
                                            >
                                                {[
                                                    { title: "Cheese", price: 0.50 },
                                                    { title: "Onion", price: 0.10 },
                                                    { title: "Tomato ketchup", price: 0.20 }

                                                ].map((item, index) => (
                                                    <ListItem variant="plain" key={index} sx={{
                                                        pb: 0
                                                    }}>
                                                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                                                            <Typography fontSize={"sm"} fontWeight={"md"} textColor={"text.currency"}>
                                                                {item.title}
                                                            </Typography>
                                                            <Checkbox
                                                                // overlay
                                                                value={item.title}
                                                                label={
                                                                    <Typography
                                                                        fontSize={"sm"} fontWeight={"md"} textColor={"text.currency"}
                                                                    >
                                                                        {item.price}
                                                                    </Typography>
                                                                }
                                                                variant="solid"
                                                                sx={{ flexDirection: 'row-reverse' }}
                                                            />
                                                        </Box>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Box>

                                    </Box>
                                </CardContent>
                            </Card>

                        </Box>

                    </DialogContent>

                    <DialogActions>
                        <CustomButton text={"Add To  Cart"} variant="solid" color="success" customStyle={{ px: 3, py: 1 }} />
                    </DialogActions>

                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default ProductModal