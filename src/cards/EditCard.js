import { ThemeProvider } from "@emotion/react";
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography, createTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { allTextFieldForAddCard } from "./AddCard";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { GeneralContext } from "../App";
import Joi from "joi";
export default function EditCard() {
    const {setLoader, setOpen, setIsSuccess, setSnackbarMassage, mode } = useContext(GeneralContext);
    const [isFormValid,setIsFormValid]= useState(false);
    const [errors, setErrors]=  useState({});
    const navigate = useNavigate();
    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });
    const { cardID } = useParams();
    useEffect(() => {
        setLoader(true);
        fetch(`https://api.shipap.co.il/cards/${cardID}?token=717fd20e-6283-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            setLoader(false);
            const filterAndAssignDefaults = (data) => {
                const allowedKeys = [
                    'title',
                    'description',
                    'subtitle',
                    'phone',
                    'email',
                    'web',
                    'imgUrl',
                    'imgAlt',
                    'state',
                    'country',
                    'city',
                    'street',
                    'houseNumber',
                    'zip',
                ];
                const filteredData = {};
                allowedKeys.forEach((key) => {
                    if (data[key] !== undefined) {
                        filteredData[key] = data[key];
                    } else {
                        filteredData[key] = '';
                    }
                });
                return filteredData;
            };
            const filteredFormData = filterAndAssignDefaults(data);
            setFormData(filteredFormData);
        });
    }, [cardID, setLoader]);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subtitle: '',
        phone: '',
        email: '',
        web: '',
        imgUrl: '',
        imgAlt: '',
        state: '',
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        zip: ''
    });
    const schema = Joi.object({
        title: Joi.string().min(2).max(20).required(),
        description: Joi.string().min(2).max(100).required(),
        subtitle: Joi.string().min(2).max(20).required(),
        phone: Joi.string().min(10).max(15).required(),
        email: Joi.string().email({ tlds: false }).required(),
        web: Joi.string().min(2).max(100).required(),
        imgUrl: Joi.string().min(2).max(10000).required(),
        imgAlt: Joi.string().min(2).max(100).required(),
        state: "",
        country: Joi.string().min(2).max(100).required(),
        city: Joi.string().min(2).max(100).required(),
        street: Joi.string().min(2).max(100).required(),
        houseNumber: Joi.string().min(1).max(20).required(),
        zip: Joi.string().min(5).max(10).required(),
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
        setLoader(true);
        fetch(`https://api.shipap.co.il/business/cards/${cardID}?token=717fd20e-6283-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(formData),
        })
        .then(() => {
            setLoader(false);
            setOpen(true);
            setIsSuccess("success");
            setSnackbarMassage("Card Edited Successfuly");
            navigate("/");
        });
    };
    return (
        <>
            <ThemeProvider theme={theme}>
            <Container   component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <ModeEditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Your Card
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {allTextFieldForAddCard.map(t =>
                                <Grid key={t.name} item xs={12} sm={t.itemSm}>
                                    <TextField
                                    name={t.name}
                                    required
                                    fullWidth= {t.fullWidth}
                                    id={t.id}
                                    label={t.label}
                                    autoFocus= {t.autoFocus}
                                    type={t.type}
                                    onChange={handleChange}
                                    error= {Boolean(errors[t.name])}
                                    helperText= {errors[t.name]}
                                    value= {formData[t.name]}
                                    />
                                </Grid>
                            )
                            }
                        </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    disabled={!isFormValid}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Edit Card
                                </Button>
                    </Box>
                    <Grid container justifyContent="center">
                            <Grid item>
                                <Link to={"/"} variant="body2">
                                Go Back
                                </Link>
                            </Grid>
                        </Grid>
                </Box>
            </Container>
        </ThemeProvider>
        </>
    )
}
