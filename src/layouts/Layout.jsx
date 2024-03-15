
import React, { useEffect } from 'react'
import {
  Container,
  Box,
} from '@mui/joy';

// import components
import Header from "@/component/Header/Index"
import Footer from "@/component/Footer/Index"
import MobileNavigation from '@/component/Header/MobileNavigation';
import {getSettings} from "@/store/reducers/settingsSlice";
import {useQuery} from "@tanstack/react-query";
import {useSelector} from "react-redux";



const layout = ({ children }) => {

  const SetSystemSettingsApi = async () => {
    console.log("asdasdasdasd")
    await getSettings();
    return true
  }

  const settings = useSelector((state) => state.settings.value);
  const { isLoading, data } = useQuery({
    queryKey: ['systemSettingsData'],
    queryFn: SetSystemSettingsApi,
    staleTime:1
  })


  return (
    <div>
      <Container maxWidth={"xl2"}>
        <Box pt={4}>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {/* Available For Large Screens Only */}
            <Header />
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            {/* Available For Small Screens Only */}
            <MobileNavigation />
          </Box>


          <Box minHeight={"700px"} mt={4} px={{ xs: 1, md: 8 }}>
            {children}
          </Box>
          {/* <Grid minHeight={"700px"} mt={4} px={{ xs: 1, md: 8 }} container spacing={2} alignItems={"center"}>
            <Grid xs={12}>
            </Grid>
          </Grid> */}

        </Box>
        {/* need to put  contents only within container */}
      </Container>
      <Footer />
    </div>
  )
}

export default layout