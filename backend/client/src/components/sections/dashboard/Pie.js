import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import Toolbar from '@material-ui/core/Toolbar';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



function getProjects (props) {
    return props.getAllProjects({email:props.auth.user.email, auth:props.auth.isAuthenticed}, props.history)
}

function getDropdownList (prop) {
  return prop.getAllCompanies({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}

export default function Graphs(props) {

  const [project, setProject] = React.useState([]);
  const [company, setCompany] = React.useState("");
  const [list, setList] = React.useState([]);

  React.useEffect(async () => {
    const d = await getProjects(props);
    var data = d.data;
    console.log(data);

    if (company !== "") {
      var complist = d.data.map(function(item) {
        if(company === item.companyName) {
          return {projectName: item.projectName, percentComplete: item.percentComplete}
        }
      });
    }
    else {
      var complist = d.data.map(function(item) {
        return {projectName: item.projectName, percentComplete: item.percentComplete}
      });
    }
    setProject(complist);
  },[]);

  React.useEffect(async () => {
    const d = await getDropdownList(props);
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
    console.log(selList);
    setList(selList);
  },[]);


  const handleChange = (event) => {
    let val = event.target;
    console.log(val.value);
    setCompany(val.value);
  };

  console.log(project);
  return (
    <>
    <Toolbar>
      <FormControl variant="outlined">
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
    </Toolbar>
    <Paper>
      <Chart
        data={project}
      >
        <PieSeries
          valueField="percentComplete"
          argumentField="projectName"
          innerRadius={0.7}
        />
        <Title text="Projects" />
        <Animation />
      </Chart>
    </Paper>
    </>
  );
}
