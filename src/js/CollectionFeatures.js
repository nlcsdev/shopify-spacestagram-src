import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SORTREQUESTEPIC } from "../app/actions";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';


const CollectionFeatures = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const SortStyle = useSelector(state => state.SortStyle);

    const dispatch = useDispatch();

    const sortStyleStr = ["Most Recent", "Least Recent", "Like", "Dislike"];

    const onChangeSortStyle = (i) => {
        dispatch({
            type: SORTREQUESTEPIC,
            data: i
        });
        setAnchorEl(null);
    }

    const openStyleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const closeStyleMenu = (e) => {
        setAnchorEl(null);
    }

    const onToTop = () => {
        window.scrollTo({  
            top: 0,
            left: 0,
            behavior: 'smooth'});
    }

    return (
        <Paper id="collection-features" square>
            <Button sx={{width: "140px", mr:"5px", ml:"1vw"}} onClick={openStyleMenu} variant="contained">
                <Typography variant="button" component="span" >{sortStyleStr[SortStyle]}</Typography>
            </Button>
            <Menu
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }} anchorEl={anchorEl} onClose={closeStyleMenu} open={open}>
                {sortStyleStr.map((x, i) => (
                    <MenuItem key={"styleOption"+i} onClick={() => onChangeSortStyle(i)} >{x}</MenuItem>
                ))}
            </Menu>
            <Button sx={{width: "140px" }} variant="contained" onClick={onToTop}>
                <Typography variant="button" component="span" >Back To Top</Typography>
            </Button>
        </Paper>


    );
}

export default CollectionFeatures;