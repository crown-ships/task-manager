import React from 'react';
import {Link} from "react-router-dom"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/companies">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Companies" />
    </ListItem>
    <ListItem button component={Link} to="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
  <ListItem button component={Link} to="/dashboard">
    <ListItemIcon>
      <DashboardIcon />
    </ListItemIcon>
    <ListItemText primary="Dashboard" />
  </ListItem>
  <ListItem button component={Link} to="/profile">
    <ListItemIcon>
      <AccountCircleIcon />
    </ListItemIcon>
    <ListItemText primary="Profile" />
  </ListItem>
  <ListItem button component={Link} to="/settings">
    <ListItemIcon>
      <SettingsIcon />
    </ListItemIcon>
    <ListItemText primary="Settings" />
  </ListItem>
  </div>
);
