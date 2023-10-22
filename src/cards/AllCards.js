import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../App";
import { useNavigate } from "react-router-dom";




export default function Cards() {
    const { user, setLoader, setOpen, setIsSuccess, setSnackbarMassage } = useContext(GeneralContext);
    const [updateAllCards, setUpdateAllCards]= useState(undefined);
    const [allTheCards, setAllTheCards]= useState([])
    const navigate = useNavigate();
    const handleFavorite= (item) => {
        if(item.favorite === true){
            setLoader(true);
            fetch(`https://api.shipap.co.il/cards/${item.id}/unfavorite?token=717fd20e-6283-11ee-aae9-14dda9d4a5f0`, {
                credentials: 'include',
                method: 'PUT',
            })
            .then(() => {
                setUpdateAllCards(Math.random);
                setOpen(true);
                setIsSuccess("success");
                setSnackbarMassage("Card Removed From Favorite");
                setLoader(false);
            });
        }else {
            setLoader(true);
            fetch(`https://api.shipap.co.il/cards/${item.id}/favorite?token=717fd20e-6283-11ee-aae9-14dda9d4a5f0`, {
                credentials: 'include',
                method: 'PUT',
            })
            .then(() => {
                setUpdateAllCards(Math.random);
                setOpen(true);
                setIsSuccess("success");
                setSnackbarMassage("Card Added To Favorite");
                setLoader(false);
            });
        }
    }

    useEffect(() => {
        fetch(`https://api.shipap.co.il/cards?token=717fd20e-6283-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
            })
        .then(res => res.json())
        .then(data => {
            setAllTheCards(data);
        });
    }, [updateAllCards])
    return (
        <>
        <Typography variant="h2" mt={3} color="text.primary" textAlign={"center"}>Welcome To - Hotel Sharing</Typography>
        <Typography variant="h4" mt={3} color="text.secondary" textAlign={"center"}>here you can share your hotel with others, and see others recomendation of hotels.</Typography>
        <hr />
            <Container sx={{ py: 8 }} maxWidth="md">
                <hr />
                <Grid container spacing={4}>
                {
                allTheCards.map((c) => 
                    <Grid item key={c.id} xs={12} sm={6} md={4}>
                        <Card  sx={{ maxWidth: 345 }}>
                            <CardActionArea onClick={() => navigate(`/card-page/${c.id}`)}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            {c.userName ? c.userName[0] : ""}
                                        </Avatar>
                                    }
                                    title={c.userName}
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
                                { user ?
                                    <IconButton onClick={() => handleFavorite(c)} aria-label="favorite">
                                    <FavoriteIcon />
                                </IconButton> : ""
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
