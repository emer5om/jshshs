"use client";
import React, { useState } from 'react'
import { AspectRatio, Box, Button, Card, CardActions, CardContent, Chip, Divider, Grid, List, ListItem, Radio, RadioGroup, Typography, useTheme, Avatar, Textarea } from '@mui/joy';


// icons
import {
    RiShoppingBag2Line,
    RiAddCircleFill,
    RiBillLine,
    RiMoneyRupeeCircleLine,
    RiMapPinLine,
    RiCoupon2Line,
    RiStickyNoteAddLine,
    RiAddLine,
    RiSubtractLine,
    RiPencilLine,
    RiArticleLine,
    RiHomeSmileLine,
    RiHandCoinLine,
    RiCheckLine as CheckIcon
} from "@remixicon/react"
import CustomButton from '@/component/Buttons/CustomButton';

const ViewCart = () => {
    const [deliveryType, setDeliveryType] = useState("Delivery")
    const [selected, setSelected] = useState('');

    const theme = useTheme();

    const mainColor = theme.palette.text.menuText
    const currencyColor = theme.palette.text.currency

    return (
        <Box>
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid xs={12} my={4}>
                    <RadioGroup aria-label="Delivery Type" name="Delivery Type" value={deliveryType}>
                        <List
                            orientation="horizontal"
                            sx={{
                                minWidth: 240,
                                '--List-gap': '0.5rem',
                                '--ListItem-paddingY': '1rem',
                                '--ListItem-radius': '8px',
                                '--ListItemDecorator-size': '32px',
                            }}
                        >
                            {['Delivery', 'Pick Up'].map(item => (
                                <ListItem variant="outlined" key={item} sx={{ boxShadow: 'sm' }}>
                                    <Radio
                                        overlay
                                        value={item}
                                        label={item}
                                        sx={{ flexGrow: 1 }}
                                        onChange={e => { setDeliveryType(e.target.value) }}
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
                </Grid>
                <Grid xs={12} md={6} >
                    <Grid container gap={3} sx={{ flexGrow: 1 }}>
                        <Grid xs={12} >
                            <Card sx={{ borderRadius: "lg" }}>
                                <CardActions sx={{ justifyContent: "space-between", alignItems: "center", pt: 0 }}>
                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                        <RiShoppingBag2Line color={theme.palette.text.menuText} />
                                        <Typography textColor={"text.menuText"} fontSize={"lg"} fontWeight={"xl"}> Food In Your Bag </Typography>
                                    </Box>
                                    <Typography fontSize={"md"} fontWeight={"lg"} textColor={"danger.solidBg"}> Clear Cart </Typography>
                                </CardActions>

                                <CardContent sx={{ px: { md: 4, xs: 1 } }}>
                                    <Divider orientation="horizontal" />

                                    <Box py={1} >
                                        <Card
                                            variant="plain"
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: { xs: "column", md: "row" },
                                                alignItems: { xs: "center", md: "start" },
                                                borderRadius: "md",
                                                p: 0
                                            }}
                                        >
                                            <Box maxWidth={"40%"}>
                                                <Box
                                                    component={"img"}
                                                    src="https://images.unsplash.com/photo-1507833423370-a126b89d394b"
                                                    srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b 2x"
                                                    loading="lazy"
                                                    alt=""
                                                    width={"70px"}
                                                    sx={{
                                                        borderRadius: "md"
                                                    }}
                                                >
                                                </Box>
                                            </Box>
                                            <CardContent sx={{ maxWidth: "90%", flexDirection: { md: "row", xs: "column" }, alignItems: { md: 'flex-start', xs: "center" }, textAlign: { xs: "center", md: "left" }, gap: 1 }}>
                                                <Box maxWidth={"10%"}>
                                                    <Box
                                                        component={"img"}
                                                        src={"/images/icons/veg.png"}
                                                        width={"20px"}
                                                    ></Box>
                                                </Box>
                                                <Box
                                                    display={"flex"}
                                                    justifyContent={"space-between"}
                                                    flexDirection={"column"}
                                                    width={"80%"}
                                                >
                                                    <Box
                                                        display={"flex"}
                                                        alignItems={"center"}
                                                        gap={1}
                                                        maxWidth={"100%"}
                                                    >

                                                        <Typography textColor={"text.menuText"} fontSize={"md"} fontWeight={"lg"} textOverflow={"ellipsis"} width={{ md: "85%", xs: "100%" }} sx={{ textWrap: { md: "nowrap", xs: "pretty" }, overflow: "hidden" }}>
                                                            Tortilla Wrap With Fresh Salad ( 750 GM )
                                                            Tortilla Wrap With Fresh Salad ( 750 GM )
                                                            Tortilla Wrap With Fresh Salad ( 750 GM )
                                                        </Typography>
                                                    </Box>

                                                    <Box display={"flex"} alignItems={"center"} justifyContent={{ xs: "center", md: "start" }} gap={2}>
                                                        <Typography fontSize={"sm"} fontWeight={"md"} mb={1} textColor={currencyColor}>
                                                            Medium
                                                        </Typography>

                                                        <Typography fontSize={"sm"} fontWeight={"md"} mb={1}
                                                            textColor={currencyColor}
                                                            endDecorator={<RiPencilLine color={currencyColor} />}
                                                        >
                                                            edit
                                                        </Typography>


                                                    </Box>
                                                </Box>
                                                <Box
                                                    border={"1px solid"}
                                                    borderColor={theme.palette.primary[400]}
                                                    borderRadius={"md"}
                                                    display={"flex"}
                                                    alignItems={"center"}
                                                    justifyContent={"space-between"}
                                                    minWidth={"13%"}
                                                >
                                                    <CustomButton text={<RiAddLine color={mainColor} />} variant='text' customStyle={{ color: "primary.500" }} />
                                                    <Typography fontSize={"sm"} fontWeight={"md"} textColor={mainColor}>
                                                        10
                                                    </Typography>
                                                    <CustomButton text={<RiSubtractLine color={mainColor} />} variant='text' customStyle={{ color: "primary.500" }} />
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>

                                    <Divider />

                                    <Box py={1} >
                                        <Card
                                            variant="plain"
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: { xs: "column", md: "row" },
                                                alignItems: { xs: "center", md: "start" },
                                                borderRadius: "md",
                                                p: 0
                                            }}
                                        >
                                            <Box maxWidth={"40%"}>
                                                <Box
                                                    component={"img"}
                                                    src="https://images.unsplash.com/photo-1507833423370-a126b89d394b"
                                                    srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b 2x"
                                                    loading="lazy"
                                                    alt=""
                                                    width={"70px"}
                                                    sx={{
                                                        borderRadius: "md"
                                                    }}
                                                >
                                                </Box>
                                            </Box>
                                            <CardContent sx={{ maxWidth: "90%", flexDirection: { md: "row", xs: "column" }, alignItems: { md: 'flex-start', xs: "center" }, textAlign: { xs: "center", md: "left" }, gap: 1 }}>
                                                <Box maxWidth={"10%"}>
                                                    <Box
                                                        component={"img"}
                                                        src={"/images/icons/veg.png"}
                                                        width={"20px"}
                                                    ></Box>
                                                </Box>
                                                <Box
                                                    display={"flex"}
                                                    justifyContent={"space-between"}
                                                    flexDirection={"column"}
                                                    width={"80%"}
                                                >
                                                    <Box
                                                        display={"flex"}
                                                        alignItems={"center"}
                                                        gap={1}
                                                        maxWidth={"100%"}
                                                    >

                                                        <Typography textColor={"text.menuText"} fontSize={"md"} fontWeight={"lg"} textOverflow={"ellipsis"} width={{ md: "85%", xs: "100%" }} sx={{ textWrap: { md: "nowrap", xs: "pretty" }, overflow: "hidden" }}>
                                                            Tortilla Wrap With Fresh Salad ( 750 GM )
                                                            Tortilla Wrap With Fresh Salad ( 750 GM )
                                                            Tortilla Wrap With Fresh Salad ( 750 GM )
                                                        </Typography>
                                                    </Box>

                                                    <Box display={"flex"} alignItems={"center"} justifyContent={{ xs: "center", md: "start" }} gap={2}>
                                                        <Typography fontSize={"sm"} fontWeight={"md"} mb={1} textColor={currencyColor}>
                                                            Medium
                                                        </Typography>

                                                        <Typography fontSize={"sm"} fontWeight={"md"} mb={1}
                                                            textColor={currencyColor}
                                                            endDecorator={<RiPencilLine color={currencyColor} />}
                                                        >
                                                            edit
                                                        </Typography>


                                                    </Box>
                                                </Box>
                                                <Box
                                                    border={"1px solid"}
                                                    borderColor={theme.palette.primary[400]}
                                                    borderRadius={"md"}
                                                    display={"flex"}
                                                    alignItems={"center"}
                                                    justifyContent={"space-between"}
                                                    minWidth={"13%"}
                                                >
                                                    <CustomButton text={<RiAddLine color={mainColor} />} variant='text' customStyle={{ color: "primary.500" }} />
                                                    <Typography fontSize={"sm"} fontWeight={"md"} textColor={mainColor}>
                                                        10
                                                    </Typography>
                                                    <CustomButton text={<RiSubtractLine color={mainColor} />} variant='text' customStyle={{ color: "primary.500" }} />
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                    <Divider />
                                </CardContent>


                                <CardActions sx={{ justifyContent: "start", alignItems: "center", color: 'text.currency' }} >
                                    <RiAddCircleFill />
                                    <Typography fontSize={"lg"} fontWeight={"xl"} textColor={"text.currency"}> Food In Your Bag </Typography>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid xs={12} sx={{ width: "100%" }}>
                            <Card sx={{ borderRadius: "lg", width: "100%" }}>

                                <CardActions sx={{ pt: 0, gap: 1 }}>
                                    <RiArticleLine color={theme.palette.text.menuText} />
                                    <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.menuText"}>Bill Details</Typography>
                                </CardActions>

                                <CardContent sx={{ px: { md: 2, xs: 1 } }}>
                                    <Divider sx={{ my: 1 }} />

                                    <Box >
                                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                            <Typography textColor={"text.menuText"} fontWeight={"md"}>Item Total</Typography>
                                            <Typography textColor={"text.currency"} fontWeight={"lg"}>$ 380.00</Typography>
                                        </Box>
                                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                            <Typography textColor={"text.menuText"} fontWeight={"md"}>Delivery Partner Tip</Typography>
                                            <Typography textColor={"text.currency"} fontWeight={"lg"}>$ 20.00</Typography>
                                        </Box>
                                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                            <Typography textColor={"text.menuText"} fontWeight={"md"}>Delivery Charges</Typography>
                                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                                <Typography textColor={"text.currency"} fontWeight={"lg"}
                                                    sx={{ textDecoration: "line-through" }}
                                                >$ 20.00</Typography>
                                                <Typography textColor={"text.menuText"} fontWeight={"lg"}>Free</Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ my: 1 }} />

                                    <Box>
                                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                            <Typography textColor={"text.menuText"} fontWeight={"md"}>Coupon Discount</Typography>
                                            <Typography textColor={"text.currency"} fontWeight={"lg"}>$ 100.00</Typography>
                                        </Box>
                                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                            <Typography textColor={"text.menuText"} fontWeight={"md"}>Taxes & Charges (17%)</Typography>
                                            <Typography textColor={"text.currency"} fontWeight={"lg"}>$ 80.00</Typography>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ mt: 1 }} />
                                </CardContent>

                                <CardActions orientation="horizontal" sx={{ justifyContent: "space-between", pr: 2 }}>
                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                        <RiMoneyRupeeCircleLine color={theme.palette.text.menuText} />
                                        <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.menuText"}>Total Pay</Typography>
                                    </Box>
                                    <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.currency"}>$380.00</Typography>
                                </CardActions>

                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                <Divider orientation="vertical" sx={{ mx: 3 }} />


                <Grid xs={12} md={5.5}>
                    <Grid container gap={3} sx={{ flexGrow: 1 }}>

                        {deliveryType === "Delivery" &&
                            <Grid xs={12} width={"100%"}>
                                <Card orientation="vertical" sx={{ px: 1 }}>
                                    <CardActions orientation="horizontal"
                                        sx={{
                                            pt: 0,
                                            pb: 0,
                                            px: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                        <Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={1}>
                                            <RiMapPinLine color={theme.palette.text.menuText} />
                                            <Typography
                                                textColor={"text.menuText"}
                                                fontSize={"md"}
                                                fontWeight={"lg"}
                                            > Delivery Address </Typography>
                                        </Box>
                                        <Typography
                                            textColor={"text.currency"}
                                            fontSize={"sm"}
                                            fontWeight={"md"}
                                        > Change </Typography>
                                    </CardActions>

                                    <CardContent orientation="vertical" sx={{ px: { md: 4, xs: 2 } }}>
                                        <Divider sx={{ my: 1, width: "100%" }} />
                                        <Box>
                                            <Box display={"flex"} flexDirection={"column"} gap={1}>
                                                <Box display={"flex"} alignItems={"center"} gap={1} color={"text.currency"}>
                                                    <RiHomeSmileLine />
                                                    <Typography textColor={"text.currency"} fontSize={"md"} fontWeight={"lg"}>
                                                        Home
                                                    </Typography>
                                                </Box>
                                                <Box fontWeight={"md"}>
                                                    <Typography>
                                                        123 Oak Street,
                                                        Los Angeles, California,
                                                        United States,
                                                        Zip Code: 90001
                                                    </Typography>
                                                </Box>

                                                <Box display={"flex"} alignItems={"center"} gap={1}>
                                                    <Box display={"flex"} alignItems={"center"} gap={0.5}>
                                                        <Avatar alt="Remy Sharp" src="https://xsgames.co/randomusers/avatar.php?g=male" size='md' />
                                                        <Typography fontSize={"md"} fontWeight={"md"} textColor={"text.menuText"}>
                                                            Thomas Edison
                                                        </Typography>
                                                    </Box>
                                                    <Divider orientation="vertical" />
                                                    <Typography fontSize={"md"} fontWeight={"md"} textColor={"text.menuText"}>
                                                        01234567890
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        }



                        <Grid xs={12} width={"100%"}>
                            <Card orientation="vertical" sx={{ px: 1 }}>
                                <CardActions orientation="horizontal"
                                    sx={{
                                        pt: 0,
                                        pb: 0,
                                        px: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                    <Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={1}>
                                        <RiCoupon2Line color={theme.palette.text.menuText} />
                                        <Typography
                                            textColor={"text.menuText"}
                                            fontSize={"md"}
                                            fontWeight={"lg"}
                                        > Add Coupon </Typography>
                                    </Box>
                                    <Typography
                                        textColor={"text.currency"}
                                        fontSize={"sm"}
                                        fontWeight={"md"}
                                    > View All </Typography>
                                </CardActions>
                            </Card>
                        </Grid>


                        {deliveryType === "Delivery" &&
                            <Grid xs={12} width={"100%"}>
                                <Card orientation="vertical" sx={{ px: 1 }}>
                                    <CardActions orientation="horizontal"
                                        sx={{
                                            pt: 0,
                                            pb: 0,
                                            px: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                        <Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={1}>
                                            <RiHandCoinLine color={theme.palette.text.menuText} />
                                            <Typography
                                                textColor={"text.menuText"}
                                                fontSize={"md"}
                                                fontWeight={"lg"}
                                            > Tip Delivery Boy </Typography>
                                        </Box>
                                    </CardActions>

                                    <CardContent orientation="vertical" sx={{ px: { md: 4, xs: 2 } }}>
                                        <Divider sx={{ my: 1, width: "100%" }} />
                                        <Box>
                                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                <RadioGroup
                                                    name="best-movie"
                                                    aria-labelledby="best-movie"
                                                    orientation="horizontal"
                                                    sx={{ flexWrap: 'wrap', gap: 1 }}
                                                >
                                                    {[
                                                        "$5", "$10", "15", "$20", "Other",
                                                    ].map((name) => {
                                                        const checked = selected === name;
                                                        return (
                                                            <Chip
                                                                key={name}
                                                                variant="plain"
                                                                color={checked ? 'primary' : 'neutral'}
                                                                sx={{
                                                                    borderRadius: "sm",
                                                                    px: 2
                                                                }}
                                                                startDecorator={
                                                                    checked && <CheckIcon />
                                                                }
                                                            >
                                                                <Radio
                                                                    variant="outlined"
                                                                    color={checked ? 'primary' : 'neutral'}
                                                                    disableIcon
                                                                    overlay
                                                                    label={name}
                                                                    value={name}
                                                                    checked={checked}
                                                                    onChange={(event) => {
                                                                        if (event.target.checked) {
                                                                            setSelected(name);
                                                                        }
                                                                    }}
                                                                />
                                                            </Chip>
                                                        );
                                                    })}
                                                </RadioGroup>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        }


                        <Grid xs={12} width={"100%"}>
                            <Card orientation="vertical" sx={{ px: 1 }}>
                                <CardActions orientation="horizontal"
                                    sx={{
                                        pt: 0,
                                        pb: 0,
                                        px: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                    <Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={1}>
                                        <RiStickyNoteAddLine color={theme.palette.text.menuText} />
                                        <Typography
                                            textColor={"text.menuText"}
                                            fontSize={"md"}
                                            fontWeight={"lg"}
                                        > Add Notes for restaurants </Typography>
                                    </Box>
                                </CardActions>

                                <CardContent orientation="vertical" sx={{ px: { md: 4, xs: 2 } }}>
                                    <Divider sx={{ my: 1, width: "100%" }} />
                                    <Box>
                                        <Textarea variant="soft" placeholder='Add Notes for restaurants ...' minRows={4} />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid xs={6} my={4}>
                    <CustomButton text={"Confirm Order"} variant="solid" customStyle={{ px: 4, py: 2, width: '50%', color: mainColor, fontSize: "md" }} />
                </Grid>
            </Grid>
        </Box >
    )
}

export default ViewCart