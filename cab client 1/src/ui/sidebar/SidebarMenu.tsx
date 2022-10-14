import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import adminRoutes from "../../shared/routes/AdminRoutes";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  link: {
    color: "#000",
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
      end
    >
      {children}
    </NavLink>
  );
};

interface ISidebarMenuProps {
  open: boolean;
}

const SidebarMenu: React.FunctionComponent<ISidebarMenuProps> = ({ open }) => {
  return (
    <>
      <List>
        {adminRoutes &&
          adminRoutes
            .filter((route) => route.showInMenu)
            .map(({ path, label, icon }, index) => (
              <MenuItem key={path + index} to={path}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </MenuItem>
            ))}
      </List>
    </>
  );
};

export default SidebarMenu;
