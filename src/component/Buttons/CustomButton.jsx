"use client";
import { Button } from '@mui/joy';
import React from 'react'

const CustomButton = ({
    variant = "outlined",
    text,
    size = "small",
    color = "primary",
    decorationDirection,
    decoration,
    loadingStatus,
    loadingStatusPosition,
    onClick,
    customStyle
}) => {
    return (
        <div>
            <Button
                variant={variant}
                size={size}
                color={color}
                onClick={onClick}
                sx={customStyle}
            >
                {text}
            </Button>
        </div>
    )
}

export default CustomButton