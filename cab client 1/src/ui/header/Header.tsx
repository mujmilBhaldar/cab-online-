import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@mui/styles";

import frontendRoute from "../../shared/routes/FrontendRoutes";
const useStyles = makeStyles({
  link: {
    color: "#fff",
    textDecoration: "none",
    marginLeft: 10,
  },
  active: {
    color: "#aaa",
  },
});

interface IMenuItem {
  to: string;
  children: any;
}

const MenuItem = ({ to, children }: IMenuItem) => {
  const classes = useStyles();
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return `${classes.link} ${isActive && classes.active}`;
      }}
    >
      {children}
    </NavLink>
  );
};

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Topper Cab
          </Typography>

          {Array.isArray(frontendRoute) &&
            frontendRoute
              .filter(({ showInMenu }) => showInMenu)
              .map(({ path, label }, i) => {
                return (
                  <MenuItem key={path + i} to={path}>
                    {label}
                  </MenuItem>
                );
              })}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
