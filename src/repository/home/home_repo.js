import api from "@/interceptor/api";
import {store} from "@/store/store";
import {setHomeBanner, setHomeSection} from "@/store/reducers/Home/homeSlice";
import {navigateErrorPage} from "@/helpers/functonHelpers";

export const updateHomeBannerData = async (branch_id) => {
    const form = new FormData()
    form.append("branch_id", branch_id)
    const res = await api.post("/get_slider_images", form);
    if(res.data.error){
        return navigateErrorPage(res.data)
    }
    store.dispatch(setHomeBanner(res.data.data))
}

export const updateHomeSectionData = async (branch_id) => {
    const form = new FormData()
    form.append("branch_id", branch_id)
    const res = await api.post("/get_sections", form);
    if(res.data.error){
        return navigateErrorPage(res.data)
    }
    store.dispatch(setHomeSection(res.data.data))
}







