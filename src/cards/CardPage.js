import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Container, Grid, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
export default function CardPage() {
    const { cardID } = useParams();
    const [theCard, setTheCard]= useState({});
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://api.shipap.co.il/cards/${cardID}?token=717fd20e-6283-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            setTheCard(data);
        });
    }, [])
    return (
        <>
        <Container sx={{ py: 8 }} maxWidth="lg">
        <Button variant="outlined" onClick={() => navigate("/")} sx={{mb: 1}}>Go Back</Button>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card sx={{ maxWidth: "100%" }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {theCard.userName ? theCard.userName[0] : ""}
                                </Avatar>
                            }
                            title={theCard.userName}
                            subheader={theCard.createdTime}
                        />
                        <Typography variant='h3' mb={5} textAlign={'center'} color="text.main">{theCard.title}</Typography>
                        <CardMedia
                            component="img"
                            height="100%"
                            image={theCard.imgUrl}
                            alt={theCard.imgAlt}
                        />
                        <CardContent>
                            <Typography variant='h4' color="text.primary" mb={1}>Country: {theCard.country}</Typography>
                            <Typography variant='h4' color="text.primary" mb={1}>City: {theCard.city}</Typography>
                            <Typography variant='h4' color="text.primary" mb={1}>Street: {theCard.street}</Typography>
                            <Typography variant='h4' color="text.primary" mb={1}>Hotel Number: {theCard.houseNumber}</Typography>
                            <Typography variant='h4' color="text.primary" mb={1}>ZIP: {theCard.houseNumber}</Typography>
                            <Typography variant='h4' color="text.primary" mb={1}>Phone: {theCard.phone}</Typography>
                            <Typography variant='h4' color="text.primary" mb={1}>Email: {theCard.email}</Typography>
                            <Typography variant='h4' color="text.primary" mb={1}>Web: {theCard.web}</Typography>
                            <Typography variant="h3" color="text.primary" mb={1}>Description: {theCard.description}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
        </>
    )
}
