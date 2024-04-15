import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import { HeadTitle } from "@/component/HeadTitle";
import { useSelector } from 'react-redux';
import { getSettings } from '@/store/reducers/settingsSlice';
import dynamic from 'next/dynamic';
import parse, { domToReact } from 'html-react-parser'; // Import the parse and domToReact functions from html-react-parser

const index = () => {
    const BreadCrumb = dynamic(() => import("@/component/BreadCrumb/BreadCrumb"), {
        ssr: false,
    });

    const settings = useSelector((state) => state.settings.value);
    const [setting, setSettings] = useState(null);

    useEffect(() => {
        if (settings && settings.web_settings.length !== 0) {
            setSettings(settings.privacy_policy[0]);
        }
    }, [settings]);

    // Custom replace function to replace certain HTML elements with Material-UI components
    const replaceElement = (domNode, index) => {
        if (domNode.type === 'tag') {
            switch (domNode.name) {
                case 'h1':
                    return <Typography  sx={{ mt: 2, mb: 2 }}>{domToReact(domNode.children)}</Typography>;
                case 'h2':
                    return <Typography  sx={{ mt: 2, mb: 2 }}>{domToReact(domNode.children)}</Typography>;
                case 'p':
                    return <Typography  sx={{ mt: 1, mb: 1 }}>{domToReact(domNode.children)}</Typography>;
                case 'ul':
                    return <List sx={{ mt: 1, mb: 1 }}>{domToReact(domNode.children)}</List>;
                case 'li':
                    return <ListItem sx={{ pl: 2 }}>{domToReact(domNode.children)}</ListItem>;
                // Add more cases for other HTML elements you want to replace
                default:
                    return domToReact(domNode.children);
            }
        }
    };

    return (
        <Box>
            <HeadTitle title={"privacy-policy"} />
            <Box>
                <BreadCrumb page={[{ name: "privacy-policy", link: "#" }]} />
            </Box>
            <Box>
                {/* Parse the HTML content and replace certain elements with Material-UI components */}
                {setting && parse(setting, { replace: replaceElement })}
            </Box>
        </Box>
    );
};

export default index;
