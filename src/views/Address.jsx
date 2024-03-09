"use client"
import AddressCard from '@/component/Cards/AddressCard'
import { Box, Grid } from '@mui/joy'
import React from 'react'

const usersAddress = [
    {
        id: "001",
        type: "home",
        isDefault: false,
        address: "Apt. 738 1852 Margret Ridges, South Zora, HI 26640",
    },
    {
        id: "002",
        type: "home",
        isDefault: true,
        address: "Borgo Bianc 161, San Enrica calabro, AP 82318",
    },
    {
        id: "003",
        type: "home",
        isDefault: false,
        address: "76764 Pfeffer Circle, New Emerson, CO 04655-7512",
    },
    {
        id: "004",
        type: "office",
        isDefault: false,
        address: "30052 Kathi Flats, Faustoport, MN 47165-4803",
    },
    {
        id: "005",
        type: "office",
        isDefault: false,
        address: "Apt. 538 840 Jonathan Mountain, West Katina, GA 45542-5204",
    },
    {
        id: "006",
        type: "other",
        isDefault: false,
        address: "Annelipark 3, Kuijstermansmeer, NM 2314 DU",
    },
]

const Address = () => {
    return (
        <Box my={4}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                {usersAddress.map((item) => {
                    return (<Grid xs={12} md={4} key={item.id}>
                        <AddressCard type={item.type} address={item.address} isDefault={item.isDefault} />
                    </Grid>)
                })}
            </Grid>
        </Box>
    )
}

export default Address