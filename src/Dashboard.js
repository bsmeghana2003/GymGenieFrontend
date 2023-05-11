import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Add, Done, Person, Settings, SportsGymnastics } from '@mui/icons-material';

const Dashboard = () => {
    const [workouts, setWorkouts] = useState([]);
    const [addedWorkouts, setAddedWorkouts] = useState([]);

    useEffect(() => {
        getAllWorkouts();
        getAllAddedWorkouts();
    }, []);

    const getAllWorkouts = () => {
        const access_token = window.localStorage.getItem("access_token");
        fetch("http://localhost:3000/api/workouts", {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then((response) => response.json())
            .then((response) => {
                if (response.status === "Success") {
                    setWorkouts(response.data);
                } else {
                    alert(response.err);
                }
            });
    }

    const getAllAddedWorkouts = () => {
        const access_token = window.localStorage.getItem("access_token");
        fetch("http://localhost:3000/api/user/added/workouts", {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then((response) => response.json())
            .then((response) => {
                if (response.status === "Success") {
                    setAddedWorkouts(response.data);
                } else {
                    alert(response.err);
                }
            });
    }

    const handleAddToProfile = (id) => {
        const access_token = window.localStorage.getItem("access_token");
        fetch("http://localhost:3000/api/user/add/workout", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify({
                workout_id: id
            })
        }).then((response) => response.json())
            .then((response) => {
                alert(response.data);
                window.location.reload();
            });
    }

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
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#2980B9", cursor: "pointer" }} onClick={() => { window.location.href = "/dashboard" }}>
                            GymGenie
                        </Typography>
                        <Button color="inherit" onClick={() => { window.location.href = "/profile" }}>
                            <Person />
                        </Button>
                        <Button color="inherit" onClick={() => { window.location.href = "/settings" }}>
                            <Settings />
                        </Button>
                        <Button color="inherit" onClick={() => { window.location.href = "/"; window.localStorage.removeItem("access_token"); }}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <br /><br />
            <Typography variant="h2" component="div" align='center'>
                <b>Generate your custom workout within seconds. </b>
            </Typography>
            <Typography variant="h4" sx={{ mb: 1.5 }} color="text.secondary" align='center'>
                201,537 workout routines generated so far.
            </Typography> <br />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {workouts.map(workout => {
                        return (<Grid item xs={4}>
                            <Card sx={{ height: 450, boxShadow: 10 }}>
                                <CardMedia
                                    component="img"
                                    alt="workout_image"
                                    sx={{ height: 250 }}
                                    image={workout.image_url}
                                    object-fit="contain"
                                />
                                <CardContent>
                                    <Typography variant="h4" component="div" align='center' color={"#2980B9"}>
                                        {workout.name}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" align='center'>
                                        {workout.details}
                                    </Typography>
                                    {addedWorkouts.indexOf(workout.workout_id) === -1 && (
                                        <Button endIcon={<Add />} align='center' onClick={() => { handleAddToProfile(workout.workout_id) }}>
                                            Add to profile
                                        </Button>
                                    )}
                                    {addedWorkouts.indexOf(workout.workout_id) !== -1 && (
                                        <Typography align='center' sx={{ color: "#59CD61" }}>
                                            Already added <Done />
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card><br />
                        </Grid>)
                    })}
                </Grid>
            </Box>
        </div>
    )
};

export default Dashboard;