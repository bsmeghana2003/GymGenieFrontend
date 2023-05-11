import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Dialog, DialogActions, DialogContent, Grid, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardMedia from '@mui/material/CardMedia';
import { Person, Settings, SportsGymnastics } from '@mui/icons-material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const Profile = () => {

    const [addedWorkouts, setAddedWorkouts] = React.useState([]);
    const [logDuration, setLogDuration] = React.useState("");
    const [logDate, setLogDate] = React.useState("");
    const [logKCal, setLogKCal] = React.useState("");
    const [openLogWorkout, setOpenLogWorkout] = React.useState(false);
    const [openWorkoutHistory, setOpenWorkoutHistory] = React.useState(false);
    const [workoutHistory, setWorkoutHistory] = React.useState([]);
    const [currentActiveWorkoutId, setCurrentActiveWorkoutId] = React.useState("");
    const [currentActiveWorkoutName, setCurrentActiveWorkoutName] = React.useState("");

    const handleOpenLogWorkout = (id, name) => {
        setOpenLogWorkout(true);
        setCurrentActiveWorkoutId(id);
        setCurrentActiveWorkoutName(name);
    }

    const handleCloseLogWorkout = () => setOpenLogWorkout(false);

    const handleOpenWorkoutHistory = (id) => {
        setWorkoutHistory([]);
        setOpenWorkoutHistory(true);
        setCurrentActiveWorkoutId(id);
        fetchWorkoutHistory(id);
    }

    const fetchWorkoutHistory = (id) => {
        const access_token = window.localStorage.getItem("access_token");
        fetch("http://localhost:3000/api/user/workout/log/history?" + 'workout_id=' + id, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then((response) => response.json())
            .then((response) => {
                if (response.status === "Success") {
                    setWorkoutHistory(response.data);
                } else {
                    alert(response.err);
                }
            });
    }

    useEffect(() => {
        fetchProfileDetails();
    }, []);


    const fetchProfileDetails = () => {
        const access_token = window.localStorage.getItem("access_token");
        fetch("http://localhost:3000/api/user/workouts", {
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

    const handleDurationChange = (event) => {
        setLogDuration(event.target.value);
    }
    const handleDateChange = (event) => {
        setLogDate(event.target.value);
    }
    const handleKCalChange = (event) => {
        setLogKCal(event.target.value);
    }

    const saveLoggedWorkout = () => {
        const access_token = window.localStorage.getItem("access_token");
        fetch("http://localhost:3000/api/user/log/workout", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify({
                workout_id: currentActiveWorkoutId,
                name: currentActiveWorkoutName,
                date: logDate,
                duration: logDuration,
                KCal: logKCal
            })
        }).then((response) => response.json())
            .then((response) => {
                alert(response.data);
                setOpenLogWorkout(false);
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
            </Box> <br />
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" component="div" align='center'>
                    <b>Workouts added by you </b> <br />
                    {addedWorkouts.length === 0 && (
                        <Button onClick={() => { window.location.href = "/dashboard" }}>Add Workouts</Button>
                    )}
                </Typography>
                <Grid container spacing={2}>
                    {addedWorkouts.map(workout => {
                        return (<Grid item xs={4}>
                            <Card sx={{ height: 470, boxShadow: 10 }}>
                                <CardMedia
                                    component="img"
                                    alt="workout_image"
                                    sx={{ height: 250 }}
                                    image={workout.workoutinfo[0].image_url}
                                    object-fit="contain"
                                />
                                <CardContent>
                                    <Typography variant="h4" component="div" align='center' color={"#2980B9"}>
                                        {workout.workoutinfo[0].name}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" align='center'>
                                        {workout.workoutinfo[0].details}
                                    </Typography>
                                    {/* <Button endIcon={<Add />} align='center' onClick={() => { handleAddToProfile(workout.workout_id) }}>
                                        Add to profile
                                    </Button> */}
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => { handleOpenLogWorkout(workout.workout_id, workout.workoutinfo[0].name) }}>Log Workout</Button>
                                    <Button onClick={() => { handleOpenWorkoutHistory(workout.workout_id) }}>Workout History</Button>
                                </CardActions>
                            </Card><br />
                        </Grid>)
                    })}
                </Grid>
            </Box>
            <div>
                <Dialog
                    open={openLogWorkout}
                    onClose={handleCloseLogWorkout}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="duration"
                            label="Add number of minutes"
                            onChange={handleDurationChange}
                            value={logDuration}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="date"
                            label="Date"
                            onChange={handleDateChange}
                            value={logDate}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="logCal"
                            label="Add number of KCals"
                            onChange={handleKCalChange}
                            value={logKCal}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={saveLoggedWorkout}>Save</Button>
                        <Button onClick={handleCloseLogWorkout}>Close</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openWorkoutHistory}
                    onClose={() => { setOpenWorkoutHistory(false) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                >
                    <DialogContent>
                        {workoutHistory.map(workout => {
                            return (
                                <div>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>{workout.workout_name} - {workout.date}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Duration : {workout.duration}mins <br />
                                                KCal : {workout.KCal}KCal <br />
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion> <br />
                                </div>
                            )
                        })}
                        {workoutHistory.length === 0 && (
                            <Typography>Nothing here, log a workout to see history.</Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setOpenWorkoutHistory(false) }}>Okay</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );

};

export default Profile;