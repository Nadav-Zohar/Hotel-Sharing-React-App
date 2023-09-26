import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { CardActionArea, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { GeneralContext } from '../App';
import { checkPermissions } from '../components/Navbar';
import { RoleTypes } from '../components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


export default function MyCards() {
    const CrudPermissionMyCards = [
        {
            ariaLabel: 'favorite',
            onClick: (id) => handleFavorite(id),
            icon: <FavoriteIcon />,
        },
        {
            ariaLabel: 'delete',
            onClick: (id) => handleDelete(id),
            icon: <DeleteIcon />,
            permissions: [RoleTypes.business, RoleTypes.admin],
        },
        {
            ariaLabel: 'edit',
            onClick: (id) => "handleEdit(id)",
            icon: <ModeEditIcon />,
            permissions: [RoleTypes.business, RoleTypes.admin],
        },
    ];
    const { user, userRolyType, setLoader, setOpen, setIsSuccess, setSnackbarMassage } = React.useContext(GeneralContext);
    const navigate = useNavigate();
    const [allCards, setAllCards]= React.useState([])
    const [favoriteStatus, setFavoriteStatus] = React.useState({});
    React.useEffect(() => {
        setLoader(true);
        fetch(`https://api.shipap.co.il/business/cards?token=47d94128-56e0-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            setAllCards(data);
        })
        .finally(() => setLoader(false));
    }, [])

    const handleDelete= (item) =>{
        setLoader(true);
        fetch(`https://api.shipap.co.il/business/cards/${item.id}?token=47d94128-56e0-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'DELETE',
        })
        .then(() => {
            setAllCards((prevCards) => prevCards.filter((card) => card.id !== item.id));
            setOpen(true);
            setIsSuccess("success");
            setSnackbarMassage("Card Deleted");
        })
        .finally(() => setLoader(false));
    }
    const handleFavorite= (item) => {
        const cardId = item.id;
        if (!favoriteStatus[cardId]) {
            setLoader(true);
            fetch(`https://api.shipap.co.il/cards/${cardId}/favorite?token=47d94128-56e0-11ee-aae9-14dda9d4a5f0`, {
                credentials: 'include',
                method: 'PUT',
            })
                .then(() => {
                    setFavoriteStatus((prevStatus) => ({
                        ...prevStatus,
                        [cardId]: true,
                    }));
                    setLoader(false);
                    setOpen(true);
                    setIsSuccess("success");
                    setSnackbarMassage("Card Added To Favorite");
                });
        } else {
            setLoader(true);
            fetch(`https://api.shipap.co.il/cards/${cardId}/unfavorite?token=47d94128-56e0-11ee-aae9-14dda9d4a5f0`, {
                credentials: 'include',
                method: 'PUT',
            })
                .then(() => {
                    setFavoriteStatus((prevStatus) => ({
                        ...prevStatus,
                        [cardId]: false,
                    }));
                    setLoader(false);
                    setOpen(true);
                    setIsSuccess("success");
                    setSnackbarMassage("Card Removed From Favorite");
                });
        }
    }
    return (
        <>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} position='fixed' top={"100px"} right={"50px"} >
                <Button onClick={() => navigate("/add-card")} variant="contained" endIcon={<AddIcon />}>
                    Add Card
                </Button>
            </Stack>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                {
                allCards.map((c) => 
                    <Grid item key={c.id} xs={12} sm={6} md={4}>
                        <Card  sx={{ maxWidth: 345 }}>
                            <CardActionArea onClick={() => navigate(`/card-page/${c.id}`)}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            {user ? user.fullName[0] : ""}
                                        </Avatar>
                                    }
                                    title={user ? user.fullName : ""}
                                    subheader={c.createdTime}
                                />
                                <Typography variant='h4' color="text.main">{c.title}</Typography>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={c.imgUrl}
                                    alt={c.imgAlt}
                                />
                                <CardContent>
                                    <Typography variant='h5' color="text.secondary">{c.subtitle}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    {c.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions disableSpacing>
                                {
                                CrudPermissionMyCards.map((item) => (
                                (!item.permissions || checkPermissions(item.permissions, userRolyType)) && (
                                <IconButton
                                    key={item.ariaLabel}
                                    aria-label={item.ariaLabel}
                                    onClick={() => item.onClick(c)}
                                >
                                    {item.ariaLabel === 'favorite' ? (
                                        <FavoriteIcon color={favoriteStatus[c.id] ? "error" : "inherit"} />
                                    ) : (
                                        item.icon
                                    )}
                                </IconButton>
                                )
                                ))
                                }
                            </CardActions>
                        </Card>
                    </Grid>
                )
                }
                </Grid>
            </Container>
        </>
    )
}
