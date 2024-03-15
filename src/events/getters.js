import {store} from "@/store/store";

export const getBranchId = () => {
    const state = store.getState()
    return state.branch.id
}