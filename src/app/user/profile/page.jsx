import BreadCrumb from '@/component/BreadCrumb/BreadCrumb'
import { Box } from '@mui/joy'
import React from 'react'

const page = () => {
    return (
        <Box>
            <Box>
                <BreadCrumb page={["My Profile"]} />
            </Box>


            <Box>
                {/* <NewItems data={newProducts} showMore={false}></NewItems> */}
            </Box>
        </Box>
    )
}

export default page