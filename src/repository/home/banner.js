import api from "@/interceptor/api";
import {getBranchId} from "@/events/getters";
import {store} from "@/store/store";
import {setHomeBanner} from "@/store/reducers/Home/homeSlice";

export const updateHomeBannerData = async ({branch_id} = {}) => {
    const prev_branch_id = getBranchId()

    if(prev_branch_id != null && (branch_id != prev_branch_id)){
        const res = await api.post("/get_slider_images", {branch_id});
        store.dispatch(setHomeBanner(res.data))
    }
}

