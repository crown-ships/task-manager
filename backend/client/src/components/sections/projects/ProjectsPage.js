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
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { SuperAdminListItems, AdminListItems, SupervisorListItems } from '../listitem';
import { logoutUser } from "../../../actions/authActions";
import { getFilteredUsers} from "../../../actions/userActions";
import { getAllCompanies, updateCompany } from "../../../actions/companyActions";
import { getAllProjects, getFilteredProjects, deleteProject, updateProject, registerProject } from "../../../actions/projectActions";
import { getAllTasks, getFilteredTasks, deleteTask, updateTask, registerTask ,updateAllTasks } from "../../../actions/taskActions";
import { getAllFeatures, getFilteredFeatures, deleteFeature, updateFeature, registerFeature, updateAllFeatures } from "../../../actions/featureActions";
import ProjectTablePicker from "./pickers/ProjectTablePicker"
import FeatureTablePicker from "./pickers/FeatureTablePicker"
import TaskTablePicker from "./pickers/TaskTablePicker"

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
      {'Copyright ?? '}
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

const ProjectsPage =  (props) => {

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var itemList = "";

  if (props.auth.user.role === "supervisor") {
    itemList = (<SupervisorListItems />);
  }
  else if (props.auth.user.role === "super-admin"){
    itemList = (<SuperAdminListItems />);
  }
  else if (props.auth.user.role === "admin"){
    itemList = (<AdminListItems />);
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
          <Grid container>
            <Grid item xs={11}>
              <img src="/mcmlogo.png" alt="MCM" height="50" width="50" />
            </Grid>
            <Grid item xs={1}>
              <Button color="inherit" className={classes.btnstyle} onClick={onLogoutClick}>
                Logout
              </Button>
            </Grid>
          </Grid>
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
                  <Tab label="Milestones" {...a11yProps(1)} />
                  <Tab label="Tasks" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <ProjectTablePicker {...props}/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <FeatureTablePicker {...props}/>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <TaskTablePicker {...props}/>
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

ProjectsPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { updateAllFeatures, getFilteredTasks, getFilteredUsers, getFilteredFeatures, updateAllTasks, updateCompany, logoutUser, getAllProjects, getAllCompanies, deleteProject,getFilteredProjects, updateProject, registerProject,getAllFeatures, deleteFeature, updateFeature, registerFeature,getAllTasks, deleteTask, updateTask, registerTask }
)(withRouter(ProjectsPage));
