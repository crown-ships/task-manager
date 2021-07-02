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

function getProjects (props) {
    return props.getAllProjects({email:props.auth.user.email, auth:props.auth.isAuthenticed}, props.history)
    }

export default function Graphs(props) {

  const [project, setProject] = React.useState([]);

  React.useEffect(async () => {
    const d = await getProjects(props);
    var data = d.data;
    console.log(data);
    var complist = d.data.map(function(item) {
      return {projectName: item.projectName, percentComplete: item.percentComplete}
    });
    setProject(complist);
  },[]);


  console.log(project);
  return (
    <Paper>
    <Chart id="chart" dataSource={project}>
        <Series
          valueField="percentComplete"
          argumentField="projectName"
          name="Projects"
          type="bar"
          color="#ffaa66" />
          <ValueAxis defaultVisualRange={{ startValue: 0, endValue: 100 }} />
      </Chart>
    </Paper>


  );
}
