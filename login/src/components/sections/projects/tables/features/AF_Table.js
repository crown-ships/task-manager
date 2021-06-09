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
import UpdateForm from "../../forms/updateFeatureForm"
import UseTable from "../../../useTable"
import RegisterForm from "../../forms/registerFeatureForm"
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// Generate Order Data
function createData(id ,name, date, details, createdBy, update,del) {
  return { _id:id, featureName: name, dueDate: date, featureDetails: details, creatorName: createdBy, updated:update,delete:del};
}

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
    { id: 'featureName', label: 'Task Name' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'creatorName', label: 'Creator' },
    { id: 'featureDetails', label: 'Task Details'},
    { id: 'companyName', label: 'Company Name'},
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
  return prop.getAllFeatures({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
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
  const [recordForEdit, setRecordForEdit] = React.useState(null);
  const [openEditPopup, setOpenEditPopup] = React.useState(false);
  const [openRegPopup, setOpenRegPopup] = React.useState(false);
  const [records, setRecords] = React.useState(data);
  const classes = useStyles();

  React.useEffect(async () => {
    const d = await getDropdownList(props);
    var complist = d.data.map(function(item) {
      if(item.enabled === "true")
        return item.companyName;
      else
        return "0"
    });
    console.log(complist);
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
    console.log(selList);
    setList(selList);
  },[]);

  React.useEffect(async () => {
    const d = await getData(props);
    setData(d.data);
    setRecords(d.data);
    console.log(d.data);
    setFilterFn({
        fn: items => {
            if (company == "")
                return items;
            else
                return items.filter(x => x.companyName.includes(company) && x.approved.includes("approved"))
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
                return items;
            else
                return items.filter(x => x.featureName.toLowerCase().includes(target.value.toLowerCase()))
        }
    })
  }
  const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
    });

  const handleChange = (event) => {
    let val = event.target;
    console.log(val.value);
    setCompany(val.value);
    setFilterFn({
        fn: items => {
            if (val.value == "")
                return items;
            else
                return items.filter(x => x.companyName.includes(val.value) && x.approved.includes("approved"))
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
    console.log(input);
    props.registerFeature(input, props.history);
    resetForm();
    setOpenRegPopup(false);
    setNotify({
      isOpen: true,
      message: "Registered Successfully.",
      type: 'success'
    });
  }
  const edit = (data, resetForm, og_featureName) => {

    const input = {
      params: {
        email: props.auth.user.email,
        featureName: og_featureName,
        auth: props.auth.isAuthenticated
      },
      body: data
    };

    if(props.auth.user.role === "admin"){
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
  }

  const onDelete = feature => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })

    const input = {
      featureName: feature.featureName,
      email: props.auth.user.email,
      auth: props.auth.isAuthenticated
    }


    if(props.auth.user.role === "admin"){
      props.deleteFeature(input, props.history);
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: 'success'
      });

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
                disabled = {(company==="")}
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
                <TableCell backgroundColor = "primary">{row.featureName}</TableCell>
                <TableCell>{dateToString(row.dueDate)}</TableCell>
                <TableCell>{row.creatorName}</TableCell>
                <TableCell>{row.featureDetails}</TableCell>
                <TableCell>{row.companyName}</TableCell>
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
        title="Edit Feature Details"
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
      >
        <UpdateForm
            recordForEdit={recordForEdit}
            edit={edit} />
      </Popup>
      <Popup
        title="Register New Feature"
        openPopup={openRegPopup}
        setOpenPopup={setOpenRegPopup}
      >
        <RegisterForm {...props} create={create} company={company}/>
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
