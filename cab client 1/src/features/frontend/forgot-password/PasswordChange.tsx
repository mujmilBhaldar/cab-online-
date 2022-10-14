import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
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
import { useNavigate } from "react-router-dom";
import Snackbar from "../../../ui/snackbar/Snackbar";
import { AlertColor } from "@mui/material";
// npm i react-redux

import { useParams } from "react-router-dom";
import UserService from "../../../services/UserService";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#/">
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

const PasswordChange = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [user, setUser] = React.useState({
    _id: "",
    cPassword: "",
    password: "",
  });
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

  React.useEffect(() => {
    AuthService.validateToken(token)
      .then((response) => {
        setUser({ ...user, _id: response?.data?.data?.id });
      })
      .catch((err) => {
        alert("The password reset link is invalid or expired!");
        navigate("/forgot-password");
      });
  }, [token]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    UserService.updateUser(user?._id, { password: user?.password })
      .then((response: AxiosResponse) => {
        dispatch(addUser(response?.data?.data));
        alert("Password changed successfully");
        navigate("/secured");
      })
      .catch((err) => {
        let message =
          err?.response?.data?.message || "Could not Changed, try again";
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
            Change Password
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cPassword"
              label="Confirm Password"
              type="password"
              id="cpassword"
              autoComplete="current-password"
              value={user.cPassword}
              onChange={handleChange}
              error={user.password != user.cPassword}
              helperText={
                user.password != user.cPassword &&
                "Password & confirm password did not match"
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default PasswordChange;
