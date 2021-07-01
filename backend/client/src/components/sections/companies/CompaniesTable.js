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
import Switch from '@material-ui/core/Switch';
import ActionButton from "../../controls/ActionButton"
import Button from "../../controls/Button"
import Input from "../../controls/Input"
import ConfirmDialog from "../../elements/ConfirmDialog"
import Notification from "../../elements/Notification"
import Popup from "../../elements/Popup"
import UpdateForm from "./Forms/updateCompanyForm"
import UseTable from "../useTable"
import RegisterForm from "./Forms/registerCompanyForm"
// Generate Order Data
function createData(name, email, website, contact, actions,enable) {
  return { name, email, website, contact, actions,enable};
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
    { id: 'companyName', label: 'Company' },
    { id: 'email', label: 'Email Address' },
    { id: 'websiteURL', label: 'Website' },
    { id: 'contactNo', label: 'Contact Info'},
    { id: 'actions', label: 'Enable', disableSorting: true },
    { id: 'status', label: 'Actions', disableSorting: true }
];

const rows = [
  createData("", "", "", "","","")
];

function preventDefault(event) {
  event.preventDefault();
}

const getData = (prop) => {
  return prop.getAllCompanies({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}



export default function CompaniesTable(props) {

  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
  const [data, setData] = React.useState(rows);
  const [recordForEdit, setRecordForEdit] = React.useState(null);
  const [openEditPopup, setOpenEditPopup] = React.useState(false);
  const [openRegPopup, setOpenRegPopup] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [records, setRecords] = React.useState(data);
  const classes = useStyles();


  React.useEffect(async () => {
    const d = await getData(props);
    setData(d.data);
    setRecords(d.data);
    console.log(data);
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
                return items.filter(x => x.companyName.toLowerCase().includes(target.value.toLowerCase()))
        }
    })
  }

  const handleChange = (val, row) => {
    console.log(val);
      if(val== true)
        changeEnable("true",row._id);
      if(val == false)
        changeEnable("false",row._id);
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
    props.registerCompany(input, props.history);
    resetForm();
    setOpenRegPopup(false);
    setNotify({
      isOpen: true,
      message: "Registered Successfully.",
      type: 'success'
    });
  }

  const changeEnable = (value, og_id) => {
    const input = {
      params: {
        email: props.auth.user.email,
        idupdate: og_id,
        auth: props.auth.isAuthenticated
      },
      body: {
      enabled: value
      }
    };

    const p_input = {
      params: {
        email: props.auth.user.email,
        companyID: og_id,
        auth: props.auth.isAuthenticated
      },
      body: {
        enabled: value
      }
    };


    props.updateCompany(input, props.history);
    props.updateAllProjects(p_input, props.history);
    props.updateAllFeatures(p_input, props.history);
    props.updateAllTasks(p_input, props.history);
    setNotify({
      isOpen: true,
      message: "Success.",
      type: 'success'
    });
  }

  const edit = (data, resetForm, og_id) => {

    const input = {
      params: {
        email: props.auth.user.email,
        idupdate: og_id,
        auth: props.auth.isAuthenticated
      },
      body: data
    };

    if(props.auth.user.role === "admin"){
      props.updateCompany(input, props.history);
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

  const onDelete = company => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })

    const input = {
      idDelete: company._id,
      email: props.auth.user.email,
      auth: props.auth.isAuthenticated
    };


    if(props.auth.user.role === "admin"){
      props.deleteCompany(input, props.history);
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: 'success'
      });

    }
  }


  return (
    <React.Fragment>
    <Paper className={classes.pageContent}>
      <Toolbar>
        <Input
            label="Search Companies"
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
              (<TableRow key={row._id}>
                <TableCell>{row.companyName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.websiteURL}</TableCell>
                <TableCell>{row.contactNo}</TableCell>
                <TableCell>
                  <Switch
                    onChange={(e,val)=>handleChange(val, row)}
                    color="primary"
                    name="checked"
                    checked={(row.enabled==="true")}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </TableCell>
                <TableCell>
                  <ActionButton
                    color="primary"
                    onClick={() => { openInEditPopup(row) }}>
                    <EditOutlinedIcon fontSize="small" />
                  </ActionButton>
                  <ActionButton
                    color="secondary"
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
        title="Edit Company Details"
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
      >
        <UpdateForm
            recordForEdit={recordForEdit}
            edit={edit} />
      </Popup>
      <Popup
        title="Register New Company"
        openPopup={openRegPopup}
        setOpenPopup={setOpenRegPopup}
      >
        <RegisterForm {...props} create={create}/>
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
