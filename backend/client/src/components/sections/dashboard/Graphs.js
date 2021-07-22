import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, Series, ValueAxis,ArgumentAxis, Label } from 'devextreme-react/chart';


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

    if (props.company === "") {
      var complist = d.data.map(function(item) {
        return item;
      });
      console.log(complist);
      setProject(complist)
    }
    else {
      var complist = d.data.map(function(item) {
        console.log(props.company);
        console.log(item);
        if(props.company === item.companyName && item.approved === "approved") {
          return {projectName: item.projectName, percentComplete: item.percentComplete};
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
  },[props.company]);


  console.log(project);
  return (
    <Paper>
    <Chart id="chart" dataSource={project} title="Project Progress">
        <Series
          valueField="percentComplete"
          argumentField="projectName"
          name="Projects"
          type="bar"
          color="#ffaa66" />
          <ValueAxis defaultVisualRange={{ startValue: 0, endValue: 100 }} />
          <ArgumentAxis>
              <Label
                  title="Projects"
              />
          </ArgumentAxis>
      </Chart>
    </Paper>


  );
}
