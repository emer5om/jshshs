'use client';
import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/joy';
import { RiArrowUpLine } from '@remixicon/react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleScroll = () => toggleVisibility();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 15,
                right: 15,
                borderRadius: '50%',
            }}
        >
            {isVisible && (
                <IconButton
                    variant="solid"
                    color="primary"
                    aria-label="Back to top"
                    sx={{ borderRadius: '50%' }}
                    size='lg'
                    onClick={scrollToTop}
                >
                    <RiArrowUpLine />
                </IconButton>
            )}
        </Box>
    );
};

export default BackToTop;