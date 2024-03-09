"use client";

import { Box, FormLabel, Input } from '@mui/joy';
import React from 'react'

const CustomInput = ({ label, size, placeholder, variant, type, value }) => {
    return (
        <Box>
            <FormLabel sx={{ mb: 1, color: "text.tertiary" }}>Date of Birth</FormLabel>
            <Input size='lg' placeholder="Type in here…" variant="outlined"
                type="date"
            />
        </Box>
    )
}

export default CustomInput