import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
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
import UseTable from "../../../useTable"
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
// Generate Order Data
function createData(id ,name, date, details, createdBy, update,del) {
  return { _id:id, investmentName: name, localDueDate: date, investmentDetails: details, creatorName: createdBy, updated:update,delete:del};
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

const getCompanies = (prop) => {
  return prop.getAllCompanies({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}
const getInvestors = (prop) => {
  return prop.getAllInvestors({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}

const headCells = [
    { id: 'investmentName', label: 'Investment Name' },
    { id: 'localDueDate', label: 'Next Due Date' },
    { id: 'returnAmt', label: 'Next Payment Amount'},
    { id: 'totalInterestAmt', label: 'Total Interest'},
    { id: 'paymentTerms', label: 'Payment Terms'},
    { id: 'delete', label: 'Delete', disableSorting: true }
];

const rows = [
  createData("", "", "", "","","","")
];

function preventDefault(event) {
  event.preventDefault();
}

const getData = (prop) => {
  return prop.getAllReturns({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}
const getDropdownList = (prop) => {
  return prop.getAllInvestments({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}



export default function AL_Table(props) {

  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
  const [data, setData] = React.useState(rows);
  const [companyList, setCompanyList] = React.useState([]);
  const [investor, setInvestor] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [list, setList] = React.useState([]);
  const [investorList, setInvestorList] = React.useState([]);
  const [investment, setInvestment] = React.useState("");
  const [records, setRecords] = React.useState(data);
  const classes = useStyles();

  React.useEffect(async () => {
    const d = await getCompanies(props);
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
  },[]);

  React.useEffect(async () => {
    const d = await getInvestors(props);
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
    setInvestorList(selList);
  },[]);

  React.useEffect(async () => {
    const d = await getDropdownList(props);
    var complist = d.data.map(function(item) {
      if (item.approved === "approved") {
        if(company === "") {
          if(investor === "") {
            return item.investmentName;
          }
          else {
            return (item.investorName === investor)? item.investmentName : "0" ;
          }
        }
        else {
          if (investor === "") {
            return (item.companyName === company)? item.investmentName: "0";
          }
          else {
            return (item.companyName === company && item.investorName === investor) ? item.investmentName : "0";
          }
        }
      }
      else {
        return "0";
      }
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
  },[company, investor]);


  React.useEffect(async () => {
    const d = await getData(props);
    setData(d.data);
    setRecords(d.data);
    console.log(d.data);
    setFilterFn({
        fn: items => {
            if (investment === "" && investor === "" && company === "")
                return items.filter(x => x.isPaid.includes("yes"));
            else   if (investment !== "" && investor === "" && company === "")
                return items.filter(x => (x.investmentName === investment) && x.isPaid.includes("yes"))
            else   if (investment === "" && investor !== "" && company === "")
                return items.filter(x => (x.investorName === investor) && x.isPaid.includes("yes"))
            else   if (investment === "" && investor === "" && company !== "")
                return items.filter(x => (x.companyName === company) && x.isPaid.includes("yes"))
            else   if (investment !== "" && investor !== "" && company === "")
                return items.filter(x => (x.investmentName === investment) && (x.investorName === investor) && x.isPaid.includes("yes"))
            else   if (investment === "" && investor !== "" && company !== "")
                return items.filter(x => (x.investorName === investor) && (x.companyName === company) && x.isPaid.includes("yes"))
            else   if (investment !== "" && investor === "" && company !== "")
                return items.filter(x => (x.investmentName === investment) && (x.companyName === company)  && x.isPaid.includes("yes"))
            else   if (investment !== "" && investor !== "" && company !== "")
                return items.filter(x => (x.investmentName === investment) && (x.investorName === investor) && (x.companyName === company) && x.isPaid.includes("yes"))

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
                  return items.filter(x => x.isPaid.includes("yes"));
            else
                return items.filter(x => x.investmentName.toLowerCase().includes(target.value.toLowerCase()) && x.isPaid.includes("yes"))
        }
    })
  }

  const handleInvestorChange = (event) => {
    let val = event.target;
    console.log(val.value);
    setInvestor(val.value);
    setFilterFn({
        fn: items => {
          if (investment === "" && investor === "" && company === "")
              return items.filter(x => x.isPaid.includes("yes"));
          else   if (investment !== "" && investor === "" && company === "")
              return items.filter(x => (x.investmentName === investment) && x.isPaid.includes("yes"))
          else   if (investment === "" && investor !== "" && company === "")
              return items.filter(x => (x.investorName === investor) && x.isPaid.includes("yes"))
          else   if (investment === "" && investor === "" && company !== "")
              return items.filter(x => (x.companyName === company) && x.isPaid.includes("yes"))
          else   if (investment !== "" && investor !== "" && company === "")
              return items.filter(x => (x.investmentName === investment) && (x.investorName === investor) && x.isPaid.includes("yes"))
          else   if (investment === "" && investor !== "" && company !== "")
              return items.filter(x => (x.investorName === investor) && (x.companyName === company) && x.isPaid.includes("yes"))
          else   if (investment !== "" && investor === "" && company !== "")
              return items.filter(x => (x.investmentName === investment) && (x.companyName === company)  && x.isPaid.includes("yes"))
          else   if (investment !== "" && investor !== "" && company !== "")
              return items.filter(x => (x.investmentName === investment) && (x.investorName === investor) && (x.companyName === company) && x.isPaid.includes("yes"))

        }
    })
  };

  const handleCompanyChange = (event) => {
    let val = event.target;
    setCompany(val.value);
    setFilterFn({
        fn: items => {
          if (investment === "" && investor === "" && company === "")
              return items.filter(x => x.isPaid.includes("yes"));
          else   if (investment !== "" && investor === "" && company === "")
              return items.filter(x => (x.investmentName === investment) && x.isPaid.includes("yes"))
          else   if (investment === "" && investor !== "" && company === "")
              return items.filter(x => (x.investorName === investor) && x.isPaid.includes("yes"))
          else   if (investment === "" && investor === "" && company !== "")
              return items.filter(x => (x.companyName === company) && x.isPaid.includes("yes"))
          else   if (investment !== "" && investor !== "" && company === "")
              return items.filter(x => (x.investmentName === investment) && (x.investorName === investor) && x.isPaid.includes("yes"))
          else   if (investment === "" && investor !== "" && company !== "")
              return items.filter(x => (x.investorName === investor) && (x.companyName === company) && x.isPaid.includes("yes"))
          else   if (investment !== "" && investor === "" && company !== "")
              return items.filter(x => (x.investmentName === investment) && (x.companyName === company)  && x.isPaid.includes("yes"))
          else   if (investment !== "" && investor !== "" && company !== "")
              return items.filter(x => (x.investmentName === investment) && (x.investorName === investor) && (x.companyName === company) && x.isPaid.includes("yes"))

        }
    })
  };

  const handleInvestmentChange = (event) => {
    let val = event.target;
    console.log(val.value);
    setInvestment(val.value);
    setFilterFn({
        fn: items => {
          if (investment === "" && investor === "" && company === "")
              return items.filter(x => x.isPaid.includes("yes"));
          else   if (investment !== "" && investor === "" && company === "")
              return items.filter(x => (x.investmentName === investment) && x.isPaid.includes("yes"))
          else   if (investment === "" && investor !== "" && company === "")
              return items.filter(x => (x.investorName === investor) && x.isPaid.includes("yes"))
          else   if (investment === "" && investor === "" && company !== "")
              return items.filter(x => (x.companyName === company) && x.isPaid.includes("yes"))
          else   if (investment !== "" && investor !== "" && company === "")
              return items.filter(x => (x.investmentName === investment) && (x.investorName === investor) && x.isPaid.includes("yes"))
          else   if (investment === "" && investor !== "" && company !== "")
              return items.filter(x => (x.investorName === investor) && (x.companyName === company) && x.isPaid.includes("yes"))
          else   if (investment !== "" && investor === "" && company !== "")
              return items.filter(x => (x.investmentName === investment) && (x.companyName === company)  && x.isPaid.includes("yes"))
          else   if (investment !== "" && investor !== "" && company !== "")
              return items.filter(x => (x.investmentName === investment) && (x.investorName === investor) && (x.companyName === company) && x.isPaid.includes("yes"))

        }
    })

  };



  const onDelete = returns => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })

    const input = {
      returnID: returns._id,
      email: props.auth.user.email,
      auth: props.auth.isAuthenticated
    }


    if(props.auth.user.role === "admin" || props.auth.user.role === "super-admin"){
      props.deleteReturn(input, props.history);
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
      </Toolbar>
      <Toolbar>
        <Grid container>
        <Grid item xs={4}>
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
        <Grid item xs={4}>
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
            >{investorList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
            </Select>
          </FormControl>
        </Grid>
          <Grid item xs={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-investment-native-simple">Investment</InputLabel>
              <Select
                native
                onChange={handleInvestmentChange}
                label="Investment"
                inputProps={{
                  name: 'investment',
                  id: 'outlined-investment-native-simple',
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
                <TableCell>{row.investmentName}</TableCell>
                <TableCell>{dateToString(row.localDueDate)}</TableCell>
                <TableCell>{row.returnAmt}</TableCell>
                <TableCell>{row.totalInterestAmt}</TableCell>
                <TableCell>{row.paymentTerms}</TableCell>
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
