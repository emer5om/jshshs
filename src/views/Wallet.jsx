"use client";

import React, { useEffect, useState } from 'react'
import CustomButton from '@/component/Buttons/CustomButton';
import ProductCards from '@/component/Cards/ProductCards';
import WalletRechargeModal from '@/component/Modals/WalletRechargeModal';
import WalletWithdrawModal from '@/component/Modals/WalletWithdrawModal';
import WalletTransactions from '@/component/Transactions/WalletTransactions';
import WalletWithdraw from '@/component/Transactions/WalletWithdraw';
import { getUserData } from '@/events/getters';
import { formatePrice } from '@/helpers/functonHelpers';

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Chip,
  Grid,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
  tabClasses
} from '@mui/joy';

import { useSelector, useDispatch } from "react-redux"
import { get_settings } from '@/interceptor/routes';
import { setUserSettings } from "@/store/reducers/userSettingsSlice"

const Wallet = ({ data }) => {
  const userData = getUserData()
  const user_id = userData.id
  const [index, setIndex] = React.useState(0);

  const dispatch = useDispatch()
  const userSettings = useSelector((state) => state.userSettings)?.value;
  console.log(userSettings)
  const [userBalance, setUserBalance] = useState(userSettings.length > 0 ? userSettings?.user_data[0]?.balance : 0)

  const getUserSettings = async () => {
    const userSettings = await get_settings({ user_id })
    setUserBalance(userSettings.data.user_data[0].balance)
    dispatch(setUserSettings(userSettings.data))
  }

  useEffect(() => {
    if (userSettings.length === 0) {
      getUserSettings()
    } else {
      console.log(userSettings.user_data[0].balance)
      setUserBalance(userSettings.user_data[0].balance)
    }
  }, [])


  return (
    <Grid container gap={2}>
      <Grid xs={12} md={12} >
        <Card sx={{ maxWidth: "100%", height: "200px" }}>
          <CardCover>
            <img
              src="/images/back-grounds/wallet.png"
              srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </CardCover>
          <CardContent>
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} mt={5}>
              <Box textAlign={"center"} >
                <Typography
                  fontSize={"xl"}
                  fontWeight="md"
                  textColor="#fff"
                >
                  Current Balance
                </Typography>
                <Typography
                  level="body-lg"
                  fontWeight="lg"
                  textColor="#fff"
                >
                  {formatePrice(userBalance)}
                </Typography>
              </Box>
            </Box>

          </CardContent>
          <CardActions>
            <Box width={"100%"}>
              <Grid container gap={2} alignItems={"center"} justifyContent={"center"}>
                <Grid xs={12} md={5} >
                  <WalletRechargeModal />
                </Grid>
                <Grid xs={12} md={5} >
                  <WalletWithdrawModal />
                </Grid>
              </Grid>
            </Box>
          </CardActions>
        </Card>
      </Grid>
      <Grid xs={12} md={12} >
        <Box
          sx={{
            flexGrow: 1,
            overflowX: 'hidden',
            width: "100%"
          }}
        >
          <Tabs
            aria-label="Pipeline"
            value={index}
            onChange={(event, value) => setIndex(value)}
          >
            <TabList
              sx={{
                pt: 1,
                justifyContent: 'center',
                [`&& .${tabClasses.root}`]: {
                  flex: 'initial',
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                  [`&.${tabClasses.selected}`]: {
                    color: 'primary.plainColor',
                    '&::after': {
                      height: 2,
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3,
                      bgcolor: 'text.menuText',
                    },
                  },
                },
              }}
            >
              <Tab
                sx={{ width: "50%" }}
                indicatorInset>
                <Typography fontWeight={"lg"} fontSize={"md"}>
                  Wallet Transaction
                </Typography>
              </Tab>
              <Tab
                sx={{ width: "50%" }}
                indicatorInset>
                <Typography fontWeight={"lg"} fontSize={"md"}>
                  Wallet Withdraw
                </Typography>
              </Tab>

            </TabList>
            <Box
              sx={(theme) => ({
                '--bg': theme.vars.palette.background.surface,
                background: 'var(--bg)',
                boxShadow: '0 0 0 100vmax var(--bg)',
                clipPath: 'inset(0 -100vmax)',
              })}
            >
              <TabPanel value={0}>

                <WalletTransactions />

              </TabPanel>
              <TabPanel value={1}>
                <WalletWithdraw />
              </TabPanel>
            </Box>
          </Tabs>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Wallet