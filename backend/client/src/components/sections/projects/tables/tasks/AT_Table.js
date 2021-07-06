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
import UpdateForm from "../../forms/updateTaskForm"
import UseTable from "../../../useTable"
import RegisterForm from "../../forms/registerTaskForm"
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
// Generate Order Data
function createData(id ,name, date, details, createdBy, update,del) {
  return { _id:id, taskName: name, dueDate: date, taskDetails: details, creatorName: createdBy, updated:update,delete:del};
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
}))

const headCells = [
    { id: 'taskName', label: 'Task Name' },
    { id: 'startDate', label: 'Start Date' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'ownerName', label: 'ownerName' },
    { id: 'taskDetails', label: 'Task Details'},
    { id: 'featureName', label: 'Milestone Name'},
    { id: 'percentComplete', label: 'Progress'},
    { id: 'update', label: 'Update', disableSorting: true },
    { id: 'delete', label: 'Delete', disableSorting: true }
];

const rows = [
  createData("", "", "", "","","","")
];

function preventDefault(event) {
  event.preventDefault();
}

const getData = (prop) => {
  return prop.getAllTasks({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}
const getDropdownList = (prop) => {
  return prop.getAllFeatures({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}

const getProjectList = (prop) => {
  return prop.getAllProjects({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}

const getCompanyList = (prop) => {
  return prop.getAllCompanies({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}

export default function AT_Table(props) {

  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
  const [data, setData] = React.useState(rows);
  const [list, setList] = React.useState([]);
  const [pList, setPList] = React.useState([]);
  const [cList, setCList] = React.useState([]);
  const [allFeatures, setAllFeatures] = React.useState([]);
  const [allProjects, setAllProjects] = React.useState([]);
  const [allCompanies, setAllCompanies] = React.useState([]);
  const [feature, setFeature] = React.useState("");
  const [project, setProject] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [recordForEdit, setRecordForEdit] = React.useState(null);
  const [openEditPopup, setOpenEditPopup] = React.useState(false);
  const [openRegPopup, setOpenRegPopup] = React.useState(false);
  const [records, setRecords] = React.useState(data);
  const classes = useStyles();

  React.useEffect(async () => {
    const tasks = await getData(props);
    setData(tasks.data);
    setRecords(tasks.data);

    const comp = await getCompanyList(props);
    setAllCompanies(comp.data);

    const proj = await getProjectList(props);
    setAllProjects(proj.data);

    const feat = await getDropdownList(props);
    setAllFeatures(feat.data);

    setFilterFn({
        fn: items => {
            if (feature == "")
                return items.filter(x => x.enabled.includes("true"));
            else
                return items.filter(x => (x.featureName === feature) && x.enabled.includes("true"))
        }
    })
  },[notify]);


  React.useEffect( () => {

    var complist = allCompanies.map(function(item) {
      if(item.enabled === "true")
        return item.companyName;
      else
        return "0"
    });
    var j;
    var len = 0;
    var trimlist = [];
    for(j=0; j<complist.length; j++) {
      if(complist[j] !== "0"){
        trimlist[len++] = complist[j];
      }
    }
    var selList = [];
    var i;
    selList[0] = {key:0, item: ""};
    for(i=0; i<len; i++) {
      selList[i+1] = {key:i+1, item: trimlist[i]};
    }
    setCList(selList);
  },[allCompanies]);


  React.useEffect( () => {
    var complist = allProjects.map(function(item) {
      if (company === "") {
        if(item.enabled === "true" && item.approved === "approved")
          return item.projectName;
        else
          return "0"
      }
      else {
        if(item.enabled === "true" && item.approved === "approved" && item.companyName === company)
          return item.projectName;
        else
          return "0"
      }

    });
    var j;
    var len = 0;
    var trimlist = [];
    for(j=0; j<complist.length; j++) {
      if(complist[j] !== "0"){
        trimlist[len++] = complist[j];
      }
    }
    var selList = [];
    var i;
    selList[0] = {key:0, item: ""};
    for(i=0; i<len; i++) {
      selList[i+1] = {key:i+1, item: trimlist[i]};
    }
    setPList(selList);
  },[allProjects, company]);


  React.useEffect( () => {
    var complist = allFeatures.map(function(item) {
      if (project === "") {
        if(item.enabled === "true")
          return item.featureName;
        else
          return "0"
      }
      else {
        if(item.enabled === "true" && item.projectName === project)
          return item.featureName;
        else
          return "0"
      }
    });

    var j;
    var len = 0;
    var trimlist = [];
    for(j=0; j<complist.length; j++) {
      if(complist[j] !== "0"){
        trimlist[len++] = complist[j];
      }
    }
    var selList = [];
    var i;
    selList[0] = {key:0, item: ""};
    for(i=0; i<len; i++) {
      selList[i+1] = {key:i+1, item: trimlist[i]};
    }

    setList(selList);
  },[allFeatures, project]);

  React.useEffect(async () => {
    const d = await getData(props);
    var tasks = d.data.map(function(item) {
      return ({fID: item.featureID, progress:item.percentComplete});
    });
    var i;
    var j;
    var k;
    var sum = [];
    var labels = [];
    for (i=0; i<tasks.length; i++) {
      labels[i] = tasks[i].fID;
    }
    var unique = labels.filter((v, i, a) => a.indexOf(v) === i);
    var featureProgress = [];
    var count = 0;
    for (j=0; j<unique.length; j++) {
      sum[j] = 0;
      count = 0;
      for(k=0; k<tasks.length; k++){
        if (tasks[k].fID.includes(unique[j])){
          sum[j] = sum[j] + tasks[k].progress;
          count++;
        }
      }

      featureProgress[j] = {featureID:unique[j], percentComplete: (sum[j]/count)};
    }
    var input;

    for(i=0; i<featureProgress.length; i++){
      input = {
        params: {
          email: props.auth.user.email,
          featureID: featureProgress[i].featureID,
          auth: props.auth.isAuthenticated
        },
        body: {
          percentComplete: featureProgress[i].percentComplete
        }
      };
      props.updateFeature(input, props.history);
    }

  },[notify, data]);

  React.useEffect(async () => {
    const d = await getDropdownList(props);
    var features = d.data.map(function(item) {
      return ({pID: item.projectID, progress:item.percentComplete});
    });
    var i;
    var j;
    var k;
    var sum = [];
    var labels = [];
    for (i=0; i<features.length; i++) {
      labels[i] = features[i].pID;
    }
    var unique = labels.filter((v, i, a) => a.indexOf(v) === i);
    var projectProgress = [];
    var count = 0;
    for (j=0; j<unique.length; j++) {
      sum[j] = 0;
      count = 0;
      for(k=0; k<features.length; k++){
        if (features[k].pID.includes(unique[j])){
          sum[j] = sum[j] + features[k].progress;
          count++;
        }
      }
      projectProgress[j] = {projectID:unique[j], percentComplete: (sum[j]/count)};
    }
    var input;

    for(i=0; i<projectProgress.length; i++){
      input = {
        params: {
          email: props.auth.user.email,
          projectID: projectProgress[i].projectID,
          auth: props.auth.isAuthenticated
        },
        body: {
          percentComplete: projectProgress[i].percentComplete
        }
      };
      props.updateProject(input, props.history);
    }

  },[notify, allFeatures]);


  const {
          TblContainer,
          TblHead,
          TblPagination,
          recordsAfterPagingAndSorting
      } = UseTable(records, headCells, filterFn);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value == "")
                return items.filter(x => x.enabled.includes("true"));
            else
                return items.filter(x => x.taskName.toLowerCase().includes(target.value.toLowerCase()) && x.enabled.includes("true"))
        }
    })
  }
  const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
    });

  const handleFeatureChange = (event) => {
    let val = event.target;

    setFeature(val.value);
    setFilterFn({
        fn: items => {
            if (val.value == "")
                return items.filter(x => x.enabled.includes("true"));
            else
                return items.filter(x => (x.featureName === val.value) && x.enabled.includes("true"))
        }
    })
  };

  const handleProjectChange = (event) => {
    let val = event.target;

    setProject(val.value);
    setFilterFn({
        fn: items => {
            if (val.value == "")
                return items.filter(x => x.enabled.includes("true"));
            else
                return items.filter(x => (x.projectName === val.value) && x.enabled.includes("true"))
        }
    })
  };

  const handleCompanyChange = (event) => {
    let val = event.target;

    setCompany(val.value);
    setFilterFn({
        fn: items => {
            if (val.value == "")
                return items.filter(x => x.enabled.includes("true"));
            else
                return items.filter(x => (x.companyName === val.value) && x.enabled.includes("true"))
        }
    })
  };

  const openInEditPopup = item => {
    setRecordForEdit(item);
    setOpenEditPopup(true);
  }

  const openInRegPopup = item => {

    setOpenRegPopup(true);
  }

  const create = (data, resetForm) => {
    const input = {
      params: {
        email: props.auth.user.email,
        auth: props.auth.isAuthenticated
      },
      body: data
    };

    props.registerTask(input, props.history);
    resetForm();
    setOpenRegPopup(false);
    setNotify({
      isOpen: true,
      message: "Registered Successfully.",
      type: 'success'
    });
  }
  const edit = (data, resetForm, og_id) => {

    const input = {
      params: {
        email: props.auth.user.email,
        taskID: og_id,
        auth: props.auth.isAuthenticated
      },
      body: data
    };

    if(props.auth.user.role === "admin"){
      props.updateTask(input, props.history);
      resetForm();
      setRecordForEdit(null);
      setOpenEditPopup(false);
      setNotify({
        isOpen: true,
        message: "Update Successfully",
        type: 'success'
      });
    }
  }

  const onDelete = task => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })

    const input = {
      taskID: task._id,
      email: props.auth.user.email,
      auth: props.auth.isAuthenticated
    };


    if(props.auth.user.role === "admin"){
      props.deleteTask(input, props.history);
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: 'success'
      });

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


  return (
    <React.Fragment>
      <Toolbar>
      <Grid container>
        <Grid item xs={12}>
          <Input
              label="Search Tasks"
              className={classes.searchInput}
              InputProps={{
                  startAdornment: (<InputAdornment position="start">
                      <Search />
                  </InputAdornment>)
              }}
              onChange={handleSearch}
              />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-company-native-simple">Company</InputLabel>
              <Select
                native
                value={state.age}
                onChange={handleCompanyChange}
                label="Company"
                inputProps={{
                  name: 'company',
                  id: 'outlined-company-native-simple',
                }}
              >{cList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-project-native-simple">Project</InputLabel>
              <Select
                native
                value={state.age}
                onChange={handleProjectChange}
                label="Project"
                inputProps={{
                  name: 'project',
                  id: 'outlined-project-native-simple',
                }}
              >{pList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-feature-native-simple">Milestone</InputLabel>
              <Select
                native
                value={state.age}
                onChange={handleFeatureChange}
                label="Milestone"
                inputProps={{
                  name: 'feature',
                  id: 'outlined-feature-native-simple',
                }}
              >{list.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button
                text="Add New"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => { setOpenRegPopup(true); }}
            />
          </Grid>
        </Grid>
      </Toolbar>
      <TblContainer>
        <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map(row =>
              (<TableRow key={row._id}>
                <TableCell backgroundColor = "primary">{row.taskName}</TableCell>
                <TableCell>{dateToString(row.startDate)}</TableCell>
                <TableCell>{dateToString(row.dueDate)}</TableCell>
                <TableCell>{row.ownerName}</TableCell>
                <TableCell>{row.taskDetails}</TableCell>
                <TableCell>{row.featureName}</TableCell>
                <TableCell>  <CircularProgressWithLabel value={row.percentComplete} /></TableCell>
                <TableCell>
                  <ActionButton
                    color="light"
                    onClick={() => { openInEditPopup(row) }}>
                    <EditOutlinedIcon fontSize="small" />
                  </ActionButton>
                </TableCell>
                <TableCell>
                  <ActionButton
                    color="light"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => { onDelete(row) }
                      })
                    }}>
                    <CloseIcon fontSize="small" />
                  </ActionButton>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <Popup
        title="Edit Task Details"
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
      >
        <UpdateForm
            recordForEdit={recordForEdit}
            edit={edit} />
      </Popup>
      <Popup
        title="Register New Task"
        openPopup={openRegPopup}
        setOpenPopup={setOpenRegPopup}
      >
        <RegisterForm {...props} create={create} feature={feature} allFeatures={allFeatures}/>
      </Popup>
      <Notification
               notify={notify}
               setNotify={setNotify}
           />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </React.Fragment>
  );
}
