"use client";
import React, {useEffect, useState} from 'react'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import Products from '@/views/Products';
import { Box } from '@mui/joy';
import {HeadTitle} from "@/component/HeadTitle";
import {useRouter} from "next/router";
import { useSearchParams } from 'next/navigation'
import {useTranslation} from "react-i18next";

const index = () => {
    const [slug, setSlug] = useState(null);
    const searchParams = useSearchParams()
    const {t} = useTranslation()

    const search = searchParams.get('title')

    const router = useRouter()
    useEffect(() => {
        console.log(search)
        if(router.query.slug){
            setSlug(router.query.slug)
        }
    }, [router.query.slug])

    return (

        <Box>
            {slug && (
                <>
                    <HeadTitle title={"products"} />

                    <Box>
                        <BreadCrumb page={[{ name: t("our-products"), link: "/products" }, { name: search, link: "#" }]} />
                    </Box>


                    <Box>
                        <Products categoryId={slug} />
                    </Box>
                </>
            )}

        </Box>
    )
}

export default index