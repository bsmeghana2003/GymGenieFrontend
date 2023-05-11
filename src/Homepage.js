import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Facebook, Instagram, SportsGymnastics, Twitter } from '@mui/icons-material';

const Homepage = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "white" }}>
                    <Toolbar sx={{ color: 'black' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <SportsGymnastics />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#2980B9", cursor: "pointer" }}>
                            GymGenie
                        </Typography>
                        <Button color="inherit" onClick={() => { window.location.href = "/login" }} sx={{ m: 2 }}>
                            Login
                        </Button>
                        <Button color="primary" variant='contained' onClick={() => { window.location.href = "/signup" }}>
                            Signup
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box> <br />

            <Typography variant="h2" gutterBottom component="div" color={"#bc0048"} sx={{ m: 2 }}>
                Get fit with AI
            </Typography>
            <Typography variant="h4" gutterBottom component="div" color={"#2938b9"} sx={{ m: 2 }}>
                <b>Introducing GymGenie: tailored workout routines for you</b>
            </Typography>
            <Typography variant="h4" gutterBottom component="div" color={"#b92980"} sx={{ m: 2 }}>
                <b>✨ Just Released ✨</b>
            </Typography>
            <Typography variant="h4" gutterBottom component="div" color={"#59cd61"} sx={{ m: 2 }}>
                <b>GymGenie MealPlan 🥗</b>
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ m: 2 }}>
                <b>Supercharge your personalised workout with AI-powered meal plans tailored to your fitness goals</b>
            </Typography>
            <Typography variant="h4" gutterBottom component="div" color={"#2980B9"} sx={{ m: 2 }}>
                <b>MacroTracker ✏️ </b>
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ m: 2 }}>
                <b>Effortlessly enter your food and snacks and get an instant analysis of calories, protein, carbohydrates and fats</b>
            </Typography><br /><br />

            <Typography variant="h2" component="div" align='center' sx={{ m: 2 }}>
                <b>Trusted by people across the world </b>
            </Typography>
            <Typography variant="h4" sx={{ m: 2 }} color="text.secondary" align='center'>
                GymGenie has helped people in USA, India, Canada, UAE and 80 more countries
            </Typography> <br />

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Card sx={{ minWidth: 275, boxShadow: 10 }}>
                            <CardContent>
                                <Typography variant="h2" component="div" align='center' color={"#2980B9"}>
                                    100%
                                </Typography>
                                <Typography variant="h4" sx={{ mb: 1.5 }} color="text.secondary" align='center'>
                                    Completion
                                </Typography>
                            </CardContent>
                        </Card><br />
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ minWidth: 275, boxShadow: 10 }}>
                            <CardContent>
                                <Typography variant="h2" component="div" align='center' color={"#2980B9"}>
                                    24/7
                                </Typography>

                                <Typography variant="h4" sx={{ mb: 1.5 }} color="text.secondary" align='center'>
                                    Delivery
                                </Typography>
                            </CardContent>
                        </Card><br />
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ minWidth: 275, boxShadow: 10 }}>
                            <CardContent>
                                <Typography variant="h2" component="div" align='center' color={"#2980B9"}>
                                    100K
                                </Typography>

                                <Typography variant="h4" sx={{ mb: 1.5 }} color="text.secondary" align='center'>
                                    Workout plans generated
                                </Typography>
                            </CardContent>
                        </Card><br />
                    </Grid>
                </Grid>
            </Box>
            <footer>
                <hr />
                <Typography>
                    2023 GymGenie. All rights reserved.

                    <IconButton>
                        <Instagram></Instagram>
                    </IconButton>
                    <IconButton>
                        <Facebook></Facebook>
                    </IconButton>
                    <IconButton>
                        <Twitter></Twitter>
                    </IconButton>
                </Typography>
            </footer>
        </div >
    );
}

export default Homepage;