// Loader.js
import React from 'react';
import {useSelector} from "react-redux";

const Loader = () => {
    const isLoading = useSelector((state) => state.pageLoading.isLoading);
    return isLoading ? (

        <div className={"loader"}>
            <div className={"loaderInner"}></div>
        </div>
            ): <></>
};

export default Loader;