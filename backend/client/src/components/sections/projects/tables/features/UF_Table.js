import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import {Search} from '@material-ui/icons';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
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
import UpdateForm from "../../forms/updateFeatureForm"
import UseTable from "../../../useTable"
import RegisterForm from "../../forms/registerFeatureForm"
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

function createData(id ,name, app, date, details, createdBy, update,del) {
  return { _id:id, featureName: name, approved: app ,dueDate: date, featureDetails: details, creatorName: createdBy, updated:update,delete:del};
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

const theme = createMuiTheme({
  palette: {
    green: {
      main: '#1a9c34'
    },
    yellow: {
      main: '#f5ca20'
    },
    yellow: {
      main: '#f5ca20'
    },
  },
});

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
    { id: 'featureName', label: 'Milestone Name' },
    { id: 'startDate', label: 'Start Date' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'ownerName', label: 'Owner' },
    { id: 'featureDetails', label: 'Milestone Details'},
    { id: 'projectName', label: 'Project Name'},
    { id: 'percentComplete', label: 'Progress'},
    { id: 'update', label: 'Update', disableSorting: true },
    { id: 'delete', label: 'Delete', disableSorting: true }
];

const rows = [
  createData("", "","", "", "","","","")
];

function preventDefault(event) {
  event.preventDefault();
}

const getData = (prop) => {
  return prop.getAllFeatures({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}
const getDropdownList = (prop) => {
  return prop.getAllProjects({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}

const getCompanyList = (prop) => {
  return prop.getAllCompanies({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}

export default function UF_Table(props) {

  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
  const [data, setData] = React.useState(rows);
  const [cList, setCList] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [project, setProject] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [allProjects, setAllProjects] = React.useState([]);
  const [allCompanies, setAllCompanies] = React.useState([]);
  const [recordForEdit, setRecordForEdit] = React.useState(null);
  const [openEditPopup, setOpenEditPopup] = React.useState(false);
  const [openRegPopup, setOpenRegPopup] = React.useState(false);
  const [records, setRecords] = React.useState(data);
  const classes = useStyles();

  React.useEffect(async () => {
    const d = await getData(props);
    setData(d.data);
    setRecords(d.data);

    const comp = await getCompanyList(props);
    setAllCompanies(comp.data);

    const proj = await getDropdownList(props);
    setAllProjects(proj.data);

    setFilterFn({
        fn: items => {
            if (project == "")
                return items.filter(x => x.enabled.includes("true"));
            else
                return items.filter(x => (x.projectName === project) && x.enabled.includes("true"))
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

  React.useEffect(() => {
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
    setList(selList);
  },[allProjects, company]);




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
                return items.filter(x => x.featureName.toLowerCase().includes(target.value) && x.enabled.includes("true"));
        }
    })
  }
  const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
    });

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

    props.registerFeature(input, props.history);
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
        featureID: og_id,
        auth: props.auth.isAuthenticated
      },
      body: data
    };

    props.updateFeature(input, props.history);
    resetForm();
    setRecordForEdit(null);
    setOpenEditPopup(false);
    setNotify({
      isOpen: true,
      message: "Update Successfully",
      type: 'success'
    });

  }

  const onDelete = feature => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })

    const input = {
      featureID: feature._id,
      email: props.auth.user.email,
      auth: props.auth.isAuthenticated
    };


      props.deleteFeature(input, props.history);
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: 'success'
      });


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
          <Grid item xs={4}>
            <Input
                label="Search Features"
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
                <TableCell>{row.featureName}</TableCell>
                <TableCell>{dateToString(row.startDate)}</TableCell>
                <TableCell>{dateToString(row.dueDate)}</TableCell>
                <TableCell>{row.ownerName}</TableCell>
                <TableCell>{row.featureDetails}</TableCell>
                <TableCell>{row.projectName}</TableCell>
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
        title="Edit Milestone Details"
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
      >
        <UpdateForm {...props}
            recordForEdit={recordForEdit}
            edit={edit} />
      </Popup>
      <Popup
        title="Register New Milestone"
        openPopup={openRegPopup}
        setOpenPopup={setOpenRegPopup}
      >
        <RegisterForm {...props} create={create} project={project} allProjects = {allProjects}/>
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
