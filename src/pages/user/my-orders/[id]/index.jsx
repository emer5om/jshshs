"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/joy";

import Address from "@/views/Address";
import MyOrders from "@/views/MyOrders";
// import UserLayout from '../../UserLayout';
// import OrderDetails from '@/views/OrderDetails';
import { isLogged } from "@/events/getters";
import { useRouter } from "next/router";
import { HeadTitle } from "@/component/HeadTitle";

import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const BreadCrumb = dynamic(() => import("@/component/BreadCrumb/BreadCrumb"), {
  ssr: false,
});

const OrderDetails = dynamic(() => import("@/views/OrderDetails"), {
  ssr: false,
});
const UserLayout = dynamic(() => import("../../UserLayout"), {
  ssr: false,
});

export default function () {
  const [id, setID] = useState(0);
  const [orderDetails, setOrderDetails] = useState(0);

  const router = useRouter();
  useEffect(() => {
    if (!isLogged()) {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    if (router.query.id && router.query.id != 0) {
      setID(router.query.id);
    }
  }, [router.query.id]);
  const { t } = useTranslation();

  return (
    <Box width={"100%"}>
      <HeadTitle title={"orders"} />

      <Box mb={4}>
        <BreadCrumb
          page={[
            { name: t("my-profile"), link: "/user/profile" },
            { name: t("my-orders"), link: "/user/my-orders" },
            { name: t("order-details"), link: "#" },
          ]}
        />
      </Box>

      <UserLayout>
        <Box maxWidth={"100%"}>
          {id != 0 && <OrderDetails queryConstants={{ id: id }} />}
        </Box>
      </UserLayout>
    </Box>
  );
}
