import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/joy';
import UserOrderCard from '@/component/Cards/UserOrderCard';
import api from "@/interceptor/api";
import { useTranslation } from "react-i18next";
import OrderCardSkeleton from '@/component/Skeleton/OrderCardSkeleton';

const MyOrders = () => {
  const initialQuery = { offset: 0, limit: 10 };
  const [query, setQuery] = useState(initialQuery);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    request();
  }, [query]);
  const [orders, setOrders] = useState([]);

  const request = () => {
    const formData = new FormData();
    Object.keys(query).map((item) => {
      formData.append(item, query[item]);
    });
    setLoading(true);
    api
      .post("/get_orders", formData)
      .then((res) => {
        setLoading(false);
        if (orders.length <= query.offset * query.limit) {
          setOrders([...orders, ...res.data.data]);
          setTotal(res.data.total);
        }

        // Check if there are no orders after fetching data
        if (res.data.data.length === 0 && orders.length === 0) {
          // Render "No Orders" image
          return (
            <Grid item xs={12} textAlign="center">
              <img src={"/my-orders.webp"} alt="No Orders" style={{ maxHeight: "600px" }} />
            </Grid>
          );
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onCancel = () => {
    setOrders([]);
    setQuery(initialQuery);
  };

  return (
    <Box maxWidth={"100%"} my={4}>
      <Grid container width={"100%"} spacing={2}>
        {/* Rendering loading state */}
        {loading && <OrderCardSkeleton />}

        {/* Mapping through orders */}
        {orders.map((item, index) => (
          <Grid key={index} xs={12} md={6} maxWidth={"100%"}>
            <UserOrderCard
              status={item.status[item.status.length - 1][0]}
              image={item?.order_items?.length && item.order_items[0].image_sm}
              id={item.id}
              name={item.name}
              amount={item.total_payable}
              type={item.type}
              qty={item?.order_items?.length && item.order_items[0].quantity}
              date={item.dateTime}
              onCancel={onCancel}
              isCancellable={item.order_items[0]?.is_cancelable}
            />
          </Grid>
        ))}

        {/* Load more button */}
        {orders.length > 0 && (
          <Grid item xs={12} textAlign="center">
            <Button
              onClick={() => {
                setQuery({ ...query, offset: query.offset + query.limit });
              }}
              disabled={loading}
            >
              {loading ? `${t("please-wait")}` : `${t("load-more")}`}
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MyOrders;