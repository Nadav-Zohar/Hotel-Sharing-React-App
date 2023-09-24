import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import React, { useEffect, useState } from "react";
import { GeneralContext } from "../App";
import { useNavigate } from "react-router-dom";



export default function Cards() {
    const { user } = React.useContext(GeneralContext);
    const [allTheCards, setAllTheCards]= useState([])
    const navigate = useNavigate();

useEffect(() => {
    fetch(`https://api.shipap.co.il/cards?token=47d94128-56e0-11ee-aae9-14dda9d4a5f0`, {
        credentials: 'include',
        })
    .then(res => res.json())
    .then(data => {
        setAllTheCards(data);
    });
}, [])
    return (
        <>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                {
                allTheCards.map((c) => 
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
                                <IconButton aria-label="favorite">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="edit">
                                    <ModeEditIcon />
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
