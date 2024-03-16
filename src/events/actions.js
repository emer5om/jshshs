import {store} from "@/store/store";
import {setBranchId} from "@/store/reducers/branchSlice";
import {onBranchIdChange} from "@/events/events";
import {getBranchId} from "@/events/getters";
import api from "@/interceptor/api";
import {setHomeBanner} from "@/store/reducers/Home/homeSlice";

export const changeBranchId = async ({branch_id} = {}) => {
    const prev_branch_id = getBranchId()
    if ((branch_id !== prev_branch_id)) {
        //put all the branch id change event here

        onBranchIdChange({branch_id})
        store.dispatch(setBranchId(branch_id))
    }

}