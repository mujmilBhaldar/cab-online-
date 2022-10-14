import { lazy } from "react";
import RouteModel from "../models/RouteModel";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UserIcon from "@mui/icons-material/People";
import CustomerIcon from "@mui/icons-material/People";
import BookingIcon from "@mui/icons-material/Book";
import CabIcon from "@mui/icons-material/CarRental";

const Dashboard = lazy(() => import("../../features/admin/dashboard"));
const User = lazy(() => import("../../features/admin/user"));
const Customer = lazy(() => import("../../features/admin/customer"));
const Booking = lazy(() => import("../../features/admin/booking"));
const Cabs = lazy(() => import("../../features/admin/cabs"));
const PageNotFound = lazy(() => import("../../ui/page-not-found/PageNotFound"));

const routes: RouteModel[] = [
  {
    path: "",
    label: "Dashboard",
    component: <Dashboard />,
    showInMenu: true,
    role: "admin",
    icon: <DashboardIcon />,
  },
  {
    path: "user",
    label: "Users",
    component: <User />,
    showInMenu: true,
    role: "admin",
    icon: <UserIcon />,
  },
  {
    path: "customer",
    label: "Customers",
    component: <Customer />,
    showInMenu: true,
    role: "admin",
    icon: <CustomerIcon />,
  },
  {
    path: "bookings",
    label: "Bookings",
    component: <Booking />,
    showInMenu: true,
    role: "admin",
    icon: <BookingIcon />,
  },
  {
    path: "cabs",
    label: "Cabs",
    component: <Cabs />,
    showInMenu: true,
    role: "admin",
    icon: <CabIcon />,
  },
  {
    path: "*",
    label: "Page Not Found",
    component: <PageNotFound />,
    showInMenu: false,
    role: "all",
  },
];

export default routes;
