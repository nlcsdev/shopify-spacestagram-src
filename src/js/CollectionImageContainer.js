import React, { useState } from "react";

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';

import Modal from '@mui/material/Modal';

import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import Icon from '@mui/material/Icon';

import ToggledActionTab from "./ToggledActionTab";


const CollectionImageContainer = (props) => {

    const [copying, setCopying] = useState(false);
    const [copyStatus, setCopyStatus] = useState("Copy Image Link");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <img className="modal-img" src={props.imgSrc} />
            </Modal>

            <Card variant="outlined" sx={{ boxSizing: "border-box" }} className="collection-image-container">
                <CardActionArea onClick={handleOpen}>
                    <img className="collectionImg"
                        src={props.imgSrc}
                        alt={props.title} loading="lazy" />
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

                <ToggledActionTab status={props.status} date={props.date} />

            </Card>
        </div>

    );

}

export default CollectionImageContainer;