import React from 'react';
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import Collapse from '@material-ui/core/Collapse';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import BlockIcon from '@material-ui/icons/Block';
import CancelIcon from '@material-ui/icons/Cancel';
import ContactsIcon from '@material-ui/icons/Contacts';
import BusinessIcon from '@material-ui/icons/Business';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const SuperAdminListItems = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
  <div>
    <ListItem button component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/projects" onClick={handleClick}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Projects" />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/CompletedProjects" className={classes.nested}>
            <ListItemIcon>
                <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Completed" />
          </ListItem>
        </List>
      </Collapse>
    <ListItem button component={Link} to="/approval">
      <ListItemIcon>
        <CheckCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Approval" />
    </ListItem>
    <ListItem button component={Link} to="/rejection">
      <ListItemIcon>
        <CancelIcon />
      </ListItemIcon>
      <ListItemText primary="Rejection" />
    </ListItem>
    <ListItem button component={Link} to="/companies">
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Companies" />
    </ListItem>
    <ListItem button component={Link} to="/investments">
      <ListItemIcon>
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Investments" />
    </ListItem>
    <ListItem button component={Link} to="/vendors">
      <ListItemIcon>
        <ContactsIcon />
      </ListItemIcon>
      <ListItemText primary="Vendors" />
    </ListItem>
    <ListItem button component={Link} to="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
  </div>
)};

export const AdminListItems = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
  <div>
    <ListItem button component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/projects" onClick={handleClick}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Projects" />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/CompletedProjects" className={classes.nested}>
            <ListItemIcon>
                <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Completed" />
          </ListItem>
        </List>
      </Collapse>
    <ListItem button component={Link} to="/approval">
      <ListItemIcon>
        <CheckCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Approval" />
    </ListItem>
    <ListItem button component={Link} to="/rejection">
      <ListItemIcon>
        <CancelIcon />
      </ListItemIcon>
      <ListItemText primary="Rejection" />
    </ListItem>
    <ListItem button component={Link} to="/investments">
      <ListItemIcon>
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Investments" />
    </ListItem>
    <ListItem button component={Link} to="/vendors">
      <ListItemIcon>
        <ContactsIcon />
      </ListItemIcon>
      <ListItemText primary="Vendors" />
    </ListItem>
    <ListItem button component={Link} to="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
  </div>
)};

export const SupervisorListItems = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
  <div>
    <ListItem button component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/projects" onClick={handleClick}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Projects" />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/CompletedProjects" className={classes.nested}>
            <ListItemIcon>
                <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Completed" />
          </ListItem>
        </List>
      </Collapse>
    <ListItem button component={Link} to="/rejection">
      <ListItemIcon>
        <CancelIcon />
      </ListItemIcon>
      <ListItemText primary="Rejection" />
    </ListItem>
    <ListItem button component={Link} to="/investments">
      <ListItemIcon>
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Investments" />
    </ListItem>
    <ListItem button component={Link} to="/vendors">
      <ListItemIcon>
        <ContactsIcon />
      </ListItemIcon>
      <ListItemText primary="Vendors" />
    </ListItem>
    <ListItem button component={Link} to="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
  </div>
)};
