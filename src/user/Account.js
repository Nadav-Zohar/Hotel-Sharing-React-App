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
import { useContext } from 'react';
import { GeneralContext } from '../App';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const defaultTheme = createTheme();
const clientStructure = [
    { name: 'firstName', type: 'text', label: 'First Name', required: true, block: true },
    { name: 'middleName', type: 'text', label: 'Middle Name', required: false, block: false },
    { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: false },
    { name: 'phone', type: 'tel', label: 'Phone', required: false, block: false },
    { name: 'email', type: 'email', label: 'Email', required: true, block: false },
    { name: 'imgUrl', type: 'text', label: 'Img Url', required: false, block: true },
    { name: 'imgAlt', type: 'text', label: 'Img Alt', required: false, block: true },
    { name: 'country', type: 'text', label: 'Country', required: false, block: false },
    { name: 'city', type: 'text', label: 'City', required: false, block: false },
    { name: 'street', type: 'text', label: 'Street', required: false, block: false },
    { name: 'houseNumber', type: 'number', label: 'House Number', required: false, block: false },
    { name: 'zip', type: 'number', label: 'Zip', required: false, block: true },
];

export default function Account() {
    const { user, setUser, setLoader } = useContext(GeneralContext);
    console.log(user);

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
    
        fetch(`https://api.shipap.co.il/clients/update?token=204f16e2-44e7-11ee-ba96-14dda9d4a5f0`, {
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
        <ThemeProvider theme={defaultTheme}>
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
                                            s.type === 'boolean' ?
                                            <FormControlLabel
                                                control={<Switch color="primary" name={s.name} checked={user[s.name]} />}
                                                label={s.label}
                                                labelPlacement="start"
                                            /> :
                                            <TextField
                                                margin="normal"
                                                required={s.required}
                                                fullWidth
                                                id={s.name}
                                                label={s.label}
                                                name={s.name}
                                                type={s.type}
                                                autoComplete={s.name}
                                                value={user[s.name]}
                                                onChange={ev => setUser({ ...user, [s.name]: ev.target.value })}
                                            />
                                        }
                                    </Grid>
                                )
                            }
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
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