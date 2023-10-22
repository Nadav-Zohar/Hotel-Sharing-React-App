import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { GeneralContext } from '../App';

export const allTextFieldForAddCard= [
    {itemSm: 4, name: 'title', id: 'title', label: 'main title', autoFocus: true, fullWidth: true, type: "text", },
    {itemSm: 4, name: 'subtitle', id: 'subtitle', label: 'sub title', autoFocus: false, fullWidth: true, type: "text", },
    {itemSm: 4, name: 'phone', id: 'phone', label: 'phone', autoFocus: false, fullWidth: true, type: "number", },
    {itemSm: 12, name: 'description', id: 'description', label: 'description', autoFocus: false, fullWidth: true, type: "text", },
    {itemSm: 6, name: 'email', id: 'email', label: 'email', autoFocus: false, fullWidth: true, type: "email", },
    {itemSm: 6, name: 'web', id: 'web', label: 'web url', autoFocus: false, fullWidth: true, type: "text", },
    {itemSm: 12, name: 'imgUrl', id: 'imgUrl', label: 'img url', autoFocus: false, fullWidth: true, type: "text", },
    {itemSm: 12, name: 'imgAlt', id: 'imgAlt', label: 'img alt', autoFocus: false, fullWidth: true, type: "text", },
    {itemSm: 6, name: 'country', id: 'country', label: 'country', autoFocus: false, fullWidth: true, type: "text", },
    {itemSm: 6, name: 'city', id: 'city', label: 'city', autoFocus: false, fullWidth: true, type: "text", },
    {itemSm: 4, name: 'street', id: 'street', label: 'street', autoFocus: false, fullWidth: true, type: "text", },
    {itemSm: 4, name: 'houseNumber', id: 'housenumber', label: 'business number', autoFocus: false, fullWidth: true, type: "number", },
    {itemSm: 4, name: 'zip', id: 'zip', label: 'zip', autoFocus: false, fullWidth: true, type: "number", },
    ]

export default function AddCard() {
    const {setLoader, setOpen, setIsSuccess, setSnackbarMassage, mode } = React.useContext(GeneralContext);
    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });
    const [formData, setFormData]= React.useState({
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
        houseNumber:'',
        zip: ''
    })
    const [isFormValid,setIsFormValid]= React.useState(false);
    const [errors, setErrors]=  React.useState({});
    const navigate = useNavigate();
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
        fetch(`https://api.shipap.co.il/business/cards?token=717fd20e-6283-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(data => {
            setLoader(false);
            setOpen(true);
            setIsSuccess("success");
            setSnackbarMassage("Card Added Successfuly");
            navigate("/my-cards");
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add New Card
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
                                    value= {formData.name}
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
                                    Add Card
                                </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}