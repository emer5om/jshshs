import { store } from "@/store/store";
import { setBranchId } from "@/store/reducers/branchSlice";
import { onBranchIdChange, onLoggedIn } from "@/events/events";
import { getBranchId, getUserData } from "@/events/getters";
import api from "@/interceptor/api";
import {
  setAuth,
  setLogout,
  updateUserInfo,
} from "@/store/reducers/authenticationSlice";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/helpers/functonHelpers";
import { getAuth } from "firebase/auth";
import { setCart, setCartInitial } from "@/store/reducers/cartSlice";
import { setUserAddresses } from "@/store/reducers/userAddressesSlice";
import { setUserSettings } from "@/store/reducers/userSettingsSlice";
import { setPromoCode } from "@/store/reducers/promoCodeSlice";
import toast from "react-hot-toast";
import {
  removeFromCart,
  getUserAddress,
  get_settings,
} from "@/interceptor/routes";
import Router from "next/router";

export const changeBranchId = async ({ branch_id, force = false } = {}) => {
  const prev_branch_id = getBranchId();
  if (branch_id !== prev_branch_id || force) {
    onBranchIdChange({ branch_id: force ? prev_branch_id : branch_id });
    store.dispatch(setBranchId(force ? prev_branch_id : branch_id));
  }
};

export const login = async ({ phoneNumber } = {}) => {
  const formData = new FormData();
  formData.append("mobile", phoneNumber);
  const res = await api.post("/login", formData);
  if (res.error) return res;
  else {
    store.dispatch(setAuth(res.data));
    onLoggedIn();
    return { error: false };
  }
};

export const register = async ({ name, email, mobile, country_code } = {}) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("country_code", country_code);
  formData.append("mobile", mobile);
  const res = await api.post("/register_user", formData);
  if (res.error) return res;
  else {
    store.dispatch(setAuth(res.data));
    onLoggedIn();
  }
};

export const logout = async () => {
  try {
    const app = await initializeApp(firebaseConfig);
    const auth = await getAuth(app);
    await auth.signOut();
  } catch (err) {}
  // await Router.push("/home");
  await store.dispatch(setCartInitial(false));
  store.dispatch(setLogout(false));
};

export const add_to_cart = async ({
  product_variant_id,
  qty,
  addons = [],
} = {}) => {
  // setPageLoader(true)
  let add_on_id = "";
  let add_on_qty = "";
  addons.map((val) => {
    if (add_on_id != "") {
      add_on_id += ",";
      add_on_qty += ",";
    }
    add_on_id += val.id;
    add_on_qty += qty;
  });
  const data = {
    product_variant_id,
    qty: parseInt(qty),
    add_on_id,
    add_on_qty,
    branch_id: getBranchId(),
  };
  const formData = new FormData();
  Object.keys(data).map((key) => {
    formData.append(key, data[key]);
  });
  try {
    const response = await api.post("/manage_cart", formData);

    await updateUserCart();
    if (response.data.error) {
      toast.error(response.data.message);
      return false;
    }
    toast.success(response.data.message);
    return true;
  } catch (e) {
    toast.error("Something Went wrong...");
    return false;
  }
  // setPageLoader(true)
};

export const updateUserCart = async () => {
  const formData = new FormData();
  formData.append("branch_id", getBranchId());
  try {
    const res = await api.post("/get_user_cart", formData);
    store.dispatch(setCart(res.data));
    store.dispatch(setPromoCode([]));
  } catch (error) {
    console.error("error while updating cart:", error);
  }
};

export const updateUserAddresses = async () => {
  try {
    const userData = getUserData();
    const user_id = userData.id;
    const getUserAddresses = await getUserAddress({ user_id });
    if (!getUserAddresses.error) {
      store.dispatch(setUserAddresses(getUserAddresses.data));
    }
  } catch (error) {
    console.error("failed to load user's addresses", error);
  }
};
export const updateUserSettings = async () => {
  try {
    const userData = getUserData();
    const user_id = userData.id;
    const settings = await get_settings({ user_id });
    if (!settings.error) {
      store.dispatch(setUserSettings(settings.data));
    }
  } catch (error) {
    console.error("failed to load user's addresses", error);
  }
};

export const updateUserData = async (data) => {
  const formData = new FormData();
  formData.append("username", data.first_name);
  formData.append("image", data.image);

 

  try {
    const res = await api.post("/update_user", formData);
    store.dispatch(updateUserInfo(res.data.data));
    return res;
  } catch (error) {
    console.error("error while updating cart:", error);
  }
};

export const setProductRating = async (data) => {
  const formData = new FormData();
  // formData.append("user_id", data.user_id);
  formData.append("product_id", data.product_id);
  formData.append("rating", data.rating);
  formData.append("comment", data.message);


  try {
    const res = await api.post("/set_product_rating", formData);
    return res;
  } catch (error) {
    console.error("error while setting product rating:", error);
    throw error; // Propagate the error so it can be caught in the handleSubmit function
  }
};

export const removeItemFromCart = async (
  branch_id,
  product_variant_id,
  cart_id
) => {
  try {
    const removeItem = await removeFromCart({
      branch_id,
      product_variant_id,
      cart_id,
    });
    if (!removeItem.error) {
      await updateUserCart();
    }
  } catch (error) {
    console.log("error while removing item from cart:", error);
  }
};

export const deleteItemFromCart = (id) => {
  const state = store.getState();
  const currentCart = state.cart;
};

export const setPageLoader = (state) => {
  store.dispatch(setPageLoader(state));
};

export const payRazorpay = async (order_id, amount) => {
  const settings = store.getState().settings.value;
  // const formData = new FormData()
  // const order = generateOrderId();
  const userdata = getUserData();

  // formData.append("order_id", order)
  // const data = await api.post("/razorpay_create_order", formData)

  const razorpayOptions = {
    key: settings.paymentMethod.payment_method.razorpay_key_id, // Replace with your Razorpay Key
    amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 100 refers to 100 paise or ₹1.
    currency: "INR",
    name: settings.web_settings[0].site_title,
    receipt: order_id,
    handler: (res) => {
      console.log(res);
      // Handle successful payment here
    },
    notes: {
      order_id: order_id,
      user_id: userdata.id,
    },
    theme: {
      color: "#F37254", // Change the theme color
    },
  };

  const paymentObject = new window.Razorpay(razorpayOptions);
  paymentObject.open();
};
