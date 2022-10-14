import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthService from "../../../services/AuthService";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../../app/slices/AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import Snackbar from "../../../ui/snackbar/Snackbar";
import { AlertColor } from "@mui/material";
// npm i react-redux
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="#/">
        Topper Skills
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface AlertStateType {
  severity: AlertColor;
  open: boolean;
  message: string;
}

const theme = createTheme();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [alertState, setAlertState] = React.useState<AlertStateType>({
    severity: "success",
    open: false,
    message: "",
  });

  const handleAlertClose = () => {
    setAlertState({ ...alertState, open: false });
  };

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    AuthService.userLogin(user)
      .then((response: AxiosResponse) => {
        dispatch(addUser(response?.data?.data));
        // alert(response?.data?.message);
        navigate("/secured");
      })
      .catch((err) => {
        let message =
          err?.response?.data?.message || "Could not login, try again";
        // alert(message);
        setAlertState({
          open: true,
          message: message,
          severity: "error",
        });
      });
  };

  const { open, message, severity } = alertState;
  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={open}
        handleClose={handleAlertClose}
        message={message}
        severity={severity}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handleChange}
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
              value={user.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="#">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
