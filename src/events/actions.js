import {store} from "@/store/store";
import {setBranchId} from "@/store/reducers/branchSlice";
import {onBranchIdChange} from "@/events/events";
export const changeBranchId = async ({branch_id} = {}) => {

    store.dispatch(setBranchId(branch_id))
    onBranchIdChange(branch_id)
}