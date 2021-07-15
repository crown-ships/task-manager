import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, Series, ValueAxis } from 'devextreme-react/chart';


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

export default function OwnerGraphs(props) {

  const [tasks, setTasks] = React.useState([]);
  const [owners, setOwners] = React.useState([]);
  const [ownerCount, setOwnerCount] = React.useState([]);

  React.useEffect(async () => {
    const d = await getTasks(props);
    var data = d.data;
    console.log(data);
    var complist = d.data.map(function(item) {
      return item;
    });
    setTasks(complist);

    const admins = await getAdmins(props);
    var ownersList = admins.data.map(function(item) {
      return item.name;
    });
    setOwners(ownersList);
  },[]);

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
  },[owners]);

  return (
    <Paper>
    <Chart id="chart" dataSource={ownerCount}>
        <Series
          valueField="val"
          argumentField="owner"
          name="Task Owners"
          type="bar"
          color="#52006A" />
          <ValueAxis defaultVisualRange={{ startValue: 0 }} />
      </Chart>
    </Paper>


  );
}
