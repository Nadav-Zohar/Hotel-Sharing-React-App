import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { RoleTypes, checkPermissions } from './Navbar';
import { GeneralContext } from '../App';

const icons = [
    {route: '/about', 
    title: 'About',
    icon: <InfoOutlinedIcon />},
    
    {route: '/favorite', 
    title: 'Favorites',
    icon: <FavoriteIcon />,
    permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin]},
    
    {route: '/my-cards', 
    title: 'My Cards',
    icon: <CreditCardOutlinedIcon />,
    permissions: [RoleTypes.business, RoleTypes.admin]},
    
    {route: '/admin', 
    title: "User's management",
    icon: <ManageAccountsOutlinedIcon />,
    permissions: [RoleTypes.admin]},
];

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const { userRolyType } = React.useContext(GeneralContext);

    const ref = React.useRef(null);

    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                >
                    {icons.filter(p => !p.permissions || checkPermissions(p.permissions, userRolyType)).map(p => (
                        <BottomNavigationAction
                        label={p.title}
                        key={p.route}
                        icon={p.icon}
                        sx={{ textDecoration: 'none', color: 'inherit' }}
                        component={Link}
                        to={p.route}
                        />
                    ))}
                </BottomNavigation>
            </Paper>
        </Box>
    );
}