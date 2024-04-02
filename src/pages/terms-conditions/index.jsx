"use client";
import React, { useEffect } from 'react'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import Products from '@/views/Products';
import { Box } from '@mui/joy';
import { HeadTitle } from "@/component/HeadTitle";
import { useSelector } from 'react-redux';
import { getSettings } from '@/store/reducers/settingsSlice';

const index = () => {


    const settings = useSelector((state) => state.settings.value);
    const [setting, setSettings] = React.useState(false);
    useEffect(() => {

        if (settings && settings?.web_settings.length != 0) setSettings(settings.terms_conditions[0])

    }, [settings]);


    return (
        <Box>
            <HeadTitle title={"terms-conditions"} />

            <Box>
                <BreadCrumb page={[{ name: "terms-conditions", link: "#" }]} />
            </Box>


            <Box>
                {/* <pre> */}
                <div dangerouslySetInnerHTML={{ __html: setting ? setting : "" }} />
                {/* </pre> */}

            </Box>
        </Box>
    )
}

export default index