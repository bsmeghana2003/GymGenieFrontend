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
import { TextField } from '@mui/material';
import { Person, Settings, SportsGymnastics } from '@mui/icons-material';


const SettingsPage = () => {

    const [userdata, setUserData] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showUpdatePassword, setShowUpdatePassword] = React.useState(false);

    useEffect(() => {
        fetchProfileDetails();
    }, []);


    const fetchProfileDetails = () => {
        const access_token = window.localStorage.getItem("access_token");
        fetch("http://localhost:3000/api/user/settings", {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then((response) => response.json())
            .then((response) => {
                if (response.status === "Success") {
                    setUserData(response.data);
                } else {
                    alert(response.err);
                }
            });
    }

    const updateUserPassword = () => {
        const access_token = window.localStorage.getItem("access_token");
        fetch("http://localhost:3000/api/user/update/password", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify({
                password: password,
            })
        }).then((response) => response.json())
            .then((response) => {
                alert(response.data);
                setShowUpdatePassword(false);
            });
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
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
            <Card sx={{ width: 500, boxShadow: 10, m: 1 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5, fontSize: 20 }} gutterBottom>
                        Name : {userdata.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: 20 }} gutterBottom>
                        Username :  {userdata.username}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: 20 }}>
                        Height :  {userdata.height}cms
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: 20 }} >
                        Weight :  {userdata.weight}kgs
                    </Typography>

                    {showUpdatePassword && (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlePassword}
                            value={password}
                        />
                    )}
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => { window.location.href = "/dashboard" }}>Back</Button>
                    <Button size="small" onClick={() => { setShowUpdatePassword(true); }}>Update Password</Button>
                    {showUpdatePassword && (
                        <Button size="small" onClick={updateUserPassword}>Save</Button>
                    )}
                </CardActions>
            </Card>
        </div>
    );
};

export default SettingsPage;