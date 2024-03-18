import { store } from "@/store/store";
import { setBranchId } from "@/store/reducers/branchSlice";
import { onBranchIdChange, onLoggedIn } from "@/events/events";
import { getBranchId } from "@/events/getters";
import api from "@/interceptor/api";
import { setAuth } from "@/store/reducers/authenticationSlice";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/helpers/functonHelpers";
import { getAuth } from "firebase/auth";
import {setCart} from "@/store/reducers/cartSlice";
import {toast} from "react-toastify";

export const changeBranchId = async ({ branch_id } = {}) => {
  const prev_branch_id = getBranchId();
  if (branch_id !== prev_branch_id) {
    //put all the branch id change event here

    onBranchIdChange({ branch_id });
    store.dispatch(setBranchId(branch_id));
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
  await store.dispatch(logout(false));
};

export const add_to_cart = async ({product_variant_id, qty, addons=[]} = {}) => {

  // setPageLoader(true)
  let add_on_id = ""
  let add_on_qty = ""
  addons.map(val => {
    if(add_on_id != ""){
      add_on_id += ","
      add_on_qty += ","
    }
    add_on_id += val.id
    add_on_qty += qty

  })
  const data = {
    product_variant_id,
    qty,
    add_on_id,
    add_on_qty,
    branch_id: getBranchId()
  }
  const formData = new FormData()
  Object.keys(data).map(key => {
    formData.append(key, data[key])
  })
  try {

    const response = await api.post("/manage_cart", formData)

    await updateUserCart()
    if(response.data.error){
      toast.error(response.data.message)
      return false
    }
    toast.success(response.data.message)
    return true
  }catch (e){
    toast.error("Something Went wrong...")
    return false
  }
    // setPageLoader(true)

}

export const updateUserCart = async () => {
  const formData = new FormData()
  formData.append("branch_id", getBranchId())
  const res = await api.post("/get_user_cart", formData)
  store.dispatch(setCart(res.data))

}

export const setPageLoader = (state) => {
  store.dispatch(setPageLoader(state))
}
