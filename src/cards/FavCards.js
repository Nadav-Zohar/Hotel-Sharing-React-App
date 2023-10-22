import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../App";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from "@emotion/react";
export default function FavCards() {
    const theme = useTheme();
    const [updateFavCards, setUpdateFavCards]= useState(undefined);
    const { user, setLoader, setOpen, setIsSuccess, setSnackbarMassage } = useContext(GeneralContext);
    const navigate = useNavigate();
    const [favCards, setFavCards]= useState([]);
    useEffect(() => {
        setLoader(true);
        fetch(`https://api.shipap.co.il/cards/favorite?token=717fd20e-6283-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            setFavCards(data);
            setLoader(false);
        });
    }, [setLoader, updateFavCards]) 
    const handleFavorite= (item) => {
        setLoader(true);
        fetch(`https://api.shipap.co.il/cards/${item.id}/unfavorite?token=717fd20e-6283-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'PUT',
        })
        .then(() => {
            setUpdateFavCards(Math.random);
            setOpen(true);
            setIsSuccess("success");
            setSnackbarMassage("Card Removed From Favorite");
            setLoader(false);
        });
    }
    return (
        <>
        <Typography variant="h2" mt={3} color="text.primary" textAlign={"center"}>Favorite Cards Page</Typography>
        <Typography variant="h4" mt={3} color="text.secondary" textAlign={"center"}>Here you can find you favorite cards!</Typography>
        <hr />
            <Container sx={{ py: 8 }} maxWidth="md">
                <hr />
                <Grid container spacing={4}>
                {
                favCards.map((c) => 
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
                                <IconButton onClick={() => handleFavorite(c)} aria-label="favorite">
                                    <FavoriteIcon sx={{color: theme.palette.error.main}} />
                                </IconButton>
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
