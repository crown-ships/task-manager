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
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import UseTable from "../../useTable"

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// Generate Order Data
function createData() {
  return { _id:"", vendorName: "", endDate: "ttt", startDate: "uyyy", contractAmt: "", updated:"",delete:""};
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
    { id: 'startDate', label: 'Start Date' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'contractAmt', label: 'Contract Amount'},
    { id: 'rejectReason', label: 'rejectReason'}
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

export default function VendorRejectionTable(props) {

  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
  const [data, setData] = React.useState(rows);
  const [openRejectPopup, setOpenRejectPopup] = React.useState(false);
  const classes = useStyles();

  const openInRejectPopup = item => {
    setOpenRejectPopup(true);
  }

  React.useEffect(async () => {
    const d = await getData(props);
    setData(d.data);
    setFilterFn({
        fn: items => {
            return items.filter(x =>  x.approved.includes("rejected"))
        }
    })
  },[notify]);


  const {
          TblContainer,
          TblHead,
          TblPagination,
          recordsAfterPagingAndSorting
      } = UseTable(data, headCells, filterFn);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value == "")
                return items.filter(x => x.approved.includes("rejected"));
            else
                return items.filter(x => x.vendorName.toLowerCase().includes(target.value.toLowerCase()))
        }
    })
  }
  const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
    });


  const dateToString = (date) => {
    console.log(date);
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
          <Grid item xs={12}>
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
                <TableCell>{dateToString(row.startDate)}</TableCell>
                <TableCell>{dateToString(row.endDate)}</TableCell>
                <TableCell>{row.contractAmt}</TableCell>
                <TableCell>{row.rejectReason}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </Paper>
    </React.Fragment>
  );
}
