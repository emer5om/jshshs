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
import ReactPDF, { PDFDownloadLink, PDFViewer, StyleSheet } from "@react-pdf/renderer";
import { Page, Document, Image,View,Text } from '@react-pdf/renderer';

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
  
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    header: {
      backgroundColor: '#333',
      padding: 12,
      marginBottom: 20,
    },
    headerText: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    invoiceDetails: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      marginBottom: 20,
    },
    invoiceDetailsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    invoiceDetailsLabel: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    invoiceDetailsValue: {
      fontSize: 12,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 4,
    },
    table: {
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: '#ccc',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    tableHeaderCell: {
      flex: 1,
      padding: 8,
      backgroundColor: '#f5f5f5',
      fontWeight: 'bold',
    },
    tableCell: {
      flex: 1,
      padding: 8,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 12,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      paddingTop: 8,
    },
    totalLabel: {
      fontWeight: 'bold',
      marginRight: 8,
    },
    totalAmount: {
      fontWeight: 'bold',
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    }, image: {
        marginVertical: 15,
        marginHorizontal: 100,
      },
  });

  const Invoice = () => (
    <Document>
      <Page style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.headerText}>INVOICE</Text>
        </View>

            {/* Add your company logo or any other image */}
      <Image
        style={styles.image}
        src="https://single.erestro.me/uploads/media/2024/place_holder_–_21.png"
      />
  
        <View style={styles.invoiceDetails}>
          <View style={styles.invoiceDetailsRow}>
            <Text style={styles.invoiceDetailsLabel}>Invoice Number:</Text>
            <Text style={styles.invoiceDetailsValue}># ₹₹₹₹12345</Text>
          </View>
          <View style={styles.invoiceDetailsRow}>
            <Text style={styles.invoiceDetailsLabel}>₹₹₹₹Date:</Text>
            <Text style={styles.invoiceDetailsValue}>₹₹₹₹June 13, 2024</Text>
          </View>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billed To:</Text>
          <Text style={styles.text}>John Doe</Text>
          <Text style={styles.text}>123 Main Street</Text>
          <Text style={styles.text}>Anytown, USA 12345</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeaderCell}>Description</Text>
              <Text style={styles.tableHeaderCell}>Quantity</Text>
              <Text style={styles.tableHeaderCell}>Rate</Text>
              <Text style={styles.tableHeaderCell}>Amount</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Web Development</Text>
              <Text style={styles.tableCell}>10</Text>
              <Text style={styles.tableCell}>$50</Text>
              <Text style={styles.tableCell}>$500</Text>
            </View>
            {/* Add more rows as needed */}
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>$500</Text>
          </View>
        </View>
  
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );


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
