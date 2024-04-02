"use client"
import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
import AllProducts from "@/component/Products/AllProducts";
import {HeadTitle} from "@/component/HeadTitle";

const BlogPostPage = () => {


    const [slug, setSlug] = useState(null);


    const router = useRouter()
    useEffect(() => {
        if(router.query.slug){
            setSlug(router.query.slug)
        }
    }, [router.query.slug])






    return slug == null ? <></> : (
        <>
            <HeadTitle title={"products"} />

            <AllProducts queryConstants={{category_slug: slug}} />
        </>

    )
}

export default BlogPostPage