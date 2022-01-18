import React, { useContext, useState } from 'react';

import logo from "../assets/logo.png";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Link } from 'react-router-dom';

import { ThemeContextFunc, lightTheme } from './App';

import { styled } from '@mui/material/styles';

import { ThemeProvider } from '@mui/material/styles';

const NavButton = styled(Button)({
    height: "100%",
    boxShadow: "none",
    padding: "6px 1vw"
});

const ThemeMenu = styled((props) => (
    <Menu
        marginThreshold={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props} />
))({
    '& .MuiPaper-root': {
        minWidth: 130,
        maxWidth: "none"
    }
});

const NavBar = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentTheme, setCurrentTheme] = useState((!!localStorage.getItem('myTheme')) ? localStorage.getItem('myTheme') : "Light");

    let themeContextFunc = useContext(ThemeContextFunc);

    let themes = ["Light", "Dark", "Earth", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

    const OnThemeChange = (theme) => {
        themeContextFunc.ChangeTheme(theme);
        localStorage.setItem('myTheme', theme);
        setCurrentTheme(theme);
        setAnchorEl(null);
    }

    const openStyleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const closeStyleMenu = (e) => {
        setAnchorEl(null);
    }

    return (
        <div className="navbar">
            <AppBar sx={{ height: '10vh' }}>
                <Toolbar sx={{
                    px: '10px',
                    pb: '1px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100%'
                }} disableGutters>
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <NavButton component={Link} to={process.env.PUBLIC_URL + "/"}>
                            <img id="logo" src={logo} alt='Spacestagram_logo' />
                        </NavButton>

                        <NavButton variant='contained' color='primary' component={Link} to={process.env.PUBLIC_URL + "/"}>
                            <Typography variant='button'>Home</Typography>
                        </NavButton>
                        <NavButton variant='contained' color='primary' component={Link} to={process.env.PUBLIC_URL + "/Collections"}>
                            <Typography variant='button'>Collection</Typography>
                        </NavButton>
                    </Box>

                    <ThemeProvider theme={lightTheme}>
                        <Button sx={{ width: "130px", justifyContent: "space-between", padding: "3px 16px", border: "2px white solid" }} variant='contained' color='primary' onClick={openStyleMenu}>
                            <Typography variant='button'>{currentTheme}</Typography>
                            <img className='circular-img-icons' src={require('../assets/' + currentTheme + '_theme.jpg')} />
                        </Button>
                        <ThemeMenu
                            anchorEl={anchorEl}
                            onClose={closeStyleMenu}
                            open={Boolean(anchorEl)}>
                            {themes.map((x, i) => (
                                <MenuItem sx={{ justifyContent: "space-between" }} key={"themes" + i} onClick={() => OnThemeChange(x)} >
                                    <Typography variant='button'>{x}</Typography>
                                    <img className='circular-img-icons' src={require('../assets/' + x + '_theme.jpg')} />
                                </MenuItem>
                            ))}
                        </ThemeMenu>
                    </ThemeProvider>

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;
