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

import UseTable from "../../useTable"

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// Generate Order Data
function createData(id ,name, date, details, createdBy, update,del) {
  return { _id:id, taskName: name, dueDate: date, taskDetails: details, personName: createdBy, updated:update,delete:del};
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
    { id: 'projectName', label: 'Project Name' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'personName', label: 'Creator' },
    { id: 'taskDetails', label: 'Task Details'},
    { id: 'companyName', label: 'Company Name'},
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
  return prop.getAllProjects({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}
const getDropdownList = (prop) => {
  return prop.getAllCompanies({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}


export default function FeatureApprovalTable(props) {

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
      return item.companyName;
    });
    const len = complist.length;
    var selList = [];
    var i;
    selList[0] = {key:0, item: ""};
    for(i=0; i<len; i++) {
      selList[i+1] = {key:i+1, item: complist[i]};
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
                return rows;
            else
                return items.filter(x => x.companyName.includes(company) && x.approved.includes("wait"))
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
            if (company == "")
                return items;
            else
                return items.filter(x => x.taskName.toLowerCase().includes(target.value.toLowerCase()))
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
                  return rows;
              else
                  return items.filter(x => x.companyName.includes(val.value) && x.approved.includes("wait"))
          }
      })
      };

  const onApprove = og_projectName => {
    const input = {
      params: {
        email: props.auth.user.email,
        projectName: og_projectName,
        auth: props.auth.isAuthenticated
      },
      body: {
        approved: "approved"
      }
    };

    if(props.auth.user.role === "admin"){
      props.updateProject(input, props.history);
      setNotify({
        isOpen: true,
        message: "Project Approved.",
        type: 'success'
      });
    }
  }

  const onReject = og_projectName => {
    const input = {
      params: {
        email: props.auth.user.email,
        projectName: og_projectName,
        auth: props.auth.isAuthenticated
      },
      body: {
        approved: "rejected"
      }
    };

    if(props.auth.user.role === "admin"){
      props.updateProject(input, props.history);
      setNotify({
        isOpen: true,
        message: "Project Rejeected.",
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
          <Grid item xs={9}>
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

        </Grid>
      </Toolbar>
      <TblContainer>
        <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map(row =>
              (<TableRow key={row._id}>
                <TableCell>{row.projectName}</TableCell>
                <TableCell>{dateToString(row.dueDate)}</TableCell>
                <TableCell>{row.creatorName}</TableCell>
                <TableCell>{row.projectDetails}</TableCell>
                <TableCell>{row.companyName}</TableCell>
                <TableCell>
                  <ActionButton
                    color="light"
                    onClick={() => {onApprove(row.projectName)}}>
                    <CheckIcon fontSize="small" />
                  </ActionButton>
                </TableCell>
                <TableCell>
                  <ActionButton
                    color="light"
                    onClick={() => {onReject(row.projectName)}}>
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
        title="Register New Project"
        openPopup={openRegPopup}
        setOpenPopup={setOpenRegPopup}
      >

      </Popup>
      <Notification
               notify={notify}
               setNotify={setNotify}
           />
    </React.Fragment>
  );
}
