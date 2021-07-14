import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
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
import ActionButton from "../../controls/ActionButton"
import Button from "../../controls/Button"
import Input from "../../controls/Input"
import ConfirmDialog from "../../elements/ConfirmDialog"
import Notification from "../../elements/Notification"
import Popup from "../../elements/Popup"
import SUpdateForm from "./Forms/SUpdateForm"
import UseTable from "../useTable"
import SRegisterForm from "./Forms/SRegisterForm"

function createData() {
  return { _id:"", name: "", email: "", role: "", createdByName: "", dateCreated: "", actions:""};
}

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    seeMore: {
      marginTop: theme.spacing(3),
    }
}))

const headCells = [
    { id: '_id', label: 'ID'},
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'role', label: 'Role' },
    { id: 'createdBy', label: 'Created By'},
    { id: 'date', label: 'Creation Date'},
    { id: 'actions', label: 'Actions', disableSorting: true }
];

const rows = [
  createData()
];

function preventDefault(event) {
  event.preventDefault();
}


const getData = (prop) => {
  const input = {
    name: '',
    role: "user",
    email:prop.auth.user.email,
    auth:prop.auth.isAuthenticated
  }
  return prop.getFilteredUsers(input, prop.history);
}


export default function UserTable(props) {

  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
  const [data, setData] = React.useState(rows);
  const [recordForEdit, setRecordForEdit] = React.useState(null);
  const [openEditPopup, setOpenEditPopup] = React.useState(false);
  const [openRegPopup, setOpenRegPopup] = React.useState(false);
  const [records, setRecords] = React.useState(data);
  const classes = useStyles();
  const cdate = ".";

  React.useEffect(async () => {
    const d = await getData(props);
    setData(d.data);
    setRecords(d.data);
  },[notify]);


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
                return items.filter(x => x.name.toLowerCase().includes(target.value))
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

  const create = (input, resetForm) => {
    props.registerUser(input, props.history);
    resetForm();
    setOpenRegPopup(false);
    setNotify({
      isOpen: true,
      message: "Registered Successfully.",
      type: 'success'
    });
  }
  const edit = (data, resetForm, og_role) => {

    const input = {
      params: {
        email: props.auth.user.email,
        emailupdate: data.email,
        auth: props.auth.isAuthenticated
      },
      body: data
    };
    if(props.auth.user.role === "admin" || props.auth.user.role === "super-admin"){
      props.updateUser(input, props.history);
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

  const onDelete = user => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })

    const input = {
      emailDelete: user.email,
      email: props.auth.user.email,
      auth: props.auth.isAuthenticated
    };


    if(props.auth.user.role === "admin" || props.auth.user.role === "super-admin"){
      props.deleteUser(input, props.history);
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: 'success'
      });
    }
  }

  const dateToString = (date) => {
    console.log(date);
    var d = date.toString();

    d = d.substring(0, d.indexOf('T'));
    return d;
  }

  return (
    <React.Fragment>
    <Paper className={classes.pageContent}>
      <Toolbar>
        <Input
            label="Search Employees"
            className={classes.searchInput}
            InputProps={{
                startAdornment: (<InputAdornment position="start">
                    <Search />
                </InputAdornment>)
            }}
            onChange={handleSearch}
        />
        <Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => { setOpenRegPopup(true); }}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map(row =>
              ( <TableRow key={row._id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.createdByName}</TableCell>
                <TableCell>{dateToString(row.dateCreated)}</TableCell>
                <TableCell>
                  <ActionButton
                    color="primary"
                    onClick={() => { openInEditPopup(row) }}>
                    <EditOutlinedIcon fontSize="small" />
                  </ActionButton>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </Paper>
      <Popup
        title="Edit User Details"
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
      >
        <SUpdateForm
            recordForEdit={recordForEdit}
            edit={edit} />
      </Popup>
      <Popup
        title="Register New User"
        openPopup={openRegPopup}
        setOpenPopup={setOpenRegPopup}
      >
        <SRegisterForm {...props} create={create}/>
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
