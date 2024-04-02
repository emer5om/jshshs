"use client"
import React, {useEffect} from 'react'
import { Box } from '@mui/joy';
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import dynamic from "next/dynamic";
import {validateView} from "@/helpers/authGuard";
import {useRouter} from "next/router";
import {isLogged} from "@/events/getters";
import {HeadTitle} from "@/component/HeadTitle";
import {useTranslation} from "react-i18next";

const ViewCart = dynamic(() => import('@/views/ViewCart'), {
    ssr: false
});



const index = () => {
    const router = useRouter()
    useEffect(() => {
        if(!isLogged()){
            router.replace("/")
        }
    }, [])
    const {t} = useTranslation()
    return (
        <Box width={"100%"}>
            <HeadTitle title={"cart"} />

            <Box mb={4}>
                <BreadCrumb page={[{ name: t("cart"), link: "#" }]} />
            </Box>

            <Box my={4}>
                <ViewCart />
            </Box>
        </Box>
    )
}

export default validateView(index)