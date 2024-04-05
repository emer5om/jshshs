"use client";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
    Grid,
    Checkbox,
    IconButton,
    styled,
    AspectRatio
} from '@mui/joy'
import React, { useState, useCallback, useMemo } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import { useTheme } from '@mui/joy/styles'
import Image from 'next/image' // Import the optimized Image component from Next.js
import ProductModal from "../Modals/ProductModal"
// Components
import CustomButton from '../Buttons/CustomButton';

// icons
import { RiHeartFill, RiHeartLine, RiStarFill } from '@remixicon/react';
import { useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '@/interceptor/routes';
import toast from 'react-hot-toast';
import { formatePrice } from '@/helpers/functonHelpers';
import { getUserData } from '@/events/getters';
import { useTranslation } from "react-i18next";

const PopularCards = React.memo(({ data, showHeadline = "true" }) => {
    const theme = useTheme()

    const userData = getUserData()

    const { t } = useTranslation()
    const branchData = useSelector((state) => state.branch);
    const authentication = userData === false ? false : true;
    const branch_id = branchData.id
    const [indeterminate, setIndeterminate] = useState(false)

    const [checkedItems, setCheckedItems] = useState(
        userData !== false ?
            data.reduce((acc, item) => {
                acc[item.id] = item.is_favorite == 1;
                return acc;
            }, {}
            ) : false
    );

    const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
        '& .MuiCheckbox-checkbox': {
            // Add your custom styles here
            padding: 0,
            border: 'none',
            backgroundColor: theme.palette.primary[400],
            '&:hover': {
                backgroundColor: theme.palette.primary[400],
            },
        },
    }));

    const handleFavChange = useCallback(
        async (value, id) => {

            if (authentication === false) {
                return toast.error("Please Login First!");
            }

            setIndeterminate(true);
            if (value) {
                const add_fav = await addToFavorite({ type_id: id, branch_id });
                setIndeterminate(false);

                if (add_fav.error) {
                    toast.error(add_fav.message);
                } else {
                    toast.success(add_fav.message);
                }
            } else {
                const removeFav = await removeFromFavorite({ type_id: id, branch_id });
                setIndeterminate(false);

                if (removeFav.error) {
                    toast.error(removeFav.message);
                } else {
                    toast.success(removeFav.message);
                }
            }
        },
        [branch_id]
    );

    const handleCheckboxChange = useCallback(
        (id, checked) => {
            setCheckedItems((prevCheckedItems) => ({
                ...prevCheckedItems,
                [id]: checked,
            }));
            handleFavChange(checked, id);
        },
        [handleFavChange]
    );

    const renderCards = useMemo(() => data.map((item, index) => (
        <Grid xs={12} sm={6} md={3} lg={2} key={index}>
            <Card sx={{
                width: "100%",
                p: 0,
                borderRadius: theme.radius.xl,
                "&:hover": {
                    backgroundColor:theme.palette.mode === "light" ? theme.palette.primary[50] :theme.palette.primary[700] ,
                    "& .img": {
                        transform: "scale(1.07)",
                    },
                    boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                        

                },
                transition: "transform 0.3s ease-in-out"

            }} >
                <CardContent>
                    <CardActions sx={{
                        position: "absolute",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        width: "100%"
                    }}>
                        <Box px={1.5} py={1} >
                            <Image
                                src={item.indicator == 1 ? "/images/icons/Veg.svg" : "/images/icons/non-veg.jpg"}
                                alt='veg-non-veg.icon'
                                width={18}
                                height={18}
                            />
                        </Box>
                        <Box bgcolor={theme.palette.primary[400]} px={2.5} py={2} sx={{ borderRadius: "0px 16px 0px 42.5px", mt: "-1px" }}>
                            <StyledCheckbox
                                overlay={false}
                                color="warning"
                                checked={checkedItems[item.id] || false}
                                onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                                sx={{
                                    backgroundColor: `${theme.palette.primary[400]} !important`,
                                }}
                                uncheckedIcon={<RiHeartLine size={"20px"} color='white' />}
                                checkedIcon={
                                    <RiHeartFill size={"20px"} color={theme.palette.danger[500]} />
                                }
                            />
                        </Box>
                    </CardActions>

                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} mt={1}>
                        <AspectRatio ratio={1} sx={{
                            width: 120, borderRadius: "50%",
                            transition: "transform 0.5s ease-in-out"
                        }}
                            className='img'

                        >
                            <Box
                                width={100}
                                height={100}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                borderRadius={"50%"}
                            >
                                <Box
                                    // className='img'
                                    component={"img"}
                                    src={item.image_sm}
                                    srcSet={`${item.image} 2x`}
                                    loading="lazy"
                                    alt=""
                                    borderRadius={"50%"}
                                    maxHeight={"100%"}
                                    maxWidth={"100%"}
                                    sx={{ transition: "transform 0.3s ease-in-out" }} // Smooth transition
                                >

                                </Box>
                            </Box>
                        </AspectRatio>
                    </Box>
                    <Box p={2} display={"flex"} flexDirection={"column"} alignItems={"start"} justifyContent={"space-between"} gap={1}>
                        <Typography fontSize={theme.fontSize.md}  fontWeight={theme.fontWeight.lg}
                            sx={{ textOverflow: "ellipsis", width: "100%", textWrap: "nowrap", overflow: "hidden",color: theme.palette.text.description }}
                        >
                            {item.name}
                        </Typography>
                        <Typography
                            textOverflow={"ellipsis"}
                            overflow={"hidden"}
                            sx={{ color: theme.palette.text.description, textWrap: "nowrap", }}
                            fontSize={theme.fontSize.sm}
                            fontWeight={theme.fontWeight.md}>
                            {item.short_description}
                        </Typography>
                        <ProductModal
                            image={item.image_sm}
                            title={item.name}
                            rating={item.rating}
                            description={item.short_description}
                            variants={item.variants}
                            addOns={item.product_add_ons}
                            simple={item.type}
                        />
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                              
                                {item.variants && item.variants[0]?.special_price > 0 ?
                                    <Typography sx={{  textDecoration: "line-through" }} textColor={ theme.palette.text.currency} fontSize={theme.fontSize.xs} fontWeight={theme.fontWeight.sm}>
                                        {formatePrice(item.variants[0]?.price)}
                                    </Typography>
                                    : ''}
                                <Typography sx={{ color: theme.palette.text.currency }} fontSize={theme.fontSize.md} fontWeight={theme.fontWeight.lg}>
                                    {item.variants && (item.variants[0]?.special_price > 0 ?
                                        formatePrice(item.variants[0]?.special_price)
                                        : formatePrice(item.variants[0]?.price))}
                                </Typography>

                            </Box>
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                <RiStarFill size={theme.fontSize.sm} color={theme.palette.warning[500]} />
                                <Typography fontSize={theme.fontSize.sm} fontWeight={theme.fontWeight.lg}>{item.rating}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )), [data, theme, indeterminate, handleFavChange]);

    return (
        <Box display={"flex"} flexDirection={"column"}>
            {showHeadline &&
                <SectionHeading
                    title={t("popular-dishes")}
                    showMore={true}
                    showMoreLink="/popular-dishes"
                />
            }

            <Grid container spacing={2} sx={{margin:0}} >
                {renderCards}
            </Grid>
        </Box>
    )
})

export default PopularCards