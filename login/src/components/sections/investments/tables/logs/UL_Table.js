// import React from 'react';
// import Link from '@material-ui/core/Link';
// import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
// import red from "@material-ui/core/colors/red";
// import orange from "@material-ui/core/colors/orange";
// import green from "@material-ui/core/colors/green";
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import FormControl from '@material-ui/core/FormControl';
// import Grid from '@material-ui/core/Grid';
// import AddIcon from '@material-ui/icons/Add';
// import {Search} from '@material-ui/icons';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import HelpIcon from '@material-ui/icons/Help';
// import TableCell from '@material-ui/core/TableCell';
// import Paper from '@material-ui/core/Paper';
// import TableHead from '@material-ui/core/TableHead';
// import Toolbar from '@material-ui/core/Toolbar';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import TableRow from '@material-ui/core/TableRow';
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// import CloseIcon from '@material-ui/icons/Close';
// import Switch from '@material-ui/core/Switch';
// import ActionButton from "../../../../controls/ActionButton"
// import Button from "../../../../controls/Button"
// import Input from "../../../../controls/Input"
// import ConfirmDialog from "../../../../elements/ConfirmDialog"
// import Notification from "../../../../elements/Notification"
// import Popup from "../../../../elements/Popup"
// import UseTable from "../../../useTable"
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import CancelIcon from '@material-ui/icons/Cancel';
//
// function createData(id ,name, app, date, details, createdBy, update,del) {
//   return { _id:id, featureName: name, approved: app ,dueDate: date, featureDetails: details, creatorName: createdBy, updated:update,delete:del};
// }
//
// const theme = createMuiTheme({
//   palette: {
//     green: {
//       main: '#1a9c34'
//     },
//     yellow: {
//       main: '#f5ca20'
//     },
//     yellow: {
//       main: '#f5ca20'
//     },
//   },
// });
//
// const useStyles = makeStyles(theme => ({
//     pageContent: {
//         margin: theme.spacing(5),
//         padding: theme.spacing(3)
//     },
//     searchInput: {
//         width: '95%'
//     },
//     newButton: {
//         position: 'absolute',
//         right: '10px'
//     },
//     seeMore: {
//       marginTop: theme.spacing(3),
//     },
//     formControl: {
//     minWidth: 210,
//   },
// }))
//
// const headCells = [
//     { id: 'featureName', label: 'Feature Name' },
//     { id: 'approvedIcon', label: 'Approved',disableSorting: true  },
//     { id: 'dueDate', label: 'Due Date' },
//     { id: 'creatorName', label: 'Creator' },
//     { id: 'featureDetails', label: 'Feature Details'},
//     { id: 'companyName', label: 'Company Name'},
//     { id: 'update', label: 'Update', disableSorting: true },
//     { id: 'delete', label: 'Delete', disableSorting: true }
// ];
//
// const rows = [
//   createData("", "","", "", "","","",""),
//   createData("", "", "","", "","","",""),
//   createData("", "", "","", "","","",""),
//   createData("", "", "", "","","","",""),
//   createData("", "", "", "","","","",""),
//   createData("", "", "", "","","","",""),
//   createData("", "", "", "","","","",""),
//   createData("", "", "", "","","","",""),
//   createData("", "", "", "","","","","")
// ];
//
// function preventDefault(event) {
//   event.preventDefault();
// }
//
// const getData = (prop) => {
//   return prop.getAllFeatures({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
// }
// const getDropdownList = (prop) => {
//   return prop.getAllCompanies({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
// }
//
//
// export default function AP_Table(props) {
//
//   const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
//   const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
//   const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
//   const [data, setData] = React.useState(rows);
//   const [list, setList] = React.useState([]);
//   const [company, setCompany] = React.useState("");
//   const [recordForEdit, setRecordForEdit] = React.useState(null);
//   const [openEditPopup, setOpenEditPopup] = React.useState(false);
//   const [openRegPopup, setOpenRegPopup] = React.useState(false);
//   const [records, setRecords] = React.useState(data);
//   const classes = useStyles();
//
//   React.useEffect(async () => {
//     const d = await getDropdownList(props);
//     var complist = d.data.map(function(item) {
//       return item.companyName;
//     });
//     const len = complist.length;
//     var selList = [];
//     var i;
//     selList[0] = {key:0, item: ""};
//     for(i=0; i<len; i++) {
//       selList[i+1] = {key:i+1, item: complist[i]};
//     }
//     console.log(selList);
//     setList(selList);
//   },[]);
//
//   React.useEffect(async () => {
//     const d = await getData(props);
//     setData(d.data);
//     setRecords(d.data);
//     setFilterFn({
//         fn: items => {
//             if (company == "")
//                 return items;
//             else
//                 return items.filter(x => x.companyName.includes(company))
//         }
//     })
//   },[notify, list]);
//
//
//   const {
//           TblContainer,
//           TblHead,
//           TblPagination,
//           recordsAfterPagingAndSorting
//       } = UseTable(records, headCells, filterFn);
//
//   const handleSearch = e => {
//     let target = e.target;
//     setFilterFn({
//         fn: items => {
//             if (target.value == "")
//                 return items;
//             else
//                 return items.filter(x => x.featureName.toLowerCase().includes(target.value))
//         }
//     })
//   }
//   const [state, setState] = React.useState({
//       checkedA: true,
//       checkedB: true,
//     });
//
//   const handleChange = (event) => {
//     let val = event.target;
//     console.log(val.value);
//     setCompany(val.value);
//     setFilterFn({
//         fn: items => {
//             if (val.value == "")
//                 return items;
//             else
//                 return items.filter(x => x.companyName.includes(val.value))
//         }
//     })
//
//   };
//   const openInEditPopup = item => {
//     setRecordForEdit(item);
//     setOpenEditPopup(true);
//   }
//
//   const openInRegPopup = item => {
//
//     setOpenRegPopup(true);
//   }
//
//   const create = (data, resetForm) => {
//     const input = {
//       params: {
//         email: props.auth.user.email,
//         auth: props.auth.isAuthenticated
//       },
//       body: data
//     };
//     console.log(input);
//     props.registerFeature(input, props.history);
//     resetForm();
//     setOpenRegPopup(false);
//     setNotify({
//       isOpen: true,
//       message: "Registered Successfully.",
//       type: 'success'
//     });
//   }
//   const edit = (data, resetForm, og_email) => {
//
//     const input = {
//       params: {
//         email: props.auth.user.email,
//         emailupdate: og_email,
//         auth: props.auth.isAuthenticated
//       },
//       body: data
//     };
//
//     if(props.auth.user.role === "admin"){
//       props.updateFeature(input, props.history);
//       resetForm();
//       setRecordForEdit(null);
//       setOpenEditPopup(false);
//       setNotify({
//         isOpen: true,
//         message: "Update Successfully",
//         type: 'success'
//       });
//     }
//   }
//
//   const onDelete = company => {
//     setConfirmDialog({
//         ...confirmDialog,
//         isOpen: false
//     })
//
//     const input = {
//       emailDelete: company.email,
//       email: props.auth.user.email,
//       auth: props.auth.isAuthenticated
//     };
//
//
//       props.deleteFeature(input, props.history);
//       setNotify({
//         isOpen: true,
//         message: "Deleted Successfully",
//         type: 'success'
//       });
//
//
//   }
//   const dateToString = (date) => {
//     var d = date.toString();
//
//     d = d.substring(0, d.indexOf('T'));
//     return d;
//   }
//
//   const approvedIcon = (status) => {
//
//     if (status === "approved") {
//       console.log(status);
//       console.log("yes");
//       return <CheckCircleIcon fontSize="small" style={{ color: "#00b386" }}/>
//     }
//     else if (status === "wait") {
//       console.log("what");
//       return <HelpIcon fontSize="small"  style={{ color: "#ffbf00" }}/>
//     }
//     else if (status === "rejected") {
//       console.log("what");
//       return <CancelIcon fontSize="small"  style={{ color: "#DC143C" }}/>
//     }
//   }
//
//
//   return (
//     <React.Fragment>
//     <Paper className={classes.pageContent}>
//       <Toolbar>
//         <Grid container>
//           <Grid item xs={7}>
//             <Input
//                 label="Search Features"
//                 className={classes.searchInput}
//                 InputProps={{
//                     startAdornment: (<InputAdornment position="start">
//                         <Search />
//                     </InputAdornment>)
//                 }}
//                 onChange={handleSearch}
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <FormControl variant="outlined" className={classes.formControl}>
//               <InputLabel htmlFor="outlined-company-native-simple">Company</InputLabel>
//               <Select
//                 native
//                 value={state.age}
//                 onChange={handleChange}
//                 label="Company"
//                 inputProps={{
//                   name: 'company',
//                   id: 'outlined-company-native-simple',
//                 }}
//               >{list.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={2}>
//             <Button
//                 text="Add New"
//                 variant="outlined"
//                 startIcon={<AddIcon />}
//                 className={classes.newButton}
//                 onClick={() => { setOpenRegPopup(true); }}
//                 disabled = {(company==="")}
//             />
//           </Grid>
//         </Grid>
//       </Toolbar>
//       <TblContainer>
//         <TblHead />
//           <TableBody>
//             {
//               recordsAfterPagingAndSorting().map(row =>
//               (<TableRow key={row._id}>
//                 <TableCell>{row.featureName}</TableCell>
//                 <TableCell align='center'>{approvedIcon(row.approved)}</TableCell>
//                 <TableCell>{dateToString(row.dueDate)}</TableCell>
//                 <TableCell>{row.creatorName}</TableCell>
//                 <TableCell>{row.featureDetails}</TableCell>
//                 <TableCell>{row.companyName}</TableCell>
//                 <TableCell>
//                   <ActionButton
//                     color="light"
//                     onClick={() => { openInEditPopup(row) }}>
//                     <EditOutlinedIcon fontSize="small" />
//                   </ActionButton>
//                 </TableCell>
//                 <TableCell>
//                   <ActionButton
//                     color="light"
//                     onClick={() => {
//                       setConfirmDialog({
//                         isOpen: true,
//                         title: 'Are you sure to delete this record?',
//                         subTitle: "You can't undo this operation",
//                         onConfirm: () => { onDelete(row) }
//                       })
//                     }}>
//                     <CloseIcon fontSize="small" />
//                   </ActionButton>
//                 </TableCell>
//               </TableRow>
//           ))}
//         </TableBody>
//       </TblContainer>
//       <TblPagination />
//     </Paper>
//       <Popup
//         title="Edit Feature Details"
//         openPopup={openEditPopup}
//         setOpenPopup={setOpenEditPopup}
//       >
//         <UpdateForm
//             recordForEdit={recordForEdit}
//             edit={edit} />
//       </Popup>
//       <Popup
//         title="Register New Feature"
//         openPopup={openRegPopup}
//         setOpenPopup={setOpenRegPopup}
//       >
//         <RegisterForm {...props} create={create} company={company}/>
//       </Popup>
//       <Notification
//                notify={notify}
//                setNotify={setNotify}
//            />
//       <ConfirmDialog
//         confirmDialog={confirmDialog}
//         setConfirmDialog={setConfirmDialog}
//       />
//     </React.Fragment>
//   );
// }
