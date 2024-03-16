import {store} from "@/store/store";
import {useSelector} from "react-redux";

export const getBranchId = () => {
    const state = store.getState()
    return state.branch.id
}

export const getAuthToken = () => {
    const authStoreData = useSelector((state) => state.authentication);
    if(!authStoreData.isLogged){
        return false
    }
    return authStoreData.accessToken
}

export const getUserData = () => {
    const authStoreData = useSelector((state) => state.authentication);
    if(!authStoreData.isLogged){
        return false
    }
    return authStoreData.userData
}

export const isLogged = () => {
    const authStoreData = useSelector((state) => state.authentication);
    return authStoreData.isLogged
}
