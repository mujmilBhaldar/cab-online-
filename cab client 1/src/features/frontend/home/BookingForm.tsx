import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addBooking } from "../../../app/slices/BookingSlice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Navigate, useNavigate } from "react-router-dom";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  const navigate = useNavigate();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

interface FormProps {
  tripType: number;
}

const BForm = ({ tripType }: FormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sourceInpRef = React.createRef<HTMLInputElement>();
  const destinationInpRef = React.createRef<HTMLInputElement>();
  const mapRef = React.createRef<HTMLDivElement>();
  const [bookingDetails, setBookingDetails] = React.useState({
    source: "",
    destination: "",
    pickupDate: "",
    dropDate: "",
    pickupTime: "",
    distance: 0,
    duration: 0,
  });

  const [location, setLocation] = React.useState({
    source: { lat: 0, lng: 0 },
    destination: { lat: 0, lng: 0 },
  });

  const [state, setState] = React.useState({
    response: null,
    travelMode: "DRIVING",
    origin: "",
    destination: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setBookingDetails((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = () => {
    // console.log("Location: ", location);
    const { source, destination } = location;

    initMap();

    // Initialize and add the map
    var map;
    function initMap() {
      // The map, centered on Central Park
      const center = { lat: 40.774102, lng: -73.971734 };
      const options = { zoom: 15, scaleControl: true, center: center };
      map = new google.maps.Map(mapRef?.current!, options);

      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map); // Existing map object displays directions
      // Create route from existing points used for markers
      const route = {
        origin: source,
        destination: destination,
        travelMode: google?.maps?.TravelMode?.DRIVING,
      };

      directionsService.route(route, function (response, status) {
        // anonymous function to capture directions
        if (status !== "OK") {
          window.alert("Directions request failed due to " + status);
          return;
        } else {
          directionsRenderer.setDirections(response); // Add route to the map
          var directionsData = response?.routes[0]?.legs[0]; // Get data about the mapped route
          if (!directionsData) {
            window.alert("Directions request failed");
            return;
          } else {
            setBookingDetails((state) => ({
              ...state,
              distance: directionsData?.distance?.value || 0,
              duration: directionsData?.duration?.value || 0,
            }));

            dispatch(
              addBooking({
                ...bookingDetails,
                tripType: tripType,
                distance: directionsData?.distance?.value,
                duration: directionsData?.duration?.value,
              })
            );
            navigate("/cab-booking");
          }
        }
      });
    }
  };

  React.useEffect(() => {
    if (sourceInpRef.current) {
      const defaultBounds1 = new google.maps.LatLngBounds();

      const sourceAddress = new google.maps.places.Autocomplete(
        sourceInpRef.current,
        { types: ["(cities)"], bounds: defaultBounds1 }
      );

      sourceAddress.addListener("place_changed", function () {
        // Get place info
        const place = sourceAddress.getPlace();
        // console.log("addr source: ", place);
        setBookingDetails((state) => ({
          ...state,
          source: place?.formatted_address!,
        }));
        // Do whatever with the value!
        const { lat, lng } = place?.geometry?.location!;
        setLocation((state) => ({
          ...state,
          source: { lat: lat(), lng: lng() },
        }));
      });
    }
    if (destinationInpRef.current) {
      var defaultBounds2 = new google.maps.LatLngBounds();

      const destinationAddress = new google.maps.places.Autocomplete(
        destinationInpRef.current,
        { types: ["(cities)"], bounds: defaultBounds2 }
      );
      destinationAddress.addListener("place_changed", function () {
        var place2 = destinationAddress.getPlace();
        // console.log("add desti: ", place2);

        setBookingDetails((state) => ({
          ...state,
          destination: place2?.formatted_address!,
        }));
        // Do whatever with the value!
        const { lat, lng } = place2?.geometry?.location!;
        setLocation((state) => ({
          ...state,
          destination: { lat: lat(), lng: lng() },
        }));
      });
    }
  }, []);

  const { source, destination, pickupDate, pickupTime, dropDate } =
    bookingDetails;
  return (
    <>
      <div ref={mapRef}></div>

      <LocalizationProvider dateAdapter={DateAdapter}>
        <Grid
          container
          spacing={1}
          sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
            padding: 3,
            alignItems: "center",
            boxShadow: "2px 2px 3px #666",
          }}
        >
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Source"
              name="source"
              type="search"
              value={source}
              onChange={handleChange}
              sx={{ backgroundColor: "#fff" }}
              inputRef={sourceInpRef}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              inputRef={destinationInpRef}
              fullWidth
              sx={{ backgroundColor: "#fff" }}
              variant="outlined"
              label="Desination"
              name="destination"
              type="search"
              value={destination}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={tripType == 2 ? 2 : 3}>
            <DateTimePicker
              label="Pickup Date"
              value={pickupDate}
              onChange={(val: any) =>
                setBookingDetails({ ...bookingDetails, pickupDate: val })
              }
              renderInput={(params) => (
                <TextField {...params} style={{ backgroundColor: "#fff" }} />
              )}
            />
          </Grid>

          {tripType == 2 && (
            <Grid item xs={12} md={2}>
              <DateTimePicker
                label="Drop Date"
                value={dropDate}
                onChange={(val: any) =>
                  setBookingDetails({ ...bookingDetails, dropDate: val })
                }
                renderInput={(params) => (
                  <TextField {...params} style={{ backgroundColor: "#fff" }} />
                )}
              />
            </Grid>
          )}
          <Grid item xs={12} md={2}>
            <Button onClick={handleSubmit} variant="contained">
              Book
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
};

interface IBookingFormProps {}

const BookingForm: React.FunctionComponent<IBookingFormProps> = (props) => {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Container sx={{ marginTop: 2 }}>
      <Box
        sx={{
          position: "relative",
          top: "-100px",
          background: "darkseagreen",
          zIndex: 9,
          boxShadow: "0 0 6px 1px #555",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="One Way" {...a11yProps(0)} />
            <Tab label="Round Trip" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <BForm tripType={1} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BForm tripType={2} />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default BookingForm;
