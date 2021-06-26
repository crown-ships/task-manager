import React  from 'react';
import clsx from 'clsx';
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import PropTypes from "prop-types";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { mainListItems, secondaryListItems } from '../listitem';
import { logoutUser } from "../../../actions/authActions";
import { getAllCompanies } from "../../../actions/companyActions";
import { getAllProjects, deleteProject, updateProject, registerProject } from "../../../actions/projectActions";
import { getAllVendors, deleteVendor, updateVendor, registerVendor } from "../../../actions/vendorActions";
import { getAllPayments, deletePayment, updatePayment, registerPayment } from "../../../actions/paymentActions";
import { getAllInvestments, deleteInvestment, updateInvestment, registerInvestment } from "../../../actions/investmentActions";
import { getAllInvestors, deleteInvestor, updateInvestor, registerInvestor } from "../../../actions/investorActions";
import ProjectApprovalTable from "./tables/ProjectApprovalTable"
import InvestorApprovalTable from "./tables/InvestorApprovalTable"
import InvestmentApprovalTable from "./tables/InvestmentApprovalTable"
import VendorApprovalTable from "./tables/VendorApprovalTable"
import PaymentApprovalTable from "./tables/PaymentApprovalTable"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  btnstyle: {
    margin:'8px 0',
    backgroundColor: '#666bff'}
}));

function onLogoutClick(e) {
  e.preventDefault();
  this.props.logoutUser();
}

const ApprovalPage =  (props) => {

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  var itemList = "";
    if (props.auth.user.role === "user") {
      itemList = secondaryListItems;
    }
    else {
      itemList = mainListItems;
    }
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  function onLogoutClick(e) {
    e.preventDefault();
    props.logoutUser();
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Approval
          </Typography>
          <Button color="inherit" className={classes.btnstyle} onClick={onLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{itemList}</List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <AppBar position="static">
                <Tabs value={value} centered onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="Projects" {...a11yProps(0)} />
                  <Tab label="Investors" {...a11yProps(1)} />
                  <Tab label="Investments" {...a11yProps(2)} />
                  <Tab label="Vendors" {...a11yProps(3)} />
                  <Tab label="Payments" {...a11yProps(4)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <ProjectApprovalTable {...props}/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <InvestorApprovalTable {...props}/>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <InvestmentApprovalTable {...props}/>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <VendorApprovalTable {...props}/>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <PaymentApprovalTable {...props}/>
              </TabPanel>
              </Paper>
            </Grid>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>

      </main>
    </div>
  );
}

ApprovalPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
    { getAllInvestments, deleteInvestment, updateInvestment, registerInvestment, logoutUser, getAllPayments, deletePayment, updatePayment, registerPayment, getAllInvestors, deleteInvestor, updateInvestor, registerInvestor, getAllProjects, getAllCompanies, deleteProject, updateProject, registerProject, getAllVendors, deleteVendor, updateVendor, registerVendor}
)(withRouter(ApprovalPage));
