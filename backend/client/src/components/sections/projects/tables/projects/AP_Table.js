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
  return { _id:id, projectName: name, dueDate: date, projectDetails: details, companyName: createdBy, percentComplete:0, ownerName:name, enabled: "true", updated:update,delete:del};
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
    { id: 'projectName', label: 'Project Name' },
    { id: 'approved', label: 'Approved' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'projectDetails', label: 'Project Details'},
    { id: 'companyName', label: 'Company Name'},
    { id: 'percentComplete', label: 'Progress'},
    { id: 'ownerName', label: 'Owner'},
    { id: 'enabled', label: 'Enable', disableSorting: true },
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
  return prop.getAllProjects({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}
const getDropdownList = (prop) => {
  return prop.getAllCompanies({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}


export default function AP_Table(props) {

  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
  const [data, setData] = React.useState(rows);
  const [list, setList] = React.useState([]);
  const [company, setCompany] = React.useState("");
  const [allCompanies, setAllCompanies] = React.useState([]);
  const [recordForEdit, setRecordForEdit] = React.useState(null);
  const [openEditPopup, setOpenEditPopup] = React.useState(false);
  const [openRegPopup, setOpenRegPopup] = React.useState(false);
  const [records, setRecords] = React.useState(data);
  const classes = useStyles();

  React.useEffect(async () => {
    const d = await getDropdownList(props);
    setAllCompanies(d.data);
    var complist = d.data.map(function(item) {
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

    setList(selList);
  },[]);

  React.useEffect(async () => {
    const d = await getData(props);

    setData(d.data);
    setRecords(d.data);
    setFilterFn({
        fn: items => {
            if (company == "")
                return items.filter(x => x.approved.includes("approved"));
            else
                return items.filter(x => x.companyName.includes(company) && x.approved.includes("approved"));
        }
    })
  },[notify, list]);


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
                return items.filter(x => x.approved.includes("approved"));
            else
                return items.filter(x => x.projectName.toLowerCase().includes(target.value.toLowerCase()) && x.approved.includes("approved"));
        }
    })
  }
  const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
    });

  const handleChange = (event) => {
    let val = event.target;

    setCompany(val.value);
    setFilterFn({
        fn: items => {
            if (val.value == "")
                return items.filter(x =>  x.approved.includes("approved"));
            else
                return items.filter(x => x.companyName.includes(val.value) && x.approved.includes("approved"));
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

    props.registerProject(input, props.history);
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
        projectID: og_id,
        auth: props.auth.isAuthenticated
      },
      body: data
    };

    if(props.auth.user.role === "admin"){
      props.updateProject(input, props.history);
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

  const handleSwitch = (val, row) => {

      if(val== true)
        changeEnable("true",row);
      if(val == false)
        changeEnable("false",row);
  };

  const changeEnable = (value, og) => {

    const input = {
      params: {
        email: props.auth.user.email,
        projectID: og._id,
        auth: props.auth.isAuthenticated
      },
      body: {
      enabled: value
      }
    };

    const c_input = {
      params: {
        email: props.auth.user.email,
        idupdate: og.companyID,
        auth: props.auth.isAuthenticated
      },
      body: {
      enabled: value
      }
    };

    if(value === "true"){
      props.updateCompany(c_input, props.history);
    }
    props.updateProject(input, props.history);
    props.updateAllFeatures(input, props.history);
    props.updateAllTasks(input, props.history);
    setNotify({
      isOpen: true,
      message: "Success.",
      type: 'success'
    });
  }

  const onDelete = project => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })

    const input = {
      projectID: project._id,
      email: props.auth.user.email,
      auth: props.auth.isAuthenticated
    };


    if(props.auth.user.role === "admin"){
      props.deleteProject(input, props.history);
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: 'success'
      });

    }
  }

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
    var d = date.toString();

    d = d.substring(0, d.indexOf('T'));
    return d;
  }


  return (
    <React.Fragment>
    <Paper className={classes.pageContent}>
      <Toolbar>
        <Grid container>
          <Grid item xs={7}>
            <Input
                label="Search Projects"
                className={classes.searchInput}
                InputProps={{
                    startAdornment: (<InputAdornment position="start">
                        <Search />
                    </InputAdornment>)
                }}
                onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-company-native-simple">Company</InputLabel>
              <Select
                native
                value={state.age}
                onChange={handleChange}
                label="Company"
                inputProps={{
                  name: 'company',
                  id: 'outlined-company-native-simple',
                }}
              >{list.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
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
                <TableCell backgroundColor = "primary">{row.projectName}</TableCell>
                <TableCell>{approvedIcon(row.approved)}</TableCell>
                <TableCell>{dateToString(row.dueDate)}</TableCell>
                <TableCell>{row.projectDetails}</TableCell>
                <TableCell>{row.companyName}</TableCell>
                <TableCell>  <CircularProgressWithLabel value={row.percentComplete} /></TableCell>
                <TableCell>{row.ownerName}</TableCell>
                <TableCell>
                  <Switch
                    onChange={(e,val)=>handleSwitch(val, row)}
                    color="primary"
                    name="checked"
                    checked={(row.enabled==="true")}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </TableCell>
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
    </Paper>
      <Popup
        title="Edit Project Details"
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
      >
        <UpdateForm {...props}
            recordForEdit={recordForEdit}
            edit={edit} />
      </Popup>
      <Popup
        title="Register New Project"
        openPopup={openRegPopup}
        setOpenPopup={setOpenRegPopup}
      >
        <RegisterForm {...props} create={create} company={company} allCompanies = {allCompanies}/>
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
