import React, { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { DOTRANSITION, REQUESTHOMEIMGEPIC, PENDINGONHOME, TRANSITIONCOMPLETE } from "../app/actions";

import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';

import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import Skeleton from '@mui/material/Skeleton';
import Modal from '@mui/material/Modal';

import MobileActionTab from "./MobileActionTab";

import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const HomeSkeletonContainer = (props) => {

    return (
        <div className="home-outter-image-container">

            <Card variant="outlined" sx={{ pb: { xs: '20vh', sm: '0vh' }, width: '47vh', maxWidth: "600px", minWidth: '360px', height: '85vh', boxSizing: "border-box" }} className="home-inner-image-container">
                <Skeleton variant="rectangular" sx={{ height: "50vh", mb: "10px" }} />

                <Divider />

                <CardActions sx={{ display: "block" }}>
                    <Skeleton variant="text" sx={{ height: "5vh", my: "5px" }} />
                </CardActions>

                <Divider />

                <CardContent>
                    <Typography align="left" variant="h5" component="h5" >{props.title}</Typography>

                    <Skeleton variant="text" height="5vh" />

                    <Skeleton variant="rectangular" height="30vh" />
                </CardContent>
            </Card>

            <MobileActionTab />
        </div>
    );
}

const HomeImageContainer = (props) => {

    const [copying, setCopying] = useState(false);
    const [copyStatus, setCopyStatus] = useState("Copy Image Link");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const SeenAll = useSelector((state) => state.SeenAll);

    let loading = (!!props.date) ? false : true;

    const onClickCopy = () => {
        setCopying(true);
        setCopyStatus("Copying...");
        navigator.clipboard.writeText(props.imgSrc).then(
            () => {
                setCopyStatus("Copied!");
            },
            () => {
                setCopyStatus("Error Copying!");
            });
        setCopying(false);
    }

    const copyIcon = (<Icon>content_copy</Icon>);

    return (loading) ? ((!SeenAll) ? (<HomeSkeletonContainer title="Searching through the stars..." />) : (<HomeSkeletonContainer title="The night is dark, no more to see. Come back later." />)) : (

        <div>
            <Modal open={open} onClose={handleClose}>
                    <img className="modal-img" src={props.imgSrc} />
            </Modal>
            <div className="home-outter-image-container">
                <Card variant="outlined" sx={{ pb: { xs: '20vh', sm: '0vh' }, width: '47vh', maxWidth: "600px", minWidth: '360px', height: '85vh', boxSizing: "border-box" }} className="home-inner-image-container">
                    <CardActionArea onClick={handleOpen}>
                        <CardMedia
                            component="img"
                            sx={{ height: "50vh", mb: "10px" }}
                            image={props.imgSrc}
                            alt="Sample"
                        />
                    </CardActionArea>


                    <Divider />

                    <CardActions sx={{ display: "block" }}>
                        <LoadingButton sx={{ width: "100%", justifyContent: "flex-start", color: "inherit" }} onClick={onClickCopy} loading={copying} loadingPosition="start" startIcon={copyIcon}>
                            <Typography align="left" variant="button" component="p" >{copyStatus}</Typography>
                        </LoadingButton>
                    </CardActions>

                    <Divider />

                    <CardContent>
                        <Typography align="left" variant="h5" component="h5" >{props.title}</Typography>
                        <Typography align="left" variant="h6" component="h6" >{props.date}</Typography>
                        <Typography align="left" variant="body1" component="p" >{props.desc}</Typography>
                    </CardContent>
                </Card>

                <MobileActionTab />
            </div>
        </div>
    );

}

HomeImageContainer.propTypes = {
    loading: PropTypes.bool
}

const HomeImagePresenter = () => {
    let myID = useRef(uuidv4());
    const dispatch = useDispatch();

    const UserAction = useSelector(state => state.HomeUserAction);
    const HomeImgTransition = useSelector(state => state.HomeImgTransition);
    const HomeImgObj = useSelector((state) => state.HomeImgObj, shallowEqual);

    // if (Object.keys(HomeImgObj).length == 0) {
    //     dispatch({ type: REQUESTHOMEIMGEPIC });
    // }

    const transitionClass = () => {
        if (UserAction == "like") {
            return "homeImgContainerLike";
        } else if (UserAction == "dislike") {
            return "homeImgContainerDislike";
        } else {
            return "homeImgContainer";
        }
    }

    // console.log("Presenter %s transtion: %s date: %s status: %s", myID.current, HomeImgTransition, HomeImgObj.date, UserAction);

    useEffect(() => {

        // if (UserAction == "like") {
        //     transitionClass = "homeImgContainerLike";
        //     //setTransitionClass("homeImgContainerLike");
        // } else if (UserAction == "dislike") {
        //     transitionClass = "homeImgContainerDislike";
        //     //setTransitionClass("homeImgContainerDislike");
        // }

        if ((UserAction != "pending") && !HomeImgTransition) {
            dispatch({
                type: DOTRANSITION
            });
        }

        if (HomeImgTransition) {
            dispatch({ type: TRANSITIONCOMPLETE });
            dispatch({ type: PENDINGONHOME });
        }

        // console.log("Presenter %s mounted/udpated, Action: %s, Img: %s, class: %s", myID.current, UserAction, HomeImgObj.date, transitionClass());

    }, [UserAction, HomeImgTransition]);


    // const onEntered = (k, c) => {
    //     //console.log("transition entered: %s %s", k, c);
    // }

    // const onExited = (k, c) => {
    //     //console.log("transition exited: %s %s", k, c);
    // }

    return (
        <TransitionGroup appear>
            <CSSTransition
                key={"key-" + HomeImgObj.date}
                appear
                timeout={1000}
                classNames={transitionClass()}
            // onEntered={() => onEntered(HomeImgObj.date, transitionClass())}
            // onExited={() => onExited(HomeImgObj.date, transitionClass())}
            >
                <HomeImageContainer imgSrc={HomeImgObj.imgSrc} date={HomeImgObj.date} title={HomeImgObj.title} desc={HomeImgObj.desc} />
            </CSSTransition>
        </TransitionGroup>

    );

}

export default HomeImagePresenter;