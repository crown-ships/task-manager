import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Label,
  Connector,
  Export
} from 'devextreme-react/pie-chart';
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
  const [pie, setPie] = React.useState([]);
  const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
    });

  React.useEffect(async () => {
    const d = await getProjects(props);
    var data = d.data;
    console.log(data);

    if (company === "") {
      var complist = d.data.map(function(item) {
        return item;
      });
      console.log(complist);
      setProject(complist)
    }
    else {
      var complist = d.data.map(function(item) {
        console.log(company);
        console.log(item);
        if(company === item.companyName) {
          return item;
        }
        else {
          return null;
        }
      });

      var j;
      var len = 0;
      var trimlist = [];
      for(j=0; j<complist.length; j++) {
        if(complist[j] !== null){
          trimlist[len++] = complist[j];
        }
      }
      console.log(trimlist);
      setProject(trimlist)
    }

    var i;
    var completed = 0;
    var approval = 0;
    var ongoing = 0;
    for(i=0; i< project.length; i++) {
      if(project[i].percentComplete == 100){
        completed++;
      }
      else if(project[i].percentComplete<100 && project[i].approved === "approved") {
        ongoing++;
      }
      else if(project[i].approved === "wait")
      {
        approval++;
      }
    }
    setPie([
      {count: "Completed", val: completed},
      {count: "Pending Approval", val: approval},
      {count: "Ongoing", val: ongoing}    
    ])
  },[company]);

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

  function customizeTooltip(arg) {
      return {
        text: `${arg.valueText}%`
      };
    }
  return (
    <>
    <Paper>
    <PieChart
        id="pie"
        type="doughnut"
        title="Project Progress"
        palette="Material"
        dataSource={pie}
      >
        <Series argumentField="count">
          <Label visible={true}>
            <Connector visible={true} />
          </Label>
        </Series>
        <Export enabled={true} />
        <Legend
          margin={50}
          horizontalAlignment="right"
          verticalAlignment="top"
        />
        <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
        </Tooltip>
      </PieChart>
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
    </Paper>
    </>
  );
}
