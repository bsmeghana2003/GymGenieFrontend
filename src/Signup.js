import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Signup = () => {

    const [name, setName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [height, setHeight] = React.useState("");
    const [weight, setWeight] = React.useState("");

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleHeight = (event) => {
        setHeight(event.target.value);
    }

    const handleWeight = (event) => {
        setWeight(event.target.value);
    }

    const handleSignUp = () => {
        fetch("http://localhost:3000/api/user/add", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                username: username,
                password: password,
                height: height,
                weight: weight
            })
        }).then((response) => response.json())
            .then((response) => {
                alert(response.data);
                window.location.href = "/login";
            });
    }

    const theme = createTheme();


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme}>
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

                    <Typography component="h1" variant="h4">
                        Gym Genie
                    </Typography>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={handleName}
                            value={name}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleUsername}
                            value={username}
                        />
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

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Height"
                            label="Height(cms)"
                            type="cms"
                            id="height"
                            autoComplete=""
                            onChange={handleHeight}
                            value={height}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Weight"
                            label="Weight(kg)"
                            type="kg"
                            id="weight"
                            autoComplete=""
                            onChange={handleWeight}
                            value={weight}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                        <Link href="#" variant="body2">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Signup;