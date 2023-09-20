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
import Joi from 'joi';
const defaultTheme = createTheme();
export default function Signup() {
    const [formData, setFormData]= React.useState({
        firstName: "", lastName: "", email: "", password: "", middleName: "", phone: "", country: "", city: "", street: "", houseNumber: "", zip: "",
    })
    const [isFormValid,setIsFormValid]= React.useState(false);
    const {setLoader, setOpen, setIsSuccess, setSnackbarMassage} = React.useContext(GeneralContext);
    const navigate = useNavigate();
    const [errors, setErrors]=  React.useState({});
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(30).required(), lastName: Joi.string().min(3).max(30).required(), email: Joi.string().email({ tlds: false }).required(), password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_*]).{8,32}$/).required().messages({
            "string.pattern.base": "Please ensure your password contains 8 characters, including at least one uppercase letter, one lowercase letter, and one of the following symbols: ! @ # $ % ^ & * - _ for enhanced security. Thank you",
            "any.required": "Password is required",}), middleName: Joi.string().min(3).max(30).required(), phone: Joi.string().min(10).max(15).required(), country: Joi.string().min(3).max(50).required(), city: Joi.string().min(3).max(50).required(), street: Joi.string().min(5).max(100).required(), houseNumber: Joi.string().min(1).max(20).required(), zip: Joi.string().min(5).max(10).required(),
        });
        const handleChange = ev => {
            const {name, value}= ev.target;
            const obj ={...formData, [name]: value}
            setFormData(obj);
            const validate= schema.validate(obj, {abortEarly: false})
            const errors= {};
    
            if(validate.error){
                validate.error.details.forEach(e => {
                    const key= e.context.key;
                    const err= e.message;
                    errors[key]= err;
                })
            }
            setIsFormValid(!validate.error);
            setErrors(errors);
        }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let businessCheck= document.getElementById("business").checked;
        
        setLoader(true);
        fetch(`https://api.shipap.co.il/clients/signup?token=47d94128-56e0-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                firstName: data.get("firstName"), middleName: data.get("middleName"), lastName: data.get("lastName"), phone: data.get("phone"), email: data.get("email"), password: data.get("password"), imgUrl: "", imgAlt: "", state: "", country: data.get("country"), city: data.get("city"), street: data.get("street"), houseNumber: data.get("houseNumber"), zip: data.get("zip"), business: businessCheck,
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
            setOpen(true);
            setIsSuccess("success");
            setSnackbarMassage("User Created");
            setLoader(false);
            navigate("/login");
        })
        .catch(err => {
            setOpen(true);
            setIsSuccess("error");
            setSnackbarMassage("err.message");
            setLoader(false);

        });
        };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
                <Typography component="h1" variant="h5"> Sign up </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                autoComplete="given-name" value={formData.firstName} helperText={errors.firstName} error= {Boolean(errors.firstName)} onChange={handleChange} name="firstName" required fullWidth id="firstName" label="First Name" autoFocus  type='text'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                autoComplete="middle-name" value={formData.middleName} helperText={errors.middleName} error= {Boolean(errors.middleName)} onChange={handleChange} name="middleName" fullWidth id="middleName" label="Middle Name" type='text'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required fullWidth id="lastName" error={Boolean(errors.lastName)} helperText={errors.lastName} onChange={handleChange} label="Last Name" value={formData.lastName} name="lastName" autoComplete="family-name" type='text'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth id="phone" value={formData.phone} helperText={errors.phone} error= {Boolean(errors.phone)} onChange={handleChange} label="Phone Number" name="phone" autoComplete="phone" type='number'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required fullWidth id="email" error={Boolean(errors.email)} helperText={errors.email} onChange={handleChange} label="Email Address" name="email" value={formData.email} autoComplete="email" type='email'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required fullWidth name="password" error={Boolean(errors.password)} helperText={errors.password} onChange={handleChange} label="Password" type="password" value={formData.password} id="password" autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="country" value={formData.country} helperText={errors.country} error= {Boolean(errors.country)} onChange={handleChange} fullWidth id="country" label="Country" type='text'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="city" value={formData.city} helperText={errors.city} error= {Boolean(errors.city)} onChange={handleChange} fullWidth id="city" label="City" type='text'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="street" value={formData.street} helperText={errors.street} error= {Boolean(errors.street)} onChange={handleChange} fullWidth id="street" label="Street" type='text'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="houseNumber" value={formData.houseNumber} helperText={errors.houseNumber} error= {Boolean(errors.houseNumber)} onChange={handleChange} type='number' fullWidth id="houseNumber" label="House Number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="zip" value={formData.zip} helperText={errors.zip} error= {Boolean(errors.zip)} onChange={handleChange} fullWidth id="zip" label="Zip" type='number'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox id='business' color="primary" />} label="Are You a Business Account?"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={!isFormValid}
                        sx={{ mt: 3, mb: 2 }}
                        > Sign Up </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2"> Already have an account? Sign in </Link>
                        </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}