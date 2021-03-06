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



function getFeatures (props) {
    return props.getAllFeatures({email:props.auth.user.email, auth:props.auth.isAuthenticed}, props.history)
}

export default function FPie(props) {

  const [features, setFeatures] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [pie, setPie] = React.useState([]);
  const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
    });

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
      setFeatures(trimlist)
    }
  },[props.project]);

  React.useEffect(() => {
    var i;
    var completed = 0;
    var ongoing = 0;
    for(i=0; i< features.length; i++) {
      if(features[i].percentComplete == 100){
        completed++;
      }
      else if(features[i].percentComplete<100) {
        ongoing++;
      }
    }
    var t = completed + ongoing;
    setTotal(t);
    setPie([
      {count: "Completed", val: completed},
      {count: "Ongoing", val: ongoing}
    ])
  },[features]);



  function customizeTooltip(arg) {
      return {
        text: `${(arg.valueText/total)*100}%`
      };
    }
  return (
    <>
    <Paper>
    <PieChart
        id="pie"
        type="doughnut"
        title="Milestones Overview"
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
          margin={30}
          horizontalAlignment="right"
          verticalAlignment="top"
        />
        <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
        </Tooltip>
      </PieChart>
    </Paper>
    </>
  );
}
