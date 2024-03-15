"use client"
import { Box, Grid, IconButton, Input } from '@mui/joy'
import { RiMapPin2Line, RiSearch2Line } from '@remixicon/react'
import React from 'react'

const SearchBar = ({ onClick }) => {
    return (
        <Box my={4} onClick={onClick}>
            <Grid container gap={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
                <Grid xs={1}>
                    <IconButton variant="plain">
                        <RiMapPin2Line />
                    </IconButton>
                </Grid>
                <Grid xs={10}>
                    <Input endDecorator={<RiSearch2Line />} placeholder="Type your cravings, we'll do the chasing!" variant="soft" size='lg' />
                </Grid>
            </Grid>
        </Box>
    )
}

export default SearchBar