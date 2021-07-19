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

function getFeatures (props) {
    return props.getAllFeatures({email:props.auth.user.email, auth:props.auth.isAuthenticed}, props.history)
    }

export default function FGraphs(props) {

  const [features, setFeatures] = React.useState([]);

  React.useEffect(async () => {
    const d = await getFeatures(props);
    var data = d.data;
    console.log(data);

    if (props.project === "") {
      var complist = d.data.map(function(item) {
        return item;
      });
      console.log(complist);
      setFeatures(complist)
    }
    else {
      var complist = d.data.map(function(item) {
        console.log(props.project);
        console.log(item);
        if(props.project === item.projectName) {
          return {featureName: item.featureName, percentComplete: item.percentComplete};
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
      setFeatures(trimlist)
    }
  },[props.project]);

  return (
    <Paper>
    <Chart id="chart" dataSource={features} title="Milestone Progress">
        <Series
          valueField="percentComplete"
          argumentField="featureName"
          name="Milestones"
          type="bar"
          color="#ffaa06" />
          <ValueAxis defaultVisualRange={{ startValue: 0, endValue: 100 }} />
      </Chart>
    </Paper>


  );
}
