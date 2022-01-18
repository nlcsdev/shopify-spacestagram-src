import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PENDINGONHOME } from "../app/actions";
import HomeImagePresenter from "./HomeImagePresenter";
import { WebLikeBtn, WebDislikeBtn } from "./WebActionBtns";

const HomePage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: PENDINGONHOME });

        return () => { console.log("Home Page Unmounted.") }
    });

    return (
        <div className="home-page">
            <WebLikeBtn />

            <HomeImagePresenter />

            <WebDislikeBtn />
        </div>
    );
}

export default HomePage;