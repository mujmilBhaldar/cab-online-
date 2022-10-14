import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import * as React from "react";
import Divider from "@mui/material/Divider";
import TripDetails from "./TripDetails";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useStyles from "./BookingStyle";

import Person from "@mui/icons-material/Person";
import ACIcon from "@mui/icons-material/AcUnit";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import firebase from "../../../shared/config/firebase";
import CustomerService from "../../../services/CustomerService";

import { useSelector, useDispatch } from "react-redux";
import { selectBooking } from "../../../app/slices/BookingSlice";
import CabService from "../../../services/CabService";
import CabModel from "../../../shared/models/CabModel";

let theme = createTheme({
  typography: {
    fontFamily: "Poppins,sans-serif",
  },
});

interface IBookingDetailsProps {}

const BookingDetails: React.FunctionComponent<IBookingDetailsProps> = (
  props
) => {
  const classes = useStyles();
  const bookingState = useSelector(selectBooking);

  const [cab, setCab] = React.useState<CabModel>({
    _id: "",
  });

  const [otpState, setOtpState] = React.useState({
    mobile: "",
    otp: "",
    otpSent: false,
  });

  const [customer, setCustomer] = React.useState({
    name: {
      first: "",
      last: "",
    },
    email: "",
    mobile: "",
  });

  const [confirmationResult, setConfirmationResult] = React.useState<any>();

  // load a cab based on the id received from redux
  React.useEffect(() => {
    if (bookingState?.cabId != cab?._id)
      CabService.getSingleCab(bookingState?.cabId)
        .then((response) => {
          setCab(response?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [bookingState]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setOtpState({ ...otpState, [name]: value });
  };
  const handleMobileChange = (e: any) => {
    const { name, value } = e.target;
    setOtpState({ ...otpState, mobile: value });
  };

  const handleNameChange = (e: any) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, name: { ...customer.name, [name]: value } });
  };

  const { mobile, otp, otpSent } = otpState;

  // let confirmationResult: any;
  let recaptchaVerifier: any;
  const sendOtp = () => {
    // console.log("in sendOTP ", recaptchaVerifier);

    const phoneNumber = "+91" + mobile;
    // console.log(phoneNumber);
    const appVerifier = recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResultp) => {
        setConfirmationResult(confirmationResultp);
        // console.log("OTP has been sent");
        alert("OTP sent you mobile");
        setOtpState({ ...otpState, otpSent: true });
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log("SMS not sent ", error);
        // alert("try again");
      });
  };

  const configureCaptcha = () => {
    recaptchaVerifier = new firebase.auth.RecaptchaVerifier("sign-in-button", {
      size: "invisible",
      callback: (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // sendOtp();
        console.log("Recaptca varified");
      },
      defaultCountry: "IN",
    });
    sendOtp();
    console.log("in configureCaptcha()");
  };

  const submitOtp = () => {
    const code = otp;
    // console.log(code);
    confirmationResult
      ?.confirm(code)
      .then((result: any) => {
        // User signed in successfully.
        const user = result.user;
        CustomerService.getSingleCustomer(`mobile=${mobile}`)
          .then((response) => {
            const cust = response?.data?.data;
            if (cust._id) {
              // customer exists, load data received from server
              alert("User exists in DB");
              setCustomer({
                name: cust?.name,
                email: cust?.email,
                mobile: cust?.mobile,
              });
            } else {
              // customer not exists
              setCustomer({
                name: { first: "", last: "" },
                email: "",
                mobile: "",
              });
              alert("User does not exists in DB");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((error: any) => {
        // User couldn't sign in (bad verification code?)
        // console.log("OTP is wrong ", error);
        alert("OTP is wrong");
      });
  };

  const checkout = () => {
    console.log("******************* Booking Details ********************");
    console.log("Customer: ", customer);
    console.log("Cab: ", cab);
    console.log("BookingState: ", bookingState);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          sx={{ padding: { xs: "20px", sm: "0", lg: "50px 0", md: "50px 0" } }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{ margin: "0px 0 50px 0" }}
          >
            Booking Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TripDetails mTop={50} />
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Box
                sx={{
                  padding: "16px",
                  backgroundColor: "#fff",
                  boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 
                    0px 1px 1px 0px rgb(0 0 0 / 14%), 
                    0px 1px 3px 0px rgb(0 0 0 / 12%)`,
                }}
              >
                <Typography variant="h5">
                  Enter Mobile Number To Login OR SignUp
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    padding: "20px 0",
                    gap: "15px",
                    flexDirection: { xs: "column", lg: "row" },
                  }}
                >
                  <div id="sign-in-button"></div>
                  <TextField
                    variant="outlined"
                    label="Enter a Mobile Number"
                    name="mobile"
                    value={mobile}
                    className={classes.customInput}
                    onChange={handleMobileChange}
                    sx={{ backgroundColor: "#fff", minWidth: { md: 200 } }}
                    disabled={otpSent}
                  />
                  {otpSent ? (
                    <Box display="flex">
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Enter OTP"
                        name="otp"
                        value={otp}
                        className={classes.customInput}
                        onChange={handleChange}
                        sx={{ backgroundColor: "#fff" }}
                      />
                      <Button
                        sx={{ marginLeft: 2 }}
                        className={classes.customButton}
                        variant="contained"
                        onClick={submitOtp}
                      >
                        Verify OTP
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      onClick={configureCaptcha}
                      className={classes.customButton}
                      variant="contained"
                      sx={{ maxWidth: { md: 150 } }}
                    >
                      Send OTP
                    </Button>
                  )}
                </Box>
                <Typography variant="h5">Enter Your Details</Typography>
                <Box
                  sx={{
                    display: "flex",
                    padding: "20px 0",
                    gap: "15px",
                    flexDirection: { xs: "column", lg: "row" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="First Name"
                    name="first"
                    value={customer?.name?.first}
                    className={classes.customInput}
                    onChange={handleNameChange}
                    disabled={customer?.name?.first ? true : false}
                    sx={{ backgroundColor: "#fff" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Last Name"
                    name="last"
                    value={customer?.name?.last}
                    className={classes.customInput}
                    onChange={handleNameChange}
                    disabled={customer?.name?.last ? true : false}
                    sx={{ backgroundColor: "#fff" }}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter Email"
                    name="email"
                    value={customer.email}
                    className={classes.customInput}
                    onChange={(e: any) =>
                      setCustomer({ ...customer, email: e.target.value })
                    }
                    disabled={customer?.email ? true : false}
                    sx={{ backgroundColor: "#fff" }}
                  />
                </Box>
                <Divider sx={{ margin: "10px 0 15px 0" }} />
                <Box>
                  <Typography variant="h5">Cab Details</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      padding: "10px 0 0",
                      gap: "15px",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: "500" }}>
                      <Person
                        sx={{
                          position: "relative",
                          top: " 5px",
                          marginRight: "10px",
                        }}
                      />
                      Passengers
                    </Typography>
                    <Typography sx={{ marginTop: "7px" }}>
                      {cab?.seats}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      padding: "10px 0 0",
                      gap: "15px",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: "500" }}>
                      <ACIcon
                        sx={{
                          position: "relative",
                          top: " 5px",
                          marginRight: "10px",
                        }}
                      />
                      AC
                    </Typography>
                    <Typography sx={{ marginTop: "7px" }}>
                      {cab?.ac ? "" : "Not"} Available
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      padding: "10px 0 0",
                      gap: "15px",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: "500" }}>
                      <DirectionsCarIcon
                        sx={{
                          position: "relative",
                          top: " 5px",
                          marginRight: "10px",
                        }}
                      />
                      Cab Number
                    </Typography>
                    <Typography sx={{ marginTop: "7px" }}>
                      {cab?.rtoNumber}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      padding: "10px 0 0",
                      gap: "15px",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: "500" }}>
                      <DirectionsCarIcon
                        sx={{
                          position: "relative",
                          top: " 5px",
                          marginRight: "10px",
                        }}
                      />
                      Cab Type: {cab?.type}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      padding: "10px 0 0",
                      gap: "15px",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: "500" }}>
                      <DirectionsCarIcon
                        sx={{
                          position: "relative",
                          top: " 5px",
                          marginRight: "10px",
                        }}
                      />
                      Fare Rate: {cab?.rate}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ margin: "25px 0 15px 0" }} />
                <Box
                  sx={{
                    display: "flex",
                    padding: "10px 0 0",
                    gap: "15px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "500" }}>
                    <CurrencyRupeeIcon
                      sx={{
                        position: "relative",
                        top: " 5px",
                        marginRight: "10px",
                      }}
                    />
                    Total
                  </Typography>
                  <Typography variant="h5" sx={{ marginTop: "7px" }}>
                    {Math.ceil((bookingState?.distance / 1000) * cab?.rate!)}
                  </Typography>
                </Box>
                <Button
                  className={classes.customButton}
                  sx={{ marginTop: "20px" }}
                  variant="contained"
                  onClick={checkout}
                >
                  Proceed to pay
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default BookingDetails;
