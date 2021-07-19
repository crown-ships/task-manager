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
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import ActionButton from "../../../../controls/ActionButton"
import Button from "../../../../controls/Button"
import Input from "../../../../controls/Input"
import ConfirmDialog from "../../../../elements/ConfirmDialog"
import Notification from "../../../../elements/Notification"
import Popup from "../../../../elements/Popup"
import UpdateForm from "../../forms/updateVendorForm"
import UseTable from "../../../useTable"
import RegisterForm from "../../forms/registerVendorForm"
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
// Generate Order Data
function createData() {
  return {
    _id:"",
    vendorName: "",
    vendorEmail: "",
    contactNo: "",
    contractAmt: "",
    startDate: "",
    endDate:"",
    pendingAmt:'',
    approved: ""
  }
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
    { id: 'vendorName', label: 'Vendor Name' },
    { id: 'approved', label: 'Approved' },
    { id: 'endDate', label: 'End Date' },
    { id: 'contractAmt', label: 'Contract Amount' },
    { id: 'enabled', label: 'Enable', disableSorting: true },
    { id: 'update', label: 'Update', disableSorting: true },
    { id: 'delete', label: 'Delete', disableSorting: true }
];

const rows = [
  createData()
];

function preventDefault(event) {
  event.preventDefault();
}

const getData = (prop) => {
  return prop.getAllVendors({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}

export default function AV_Table(props) {
  console.log(rows);
  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
  const [data, setData] = React.useState(rows);
  const [recordForEdit, setRecordForEdit] = React.useState(null);
  const [openEditPopup, setOpenEditPopup] = React.useState(false);
  const [openRegPopup, setOpenRegPopup] = React.useState(false);
  const [records, setRecords] = React.useState(data);
  const classes = useStyles();


  React.useEffect(async () => {
    const d = await getData(props);
        console.log(d.data);
    setData(d.data);
    setRecords(d.data);
    setFilterFn({
        fn: items => {
                return items.filter(x => x.approved.includes("approved"))
        }
    })
  },[notify]);

  console.log(data);
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
                return items.filter(x => x.vendorName.toLowerCase().includes(target.value.toLowerCase()))
        }
    })
  }

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
    props.registerVendor(input, props.history);
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
        vendorID: og_id,
        auth: props.auth.isAuthenticated
      },
      body: data
    };

    if(props.auth.user.role === "admin" || props.auth.user.role === "super-admin"){
      props.updateVendor(input, props.history);
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
    console.log(val);
      if(val== true)
        changeEnable("true", row._id);
      if(val == false)
        changeEnable("false", row._id);
  };

  const changeEnable = (value, og_id) => {
    const input = {
      params: {
        email: props.auth.user.email,
        vendorID: og_id,
        auth: props.auth.isAuthenticated
      },
      body: {
      enabled: value
      }
    };

    const p_input = {
      params: {
        email: props.auth.user.email,
        vendorID: og_id,
        auth: props.auth.isAuthenticated
      },
      body: {
        enabled: value
      }
    };
    props.updateVendor(input, props.history);
    props.updateAllPayments(p_input, props.history);
    setNotify({
      isOpen: true,
      message: "Success.",
      type: 'success'
    });
  }

  const onDelete = vendor => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })

    const input = {
      vendorID: vendor._id,
      email: props.auth.user.email,
      auth: props.auth.isAuthenticated
    };


    if(props.auth.user.role === "admin"){
      props.deleteVendor(input, props.history);
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

  const approvedIcon = (status) => {

    if (status === "approved") {
      console.log(status);
      console.log("yes");
      return <CheckCircleIcon fontSize="small" style={{ color: "#00b386" }}/>
    }
    else if (status === "wait") {
      console.log("what");
      return <HelpIcon fontSize="small"  style={{ color: "#ffbf00" }}/>
    }
    else if (status === "rejected") {
      console.log("what");
      return <CancelIcon fontSize="small"  style={{ color: "#DC143C" }}/>
    }
  }

  return (
    <React.Fragment>
      <Toolbar>
        <Grid container>
          <Grid item xs={9}>
            <Input
                label="Search Vendors"
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
                <TableCell>{row.vendorName}</TableCell>
                <TableCell>{approvedIcon(row.approved)}</TableCell>
                <TableCell>{dateToString(row.endDate)}</TableCell>
                <TableCell>{row.contractAmt}</TableCell>
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

      <Popup
        title="Edit Vendor Details"
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
      >
        <UpdateForm {...props}
            recordForEdit={recordForEdit}
            edit={edit} />
      </Popup>
      <Popup
        title="Register New Vendor"
        openPopup={openRegPopup}
        setOpenPopup={setOpenRegPopup}
      >
        <RegisterForm {...props} create={create} />
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
