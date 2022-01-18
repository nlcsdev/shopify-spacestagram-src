import React from "react";
import { LIKEDONHOME, DISLIKEONHOME } from "../app/actions";
import { useDispatch } from "react-redux";

import likeIcon from "../assets/like.svg";
import dislikeIcon from "../assets/dislike.svg";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';

const FavBtnGridContainers = styled(Grid)({
    width: '50%',
    height: '100%'
});

const FavBtnButton = styled(Button)({
    width: '100%',
    height: '100%'
});

const MobileActionTab = () => {

    const dispatch = useDispatch();

    const OnLike = () => {
        dispatch({type: LIKEDONHOME});
    }

    const OnDislike = () => {
        dispatch({type: DISLIKEONHOME});
    }

    return (
        <Paper sx={{ display: {sm: "none"}, position:"absolute", bottom: '0%', width: 'calc( 47vh - 2px )', minWidth: "358px", height: "20vh" }} variant="outlined" className="mobile-action-tab" >
            <Grid flexWrap='nowrap' sx={{ height: "100%" }} alignItems="stretch" alignContent="center" justifyContent="space-evenly" container>
                <FavBtnGridContainers item>
                    <FavBtnButton onClick={OnLike}>
                        <img className="favBtns" src={likeIcon} alt="Mobile Like Button"/>
                    </FavBtnButton>
                </FavBtnGridContainers>
                <Divider orientation="vertical" flexItem />
                <FavBtnGridContainers item>
                    <FavBtnButton onClick={OnDislike}>
                        <img className="favBtns" src={dislikeIcon} alt="Mobile Dislike Button"/>
                    </FavBtnButton>
                </FavBtnGridContainers>
            </Grid>
        </Paper>
    );
}

export default MobileActionTab;