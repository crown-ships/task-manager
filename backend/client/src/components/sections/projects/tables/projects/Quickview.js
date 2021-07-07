import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import {Search} from '@material-ui/icons';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import Toolbar from '@material-ui/core/Toolbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import TableRow from '@material-ui/core/TableRow';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Switch from '@material-ui/core/Switch';
import ActionButton from "../../../../controls/ActionButton"
import Button from "../../../../controls/Button"
import Input from "../../../../controls/Input"
import ConfirmDialog from "../../../../elements/ConfirmDialog"
import Notification from "../../../../elements/Notification"
import Popup from "../../../../elements/Popup"
import UpdateForm from "../../forms/updateProjectForm"
import UseTable from "../../../useTable"
import RegisterForm from "../../forms/registerProjectForm"
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import CancelIcon from '@material-ui/icons/Cancel';
// Generate Order Data
function createData(id ,name, date, details, createdBy, update,del) {
  return { _id:id, projectID:"", featureID: "", taskName: name, dueDate: date, projectDetails: details, companyName: createdBy, featureName: name, percentComplete:0, ownerName:name, enabled: "true", updated:update,delete:del};
}

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '95%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    seeMore: {
      marginTop: theme.spacing(3),
    },
    formControl: {
    minWidth: 210,
  },
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
}))

const headCells = [
    { id: 'openDetails', label: '' },
    { id: 'featureName', label: 'Feature Name' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'percentComplete', label: 'Progress'},
    { id: 'ownerName', label: 'Owner'}
];

const rows = [
  createData("", "", "", "","","","")
];

function preventDefault(event) {
  event.preventDefault();
}

const getFeatures = (prop) => {
  return prop.getAllFeatures({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}
const getTasks = (prop) => {
  return prop.getAllTasks({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}


export default function Quickview(props) {

  const [records, setRecords] = React.useState([]);
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
  const [openT, setOpenT] = React.useState(false);
  const [emptyFeatureCount, setEmptyFeatureCount] = React.useState(0);
  const [emptyTaskCount, setEmptyTaskCount] = React.useState(0);
  const [linkedFeatures, setLinkedFeatures] = React.useState(rows);
  const [linkedTasks, setLinkedTasks] = React.useState(rows);
  const [finalFeatures, setFinalFeatures] = React.useState(rows);
  const [finalTasks, setFinalTasks] = React.useState(rows);
  const [openFeatureID, setOpenFeatureID] = React.useState("");
  const classes = useStyles();


  React.useEffect(async () => {
    const fullFeatures = await getFeatures(props);
    setFinalFeatures(fullFeatures);

    const fullTasks = await getTasks(props);
    setFinalTasks(fullTasks);
  },[]);



  React.useEffect( () => {
    setEmptyFeatureCount(0);
    const filteredFeatures = finalFeatures.data.map(function(item) {
      if(item.projectID === props.projectID) {
        return item;
      }
      else {
        return "0";
      }
    });

    var i;

    for (i=0; i<filteredFeatures.length; i++)
    {
      if(filteredFeatures[i] != "0") {
        setEmptyFeatureCount(emptyFeatureCount+1)
      }
    }
    setLinkedFeatures(filteredFeatures);

    setEmptyTaskCount(0);
    const filteredTasks = finalTasks.data.map(function(item) {
      if(item.projectID === props.projectID) {
        return item;
      }
      else {
        return "0";
      }
    });

    var j;
    for (j=0; i<filteredTasks.length; i++)
    {
      if(filteredTasks[i] != "0") {
        setEmptyTaskCount(emptyTaskCount+1)
      }
    }

    setLinkedTasks(filteredTasks);
  }, [ finalFeatures]);

  React.useEffect( () => {
    setEmptyTaskCount(0);
    const filteredTasks = finalTasks.data.map(function(item) {
      if(item.projectID === props.projectID && item.featureID === openFeatureID) {
        return item;
      }
      else {
        return "0";
      }
    });

    var j;
    for (j=0; j<filteredTasks.length; j++)
    {
      if(filteredTasks[j] != "0") {
        setEmptyTaskCount(emptyTaskCount+1)
      }
    }

    setLinkedTasks(filteredTasks);
  }, [finalTasks, openFeatureID]);


  const {
          TblContainer,
          TblHead,
          TblPagination,
          recordsAfterPagingAndSorting
      } = UseTable(linkedFeatures, headCells, filterFn);

  const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
    });

  const approvedIcon = (status) => {

    if (status === "approved") {

      return <CheckCircleIcon fontSize="small" style={{ color: "#00b386" }}/>
    }
    else if (status === "wait") {

      return <HelpIcon fontSize="small"  style={{ color: "#ffbf00" }}/>
    }
    else if (status === "rejected") {

      return <CancelIcon fontSize="small"  style={{ color: "#DC143C" }}/>
    }
  }

  const dateToString = (date) => {
    if (date != undefined) {
      var d = date.toString();
      d = d.substring(0, d.indexOf('T'));
      return d;
    }
    else {
      return "";
    }
  }

  const openTask = row => {
    setOpenT(!openT);
    setOpenFeatureID(row._id);
  }

  return (
    <React.Fragment>
      <TblContainer>
        <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map(row =>
              ( (emptyFeatureCount == 0)?null:<>
                <TableRow key={row._id} className={classes.root}>
                  <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => openTask(row)}>
                      {openT ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell >{row.featureName}</TableCell>
                  <TableCell>{dateToString(row.dueDate)}</TableCell>
                  <TableCell>  <CircularProgressWithLabel value={row.percentComplete} /></TableCell>
                  <TableCell>{row.ownerName}</TableCell>
                </TableRow>
                {(emptyTaskCount == 0)? null: <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={openT} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Table size="small" aria-label="tasks">
                          <TableHead>
                            <TableRow>
                              <TableCell>Task</TableCell>
                              <TableCell>Progress</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {linkedTasks.map((task) => ((task.taskName == undefined)? null:
                              <TableRow key={task._id}>
                                <TableCell component="th" scope="row">
                                  {(task.taskName != undefined)? task.taskName: "empty"}
                                </TableCell>
                                <TableCell><CircularProgressWithLabel value={(task.percentComplete != undefined)? task.percentComplete: 0} /></TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>}
                </>
            ))}

        </TableBody>
      </TblContainer>
      <TblPagination />
    </React.Fragment>
  );
}
