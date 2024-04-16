import React, {useEffect} from 'react'
import {Box, Container,} from '@mui/joy';
import Header from "@/component/Header/Index"
import MobileNavigation from '@/component/Header/MobileNavigation';
import {getSettings} from "@/store/reducers/settingsSlice";
import {useQuery} from "@tanstack/react-query";
const Footer = dynamic(() => import('@/component/Footer/Index'), {
    ssr: false
});


import {useSelector} from 'react-redux';
import dynamic from "next/dynamic";
import Head from "next/head";


const layout = ({children}) => {

    const SetSystemSettingsApi = async () => {
         await getSettings();
        return true
    }

    const settings = useSelector((state) => state.settings.value);
    const {isLoading, data} = useQuery({
        queryKey: ['systemSettingsData'],
        queryFn: SetSystemSettingsApi,
        staleTime: 0
    })

    const [setting, setSettings] = React.useState(false);
    useEffect(() => {

        if(settings && settings?.web_settings.length != 0 ) setSettings(settings.web_settings[0])


    }, [settings]);



    return (
        <div>
            <Container maxWidth={"xl2"}>
                {setting && (
                    <Head>
                        <link
                            rel="icon"
                            href={ setting.favicon }
                            type="image/*"
                            sizes="any"
                        />
                    </Head>
                )}
                <Box pt={4}>

                    <Box sx={{display: {xs: "none",sm:"none", md: "none",lg:"block"}}}>
                    {/* Available For Large Screens Only */}
                        <Header/>
                    </Box>
                    <Box sx={{display: {xs: "block", md: "block",lg:"none"}}}>
                        {/* Available For Small Screens Only */}
                        <MobileNavigation/>
                    </Box>


                    <Box minHeight={"700px"} mt={{md:4}} px={{xs: 1, md: 8}}>
                        {children}
                    </Box>
                    {/* <Grid minHeight={"700px"} mt={4} px={{ xs: 1, md: 8 }} container spacing={2} alignItems={"center"}>
            <Grid xs={12}>
            </Grid>
          </Grid> */}

                </Box>
                {/* need to put  contents only within container */}
            </Container>
            <Footer/>
        </div>
    )
}

export default layout