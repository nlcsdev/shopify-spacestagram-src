import React from "react";
import { useState } from "react";

import likeIcon from "../assets/like.svg";
import dislikeIcon from "../assets/dislike.svg";

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';

import { LIKEDONHOME, DISLIKEONHOME, UPDATESTATUSEPIC } from "../app/actions";
import { useDispatch } from "react-redux";


const WebActionButton = styled(Button)({
    width: '100%',
    height: '100%',
    borderRadius: '100%'
});

const WebActionButtonPaperContainer = styled(Paper)(({ theme }) => ({
    display: "none",
    [theme.breakpoints.up('sm')]: {
        display: "inline"
    },
    width: '15vw',
    height: "15vw",
    borderRadius: "100%",
    position: "relative",
    zIndex: 99
}));

export const WebLikeBtn = () => {

    const dispatch = useDispatch();

    const OnLike = () => {
        dispatch({
            type: LIKEDONHOME
        });
        dispatch({
            type: UPDATESTATUSEPIC,
            data: true
        });

    }

    return (
        <WebActionButtonPaperContainer elevation={24} id="web-like-btn" >
            <WebActionButton onClick={OnLike}>
                <img className="favBtns" src={likeIcon} alt="Like Button"/>
            </WebActionButton>
        </WebActionButtonPaperContainer>
    );
}

export const WebDislikeBtn = () => {

    const dispatch = useDispatch();

    const OnDislike = () => {
        dispatch({
            type: DISLIKEONHOME
        });
        dispatch({
            type: UPDATESTATUSEPIC,
            data: false 
        });
    }

    return (
        <WebActionButtonPaperContainer elevation={24} id="web-dislike-btn">
            <WebActionButton onClick={OnDislike}>
                <img className="favBtns" src={dislikeIcon} alt="Dislike Button" />
            </WebActionButton>
        </WebActionButtonPaperContainer>
    );
}