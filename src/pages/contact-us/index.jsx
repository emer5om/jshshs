import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getSettings } from "@/store/reducers/settingsSlice";
import { Box, Container } from "@mui/joy";
import { HeadTitle } from "@/component/HeadTitle";
import BreadCrumb from "@/component/BreadCrumb/BreadCrumb";

const About = () => {
    const settings = useSelector((state) => state.settings.value);
    const [setting, setSettings] = React.useState(false);
    useEffect(() => {

        if (settings && settings?.web_settings.length != 0) setSettings(settings.contact_us[0])
        console.log(setting)

    }, [settings]);

    return (<>
        <Box>
            <HeadTitle title={"Contact Us"} />

            <Box>
                <BreadCrumb page={[{ name: "contact-us", link: "#" }]} />
            </Box>


            <Box>
                <div dangerouslySetInnerHTML={{ __html: setting ? setting : "" }} />
            </Box>
        </Box>
    </>)
}

export default About