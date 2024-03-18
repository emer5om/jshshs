"use client";
import React, {useEffect, useState} from 'react'
import { AspectRatio, Box, Button, Card, CardContent, Checkbox, DialogActions, DialogContent, DialogTitle, List, ListItem, Modal, ModalClose, ModalDialog, Radio, RadioGroup, Sheet, Typography, useTheme } from '@mui/joy';
import CustomButton from '../Buttons/CustomButton';
import Link from 'next/link';
import StarRatings from "react-star-ratings"
import { RiAddLine, RiSubtractLine } from '@remixicon/react';
import {formatePrice, isIncluded, parseCustomFloat} from '@/helpers/functonHelpers';
import {add_to_cart} from "@/events/actions";


const ProductModal = ({ image, title, rating,  description, variants = [], addOns = [], currentQty, simple }) => {

    const [open, setOpen] = React.useState(false);
    const [qty, setQty] = React.useState(1);
    const theme = useTheme();
    const [selectedVariant, setSelectedVariant] = useState(variants[0])

    const [price, setPrice] = useState(0)
    const [selectedAddons, setSelectedAddons] = useState([])
    const [loading, setLoading] = useState(false)
    const addTocart = async () => {
        setLoading(true)
        const state = await add_to_cart({product_variant_id: selectedVariant.id, qty: qty,addons: selectedAddons})
        setLoading(false)
        if(!state){
            return
        }
        setOpen(false)
    }


    const getPrice = () => {
        if(selectedVariant){

            let extraPrice = 0
            selectedAddons.forEach(item => {
                extraPrice+=parseCustomFloat(item.price)
            })

            selectedAddons.map(item => {
                console.log(item)
            })


            const special_price = parseCustomFloat(selectedVariant.special_price)+extraPrice
            const price = parseCustomFloat(selectedVariant.price)+extraPrice
            console.log(selectedVariant.price)
            if(special_price === 0){
                setPrice(price*qty)
            }else {
                setPrice(special_price*qty)
            }
        }
    }



    useEffect(() => {
        getPrice()
    },[qty,selectedVariant, setSelectedAddons, selectedAddons])


    const mainColor = theme.palette.text.menuText
    const currencyColor = theme.palette.text.currency
    return (
        <Box>

            <CustomButton text={"Add"} customStyle={{ px: 4, py: 0.5 }}

                    onClick={() => {

                        setOpen(true)
                        console.log(addOns)
                    }
                }
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
                                    src={image || "https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"}
                                    srcSet={image ||"https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"}
                                    loading="lazy"
                                    alt=""
                                />
                            </AspectRatio>
                            <CardContent>
                                <Box display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}>
                                    <Typography level="title-lg" id="card-description">
                                        {title}
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
                                    <StarRatings rating={rating ? typeof rating == "string" ? parseFloat(rating) : rating : 0} starDimension={theme.fontSize.xl} starSpacing='1px' starRatedColor={theme.palette.warning[400]} ></StarRatings>
                                </Typography>
                                <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.currency"} mb={1}>

                                    {formatePrice(price)}
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
                                {description}
                            </Typography>
                        </Box>

                        <Box>
                            {(addOns.length != 0 || !simple) && (
                                <Card variant="soft" color={theme.palette.neutral[50]}>
                                    {!simple && (
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
                                                            {variants.map((item, index) => (
                                                                <ListItem variant="plain" key={index} sx={{
                                                                    pb: 0
                                                                }}>
                                                                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                                                                        <Typography fontSize={"sm"} fontWeight={"md"} textColor={"text.currency"}>
                                                                            {item.variant_values}
                                                                        </Typography>
                                                                        <Radio
                                                                            // overlay
                                                                            value={item.variant_ids}
                                                                            label={
                                                                                <Typography
                                                                                    fontSize={"sm"} fontWeight={"md"} textColor={"text.currency"}
                                                                                >
                                                                                    {formatePrice(parseCustomFloat(item.special_price) !== 0 ? parseCustomFloat(item.special_price) : parseCustomFloat(item.price))}

                                                                                </Typography>
                                                                            }
                                                                            checked={selectedVariant.id == item.id}
                                                                            onChange={() => {
                                                                                setSelectedVariant(item)
                                                                            }}
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
                                    )}

                                    {addOns.length != 0 && (
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
                                                        {addOns.map((item, index) => (
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
                                                                                {formatePrice(item.price)}
                                                                            </Typography>
                                                                        }
                                                                        onChange={event => {
                                                                            const isChecked = event.target.checked;
                                                                            console.log(item);

                                                                            if (isChecked) {
                                                                                // Add item to selectedAddons if it doesn't exist
                                                                                if (!selectedAddons.some(obj => obj.id === item.id)) {
                                                                                    setSelectedAddons([...selectedAddons, item]);
                                                                                }
                                                                            } else {
                                                                                // Remove item from selectedAddons if it exists
                                                                                setSelectedAddons(
                                                                                    selectedAddons.filter(obj => obj.id !== item.id)
                                                                                );
                                                                            }
                                                                        }}
                                                                        checked={selectedAddons.some(obj => obj.id === item.id)}

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
                                    )}

                                </Card>
                            )}


                        </Box>

                    </DialogContent>

                    <DialogActions>
                        <CustomButton text={"Add To  Cart"} variant="solid" color="success" onClick={addTocart} disabled={loading} customStyle={{ px: 3, py: 1 }} />
                    </DialogActions>

                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default ProductModal