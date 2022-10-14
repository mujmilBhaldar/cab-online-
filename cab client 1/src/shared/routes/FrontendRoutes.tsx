import { lazy } from "react";
import RouteModel from "../models/RouteModel";

const PageNotFound = lazy(() => import("../../ui/page-not-found/PageNotFound"));
const Home = lazy(() => import("../../features/frontend/home"));
const About = lazy(() => import("../../features/frontend/about"));
const Packages = lazy(() => import("../../features/frontend/packages"));
const Tarrif = lazy(() => import("../../features/frontend/tarrif"));
const Contact = lazy(() => import("../../features/frontend/contact"));
const Login = lazy(() => import("../../features/frontend/login/Login"));
const CabBooking = lazy(() => import("../../features/frontend/cab-booking"));
const BookingDetails = lazy(
  () => import("../../features/frontend/cab-booking/BookingDetails")
);
const ForgotPassword = lazy(
  () => import("../../features/frontend/forgot-password")
);

const routes: RouteModel[] = [
  {
    path: "",
    component: <Home />,
    showInMenu: true,
    label: "Home",
  },
  {
    path: "about",
    component: <About />,
    showInMenu: true,
    label: "About",
  },
  {
    path: "packages",
    component: <Packages />,
    showInMenu: true,
    label: "Packages",
  },
  {
    path: "tarrif",
    component: <Tarrif />,
    showInMenu: true,
    label: "Tarrif",
  },
  {
    path: "contact",
    component: <Contact />,
    showInMenu: true,
    label: "Contact",
  },
  {
    path: "login",
    component: <Login />,
    showInMenu: true,
    label: "Login",
  },
  {
    path: "cab-booking",
    component: <CabBooking />,
    showInMenu: false,
    label: "Cab Booking",
  },
  {
    path: "booking-details",
    component: <BookingDetails />,
    showInMenu: false,
    label: "Cab Booking",
  },
  {
    path: "forgot-password/*",
    component: <ForgotPassword />,
    showInMenu: false,
    label: "Forgot Password",
  },
  {
    path: "*",
    component: <PageNotFound />,
    showInMenu: false,
    label: "Page Not Found",
  },
];

export default routes;
