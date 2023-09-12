import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../App';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Signup() {
    const {user, loader, setLoader, setUser, userRolyType, setUserRoleType} = React.useContext(GeneralContext);
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let businessCheck= document.getElementById("business").checked;
        
        setLoader(true);
        fetch(`https://api.shipap.co.il/clients/signup?token=204f16e2-44e7-11ee-ba96-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                firstName: data.get("firstName"),
                middleName: data.get("middleName"),
                lastName: data.get("lastName"),
                phone: data.get("phone"),
                email: data.get("email"),
                password: data.get("password"),
                imgUrl: "",
                imgAlt: "",
                state: "",
                country: data.get("country"),
                city: data.get("city"),
                street: data.get("street"),
                houseNumber: data.get("houseNumber"),
                zip: data.get("zip"),
                business: businessCheck,
            }),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text().then(x => {
                    throw new Error(x);
                });
            }
        })
        .then(data => {
            setLoader(false);
            navigate("/login");
        })
        .catch(err => {
            alert(err.message);
        });
        };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                autoComplete="middle-name"
                                name="middleName"
                                fullWidth
                                id="middleName"
                                label="Middle Name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                autoComplete="phone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="country"
                                fullWidth
                                id="country"
                                label="Country"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="city"
                                fullWidth
                                id="city"
                                label="City"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="street"
                                fullWidth
                                id="street"
                                label="Street"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="houseNumber"
                                fullWidth
                                id="houseNumber"
                                label="House Number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="zip"
                                fullWidth
                                id="zip"
                                label="Zip"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox id='business' value="allowExtraEmails" color="primary" />}
                                label="Are You a Business Account?"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                            Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}