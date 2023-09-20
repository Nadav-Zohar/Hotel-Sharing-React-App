import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { GeneralContext } from '../App';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Joi from 'joi';


export default function Account() {
    const { user, setLoader, mode } = useContext(GeneralContext);

    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });
    
    const clientStructure = [
        { name: 'firstName', type: 'text', label: 'First Name', required: true, block: true },
        { name: 'middleName', type: 'text', label: 'Middle Name', required: false, block: false },
        { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: false },
        { name: 'phone', type: 'number', label: 'Phone', required: false, block: false },
        { name: 'email', type: 'email', label: 'Email', required: true, block: false },
        { name: 'country', type: 'text', label: 'Country', required: false, block: false },
        { name: 'city', type: 'text', label: 'City', required: false, block: false },
        { name: 'street', type: 'text', label: 'Street', required: false, block: false },
        { name: 'houseNumber', type: 'number', label: 'House Number', required: false, block: false },
        { name: 'zip', type: 'number', label: 'Zip', required: false, block: true },
    ];
    
    const [formData, setFormData]= React.useState({
        firstName:"", lastName: "", email: "", middleName: "", phone: "", country: "", city: "", street: "", houseNumber: "", zip: "",
    })
    useEffect(() => {
        if (user){
            setFormData({
                firstName:user.firstName || "", lastName:user.lastName || "", email:user.email || "", middleName:user.middleName || "", phone:user.phone || "", country:user.country || "", city:user.city || "", street:user.street || "", houseNumber:String(user.houseNumber) || "", zip:String(user.zip) || "",
            })
        }
        
    }, [user])
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(30).required(), lastName: Joi.string().min(3).max(30).required(), email: Joi.string().email({ tlds: false }).required(), middleName: Joi.string().min(3).max(30).required(), phone: Joi.string().min(10).max(15).required(), country: Joi.string().min(3).max(50).required(), city: Joi.string().min(3).max(50).required(), street: Joi.string().min(5).max(100).required(), houseNumber: Joi.string().min(1).max(20).required(), zip: Joi.string().min(5).max(10).required(),
        });
    const [isFormValid,setIsFormValid]= React.useState(false);
    const [errors, setErrors]=  React.useState({});

    const handleChange = (ev) => {
        const { name, value } = ev.target;
      
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      
        const validate = schema.validate({ ...formData, [name]: value }, { abortEarly: false });
        const newErrors = {};
      
        if (validate.error) {
          validate.error.details.forEach((e) => {
            const key = e.context.key;
            const err = e.message;
            newErrors[key] = err;
          });
        }
        setIsFormValid(!validate.error);
        setErrors(newErrors);
      };
      

    const handleSubmit = ev => {
        ev.preventDefault();
        const obj = {};
        const elements = ev.target.elements;
        
        clientStructure.forEach(s => {
            if (s.type === 'boolean') {
                obj[s.name] = elements[s.name].checked;
            } else {
                obj[s.name] = elements[s.name].value;
            }
        });

        setLoader(true);
    
        fetch(`https://api.shipap.co.il/clients/update?token=47d94128-56e0-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(obj),
        })
        .then(() => {
            setLoader(false);
        });
    };

    return (
        <ThemeProvider theme={theme}>
            {
                user && !user.admin ? 
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
                        <EditOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">{user ? `${user.fullName}'s info` : ""}</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            {
                                clientStructure.map(s =>
                                    <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                                        {
                                            <TextField
                                                error= {Boolean(errors[s.name])}
                                                helperText={errors[s.name]}
                                                margin="normal"
                                                required={s.required}
                                                fullWidth
                                                id={s.name}
                                                label={s.label}
                                                name={s.name}
                                                type={s.type}
                                                autoComplete={s.name}
                                                value={formData[s.name]}
                                                onChange={handleChange}
                                            />
                                        }
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
                            Save
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to={"/about"} variant="body2">
                                Go Back
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container> : <h2 style={{textAlign: "center"}}> Unable To Edit "Admin" User's </h2>
        }
        </ThemeProvider>
    );
}