import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, Series, Label, Tooltip, ValueAxis, ArgumentAxis, Label } from 'devextreme-react/chart';


const data = [
  { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 100 },
  { year: '1980', population: 4.440 },
  { year: '1990', population: 5.310 },
  { year: '2000', population: 6.127 },
  { year: '2010', population: 6.930 },
];

function getTasks (props) {
    return props.getAllTasks({email:props.auth.user.email, auth:props.auth.isAuthenticed}, props.history)
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

export default function TOwnerGraphs(props) {

  const [tasks, setTasks] = React.useState([]);
  const [owners, setOwners] = React.useState([]);
  const [ownerCount, setOwnerCount] = React.useState([]);
  React.useEffect(async () => {
    const admins = await getAdmins(props);
    var ownersList = admins.data.map(function(item) {
      return item.name;
    });
    setOwners(ownersList);
  },[]);

  React.useEffect(async () => {
    const d = await getTasks(props);
    var data = d.data;
    console.log(data);
    if (props.project === "") {
      var complist = d.data.map(function(item) {
        return item;
      });
      console.log(complist);
      setTasks(complist)
    }
    else {
      var complist = d.data.map(function(item) {
        console.log(props.project);
        console.log(item);
        if(props.project === item.projectName) {
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
      setTasks(trimlist)
    }
  },[props.project]);

  React.useEffect( () => {
    var i;
    var j;
    var taskCount = new Array(owners.length).fill(0);

    for (i=0; i< tasks.length; i++) {
        for (j=0;j < owners.length; j++) {
          if (tasks[i].ownerName === owners[j]){
            taskCount[j]++;
          }
        }
    }
     var temp = [];
    for (j = 0; j< owners.length; j++) {
      temp[j] = {owner: owners[j], val: taskCount[j]};
    }
    setOwnerCount(temp);
  },[owners, tasks]);

  function customizeTooltip(arg) {
      return {
        text: `${arg.valueText}`
      };
    }
  return (
    <Paper>
    <Chart id="chart" dataSource={ownerCount} title="Task Owners">
        <Series
          valueField="val"
          argumentField="owner"
          name="Task Owners"
          type="bar"
          color="#52006A" />
          <ValueAxis defaultVisualRange={{ startValue: 0 }} />
          <ArgumentAxis> {/* or ValueAxis, or CommonAxisSettings */}
              <Label
                  rotationAngle={45}
                  overlappingBehavior="rotate"
              />
          </ArgumentAxis>
          <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
          </Tooltip>
      </Chart>
    </Paper>


  );
}
