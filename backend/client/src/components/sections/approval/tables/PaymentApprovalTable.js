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
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Switch from '@material-ui/core/Switch';
import ActionButton from "../../../controls/ActionButton"
import Button from "../../../controls/Button"
import Input from "../../../controls/Input"
import Notification from "../../../elements/Notification"
import Popup from "../../../elements/Popup"
import RejectForm from "../forms/rejectForm"
import UseTable from "../../useTable"
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// Generate Order Data
function createData(id ,name, date, details, createdBy, update,del) {
  return { _id:id, vendorName: name, dueDate: date, vendorCrtAmt: "", vendorStartDate: "", vendorEndDate:"", amtToBePaid: details, approved: "", updated:update,delete:del};
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
    { id: 'amtToBePaid', label: 'Payment Amt.' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'vendorStartDate', label: 'V Start Date' },
    { id: 'vendorEndDate', label: 'V End Date' },
    { id: 'vendorCrtAmt', label: 'Contract Amount' },
    { id: 'approve', label: 'Approve', disableSorting: true },
    { id: 'reject', label: 'Reject', disableSorting: true }
];

const rows = [
  createData("", "", "", "","","","")
];

function preventDefault(event) {
  event.preventDefault();
}

const getData = (prop) => {
  return prop.getAllPayments({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}
const getDropdownList = (prop) => {
  return prop.getAllVendors({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}


export default function PaymentApprovalTable(props) {

  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
  const [data, setData] = React.useState(rows);
  const [list, setList] = React.useState([]);
  const [vendor, setVendor] = React.useState("");
  const [recordForEdit, setRecordForEdit] = React.useState(null);
  const [openRejectPopup, setOpenRejectPopup] = React.useState(false);
  const [records, setRecords] = React.useState(data);
  const classes = useStyles();

  React.useEffect(async () => {
    const d = await getDropdownList(props);
    var complist = d.data.map(function(item) {
      if (item.approved === "approved")
        return item.vendorName;
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
    console.log(data);
    setRecords(d.data);
    setFilterFn({
        fn: items => {
            if (vendor == "")
                return items.filter(x => x.approved.includes("wait"));
            else
                return items.filter(x => x.vendorName.includes(vendor) && x.approved.includes("wait"))
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
            if (vendor == "")
                return items.filter(x => x.approved.includes("wait"));
            else
                return items.filter(x => x.paymentName.toLowerCase().includes(target.value.toLowerCase()) && x.approved.includes("wait"));
        }
    })
  }
  const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
    });

    const openInRejectPopup = item => {
      setRecordForEdit(item);
      setOpenRejectPopup(true);
    }

    const handleChange = (event) => {
      let val = event.target;
      console.log(val.value);
      setVendor(val.value);
      setFilterFn({
          fn: items => {
              if (val.value == "")
                  return items.filter(x => x.approved.includes("wait"))
              else
                  return items.filter(x => x.vendorName.includes(val.value) && x.approved.includes("wait"))
          }
      })
      };

  const onApprove = og_id => {
    const input = {
      params: {
        email: props.auth.user.email,
        paymentID: og_id,
        auth: props.auth.isAuthenticated
      },
      body: {
        approved: "approved"
      }
    };

    if(props.auth.user.role === "admin" || props.auth.user.role === "super-admin"){
      props.updatePayment(input, props.history);
      setNotify({
        isOpen: true,
        message: "Payment Approved.",
        type: 'success'
      });
    }
  }

  const onReject = (og_id, reason, resetForm) => {
    const input = {
      params: {
        email: props.auth.user.email,
        paymentID: og_id,
        auth: props.auth.isAuthenticated
      },
      body: {
        approved: "rejected",
        rejectReason: reason
      }
    };

    if(props.auth.user.role === "admin" || props.auth.user.role === "super-admin"){
      props.updatePayment(input, props.history);
      resetForm();
      setOpenRejectPopup(false);
      setNotify({
        isOpen: true,
        message: "Payment Rejected.",
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
    <Paper className={classes.pageContent}>
      <Toolbar>
        <Grid container>
          <Grid item xs={9}>
            <Input
                label="Search Payments"
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
              <InputLabel htmlFor="outlined-vendor-native-simple">Vendor</InputLabel>
              <Select
                native
                value={state.age}
                onChange={handleChange}
                label="Vendor"
                inputProps={{
                  name: 'vendor',
                  id: 'outlined-vendor-native-simple',
                }}
              >{list.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
              </Select>
            </FormControl>
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
                <TableCell>{row.amtToBePaid}</TableCell>
                <TableCell>{dateToString(row.dueDate)}</TableCell>
                <TableCell>{dateToString(row.vendorStartDate)}</TableCell>
                <TableCell>{dateToString(row.vendorEndDate)}</TableCell>
                <TableCell>{row.vendorCrtAmt}</TableCell>
                <TableCell>
                  <ActionButton
                    color="light"
                    onClick={() => {onApprove(row._id)}}>
                    <CheckIcon fontSize="small" />
                  </ActionButton>
                </TableCell>
                <TableCell>
                  <ActionButton
                    color="light"
                    onClick={() => { openInRejectPopup(row) }}>
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
      title="Reject Payment"
      openPopup={openRejectPopup}
      setOpenPopup={setOpenRejectPopup}
    >
      <RejectForm
          recordForReject={recordForEdit}
          reject={onReject} />
    </Popup>
      <Notification
               notify={notify}
               setNotify={setNotify}
           />
    </React.Fragment>
  );
}
