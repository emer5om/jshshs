import { store } from "@/store/store";
import { setBranchId } from "@/store/reducers/branchSlice";
import { onBranchIdChange, onLoggedIn } from "@/events/events";
import { getBranchId } from "@/events/getters";
import api from "@/interceptor/api";
import { setHomeBanner } from "@/store/reducers/Home/homeSlice";
import { setAuth } from "@/store/reducers/authenticationSlice";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/helpers/functonHelpers";
import { getAuth } from "firebase/auth";

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
