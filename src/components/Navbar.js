import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../App';
import { FormControlLabel, FormGroup } from '@mui/material';
import { MaterialUISwitch } from './NavbarDarkMode';
import HotelIcon from '@mui/icons-material/Hotel';
import {Search, SearchIconWrapper, StyledInputBase} from "./NavBarConstants";
import SearchIcon from '@mui/icons-material/Search';
export const RoleTypes = {
    none: 0,
    user: 1,
    business: 2,
    admin: 3,
};
export const checkPermissions = (permissions, userRoleType) => {
    return permissions.includes(userRoleType);
}
const pages = [
    {route: '/', title: 'Home'},
    {route: '/about', title: 'About'},
    {route: '/login', title: 'Login', permissions: [RoleTypes.none]},
    {route: '/signup', title: 'Signup', permissions: [RoleTypes.none]},
    {route: '/favorite', title: 'Fav cards', permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin]},
    {route: '/my-cards', title: 'My cards', permissions: [RoleTypes.business, RoleTypes.admin]},
    {route: '/admin', title: "User's management", permissions: [RoleTypes.admin]},
];

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [switchColor, setSwitchColor] = useState("black");
    const [anchorElUser, setAnchorElUser] = useState(null);
    const {user, setLoader, setUser, userRolyType, setUserRoleType, mode, setMode} = useContext(GeneralContext);
    const navigate = useNavigate();
    const handleMode = () => {
        if(mode === "light"){
            setMode("dark")
            setSwitchColor("white")
        } else if(mode === "dark"){
            setMode("light")
            setSwitchColor("black")
        }
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const logout = () => {
        setLoader(true);
        fetch(`https://api.shipap.co.il/clients/logout`, {
            credentials: 'include',
        })
        .then(() => {
            setUser();
            setUserRoleType(RoleTypes.none);
            setLoader(false);
            navigate("/");
        });
        handleCloseUserMenu();
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <HotelIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    > Hotel Sharing </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            >
                            {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRolyType)).map(p => (
                                <Link key={p.route} to={p.route} style={{ textDecoration: 'none', color: 'black' }}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{p.title}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <HotelIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.filter(p => !p.permissions || checkPermissions(p.permissions, userRolyType)).map(p => (
                            <Link key={p.route} to={p.route} style={{ textDecoration: 'none', color: 'white' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                    {p.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <FormGroup>
                        <FormControlLabel
                            control={<MaterialUISwitch sx={{ m: 1 }} onChange={handleMode} />}
                        />
                    </FormGroup>
                    {user ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user.fullName} src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }} keepMounted transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}
                            >
                                <Link to="/account" style={{ textDecoration: 'none', color: switchColor }}>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{user.fullName}</Typography>
                                    </MenuItem>
                                </Link> 
                                <MenuItem onClick={logout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    : ""
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
} 