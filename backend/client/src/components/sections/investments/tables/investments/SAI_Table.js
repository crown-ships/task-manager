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
import UpdateForm from "../../forms/updateInvestmentForm"
import UseTable from "../../../useTable"
import RegisterForm from "../../forms/registerInvestmentForm"
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
// Generate Order Data
function createData() {
  return {
    _id:"",
    investorName: "",
    contactNo: "",
    profitPercent:0,
    capitalAmt: 0,
    capitalPaid:0,
    investmentType: "",
    paymentTerms: "",
    startDate: "",
    dueDate:"",
    pendingAmt:0,
    creatorName: "",
    approved: ""
  }
}

const getCompanies = (prop) => {
  return prop.getAllCompanies({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}

const getAdmins = (prop) => {
  const input = {
    name: '',
    role: "admin",
    email:prop.auth.user.email,
    auth:prop.auth.isAuthenticated
  }
  return prop.getFilteredUsers(input, prop.history);
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
    { id: 'investorName', label: 'Investor Name' },
    { id: 'investmentName', label: 'Investment Name' },
    { id: 'approved', label: 'Approved' },
    { id: 'startDate', label: 'Start Date' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'capitalAmt', label: 'Capital Amount'},
    { id: 'capitalPaid', label: 'Amount Paid'},
    { id: 'profitPercent', label: 'Rate'},
    { id: 'investmentType', label: 'Type'},
    { id: 'paymentTerms', label: 'Terms'},
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
  return prop.getAllInvestments({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}

const getDropdownList = (prop) => {
  return prop.getAllInvestors({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}

export default function SAI_Table(props) {

  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
  const [data, setData] = React.useState(rows);
  const [list, setList] = React.useState([]);
  const [companyList, setCompanyList] = React.useState([]);
  const [company, setCompany] = React.useState("");
  const [investor, setInvestor] = React.useState("");
  const [allCompanies, setAllCompanies] = React.useState([]);
  const [allAdmins, setAllAdmins] = React.useState([]);
  const [allInvestors, setAllInvestors] = React.useState([]);
  const [recordForEdit, setRecordForEdit] = React.useState(null);
  const [openEditPopup, setOpenEditPopup] = React.useState(false);
  const [openRegPopup, setOpenRegPopup] = React.useState(false);
  const [records, setRecords] = React.useState(data);
  const classes = useStyles();

  React.useEffect(async () => {
    const d = await getCompanies(props);
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
    setCompanyList(selList);

    const a = await getAdmins(props);
    var adminsList = a.data.map(function(item) {
      return item.name;
    });

    var admins = [];
    var i;
    admins[0] = {key:0, item: ""};
    for(i=0; i<adminsList.length; i++) {
      admins[i+1] = {key:i+1, item: adminsList[i]};
    }
    setAllAdmins(admins);
  },[]);

  React.useEffect(async () => {
    const d = await getDropdownList(props);
    setAllInvestors(d.data);
    var complist = d.data.map(function(item) {
      if (item.approved === "approved")
        return item.investorName;
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
    console.log(selList);
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
                return items.filter(x => (x.companyName === company) && x.approved.includes("approved"));
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
                return items.filter(x =>  x.approved.includes("approved"))
            else
                return items.filter(x => x.investmentName.toLowerCase().includes(target.value.toLowerCase()) && x.approved.includes("approved"))
        }
    })
  }

  const handleInvestorChange = (event) => {
    let val = event.target;
    console.log(val.value);
    setInvestor(val.value);
    setFilterFn({
        fn: items => {
            if (val.value == "")
                return items.filter(x => x.approved.includes("approved"));
            else
                return items.filter(x => (x.investorName === val.value) && x.approved.includes("approved"))
        }
    })
  };

  const handleCompanyChange = (event) => {
    let val = event.target;
    setCompany(val.value);
    setFilterFn({
        fn: items => {
            if (val.value == "")
                return items.filter(x =>  x.approved.includes("approved"));
            else
                return items.filter(x => (x.companyName === val.value) && x.approved.includes("approved"));
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

  function monthDiff(d1, d2) {
      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
  }
  const createReturns = (data) => {
      var date1 = new Date(data.startDate);
      var date2 = new Date(data.dueDate);
      var months = monthDiff(date1, date2);
      console.log(months);
      var divider= 0;

      if (data.paymentTerms === "monthly")
        divider = 1;
      else if (data.paymentTerms === "quarterly")
        divider = 3;
      else if (data.paymentTerms === "half-yearly")
        divider = 6;
      else if (data.paymentTerms === "yearly")
        divider = 12;


      if (data.investmentType ==="one-time") {
        const input = {
          params: {
            email: props.auth.user.email,
            auth: props.auth.isAuthenticated
          },
          body: {
            investorName: data.investorName,
            investorID: data.investorID,
            companyName: data.companyName,
            ownerName: data.ownerName,
            investmentName: data.investmentName,
            paymentTerms: data.paymentTerms,
            totalInterestAmt: ((data.profitPercent*data.capitalAmt)/100),
            returnAmt: ((data.profitPercent*data.capitalAmt)/100),
            localDueDate: data.dueDate,
            dueDate: data.dueDate
          }
        }
        props.registerReturn(input, props.history);
      }
      else {
        var noOfPayments = months/divider;
        var i;
        var input;
        for(i=1; i<=noOfPayments; i++) {
          input = {
            params: {
              email: props.auth.user.email,
              auth: props.auth.isAuthenticated
            },
            body: {
              investorName: data.investorName,
              investorID: data.investorID,
              investmentName: data.investmentName,
              paymentTerms: data.paymentTerms,
              companyName: data.companyName,
              ownerName: data.ownerName,
              totalInterestAmt: ((data.profitPercent*data.capitalAmt)/100),
              returnAmt: ((data.profitPercent*data.capitalAmt)/100)/noOfPayments,
              localDueDate: date1.setMonth(date1.getMonth() + divider),
              dueDate: data.dueDate
            }
          }
          props.registerReturn(input, props.history);
        }
      }
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
    props.registerInvestment(input, props.history);
    createReturns(data);
    resetForm();
    setOpenRegPopup(false);
    setNotify({
      isOpen: true,
      message: "Registered Successfully.",
      type: 'success'
    });
  }

  const edit = (data, resetForm, id) => {

    const input = {
      params: {
        email: props.auth.user.email,
        investmentID: id,
        auth: props.auth.isAuthenticated
      },
      body: data
    };

    if(props.auth.user.role === "admin" || props.auth.user.role === "super-admin"){
      props.updateInvestment(input, props.history);
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
      // if(val== true)
      //   changeEnable("true",row.email, row.companyName);
      // if(val == false)
      //   changeEnable("false",row.email, row.companyName);
  };

  const onDelete = investment => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })

    const input = {
      investmentID: investment._id,
      email: props.auth.user.email,
      auth: props.auth.isAuthenticated
    };


    if(props.auth.user.role === "admin" || props.auth.user.role === "super-admin"){
      props.deleteInvestment(input, props.history);
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
          <Grid item xs={4}>
            <Input
                label="Search Investments"
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
              <InputLabel htmlFor="outlined-investor-native-simple">Investor</InputLabel>
              <Select
                native
                onChange={handleInvestorChange}
                label="Investor"
                inputProps={{
                  name: 'investor',
                  id: 'outlined-investor-native-simple',
                }}
              >{list.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-company-native-simple">Company</InputLabel>
              <Select
                native
                onChange={handleCompanyChange}
                label="Company"
                inputProps={{
                  name: 'company',
                  id: 'outlined-company-native-simple',
                }}
              >{companyList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
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
                <TableCell>{row.investorName}</TableCell>
                <TableCell>{row.investmentName}</TableCell>
                <TableCell>{approvedIcon(row.approved)}</TableCell>
                <TableCell>{dateToString(row.startDate)}</TableCell>
                <TableCell>{dateToString(row.dueDate)}</TableCell>
                <TableCell>{row.capitalAmt}</TableCell>
                <TableCell>{row.capitalPaid}</TableCell>
                <TableCell>{row.profitPercent + "%"}</TableCell>
                <TableCell>{row.investmentType}</TableCell>
                <TableCell>{row.paymentTerms}</TableCell>
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
        title="Edit Investment Details"
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
      >
        <UpdateForm  {...props}
            recordForEdit={recordForEdit}
            edit={edit} />
      </Popup>
      <Popup
        title="Register New Investment"
        openPopup={openRegPopup}
        setOpenPopup={setOpenRegPopup}
      >
        <RegisterForm {...props} create={create} investor={investor} allInvestors={allInvestors} allCompanies={allCompanies} allAdmins={allAdmins}/>
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
