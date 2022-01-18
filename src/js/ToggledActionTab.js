import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TOGGLESTATUSEPIC } from "../app/actions";

import likeIcon from "../assets/like.svg";
import dislikeIcon from "../assets/dislike.svg";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';

const FavBtnButton = styled(Button)({
    width: '100%',
    height: '100%'
});

const ToggledActionTab = (props) => {

    const [status,setStatus] = useState(props.status);
    const dispatch = useDispatch();

    let favBtnSrc = status? likeIcon:dislikeIcon;

    const OnToggleStatus = () => {
        setStatus(!status);
        dispatch({type: TOGGLESTATUSEPIC, data: {date: props.date, status: !status}});
    }

    return (
        <Paper sx={{ width: '100%', height: "10vh" }} variant="outlined" className="mobile-action-tab" >
            <Grid flexWrap='nowrap' sx={{ height: "100%" }} alignItems="stretch" alignContent="center" container>
                <Grid sx={{width: "100%", height: "100%"}} item>
                    <FavBtnButton onClick={OnToggleStatus}>
                        <img className="favBtns" src={favBtnSrc} alt="Toggle Like Button"/>
                    </FavBtnButton>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ToggledActionTab;