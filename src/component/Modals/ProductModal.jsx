"use client";
import React from 'react'
import { AspectRatio, Box, Card, CardContent, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog, Sheet, Typography, useTheme } from '@mui/joy';
import CustomButton from '../Buttons/CustomButton';
import Link from 'next/link';
import StarRatings from "react-star-ratings"

const ProductModal = ({ image, title, rating, price, description, variants = [], addOns = [], currentQty, }) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
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
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog variant={"soft"} size="lg">
                    <ModalClose
                        sx={{
                            position: "absolute",
                            top: "-5%",
                            right: "-1%",
                        }}
                    />
                    <DialogTitle>
                        <Card
                            variant="outlined"
                            orientation="horizontal"
                            sx={{
                                width: 500,
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
                                <Typography level="title-lg" id="card-description">
                                    Tortilla wrap with fresh salad
                                </Typography>
                                <Typography level="body-sm" aria-describedby="card-description" >
                                    <StarRatings rating={4.5} starDimension={theme.fontSize.xl} starSpacing='1px' starRatedColor={theme.palette.warning[400]} ></StarRatings>
                                </Typography>
                                <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.currency"} mb={1}>
                                    $ 120.00
                                </Typography>
                            </CardContent>
                        </Card>
                    </DialogTitle>
                    <DialogContent>
                        <Box>
                            <Typography>
                                Fattoush salad is a refreshing Middle Eastern dish with fresh veggies, herbs, and crispy pita bread, dressed in a zesty mix of olive oil and ...
                            </Typography>
                        </Box>

                        <Box>


                            <Box>
                                <Typography>
                                    Variants
                                </Typography>
                                <Box>
                                    {/* ["small [server 1]", "medium [server 2]", "big [server 3]"].map({
                                        
                                    }) */}
                                </Box>
                            </Box>
                            <Box></Box>

                        </Box>

                    </DialogContent>
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default ProductModal