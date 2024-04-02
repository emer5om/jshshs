import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getSettings } from "@/store/reducers/settingsSlice";
import { Box, Container } from "@mui/joy";
import { HeadTitle } from "@/component/HeadTitle";
import BreadCrumb from "@/component/BreadCrumb/BreadCrumb";
import { useTranslation } from "react-i18next";


const About = () => {
    const settings = useSelector((state) => state.settings.value);
    const [setting, setSettings] = React.useState(false);
    useEffect(() => {

        if (settings && settings?.web_settings.length != 0) setSettings(settings.about_us[0])
        console.log(setting)

    }, [settings]);

    const { t } = useTranslation()

    return (<>
        <Box>
            <HeadTitle title={"About US"} />

            <Box>
                <BreadCrumb page={[{ name: "about-us", link: "#" }]} />
            </Box>


            <Box>
                <div dangerouslySetInnerHTML={{ __html: setting ? setting : "" }} />
            </Box>
        </Box>
    </>)
}

export default About