import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const t = [{
  taskName: "",
  featureID: ""
}];
const f = [{
  featureName: "",
  _id: ""
}];

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function ProjectPopup(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const [linkedFeatures, setLinkedFeatures] = React.useState(f);
  const [linkedTasks, setLinkedTasks] = React.useState(t);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  React.useEffect(async () => {
    const fullFeatures = await props.getAllFeatures({email:props.auth.user.email, auth: props.auth.isAuthenticated}, props.history);
    const fullTasks = await props.getAllTasks({email:props.auth.user.email, auth: props.auth.isAuthenticated}, props.history);

    const filteredFeatures = fullFeatures.data.map(function(item) {
      if(item.projectID === props.projectDisplay._id) {
        return item;
      }
      else {
        return "0";
      }
    });

    const filteredTasks = fullTasks.data.map(function(item) {
      if(item.projectID === props.projectDisplay._id) {
        return item;
      }
      else {
        return "0";
      }
    });

    var j;
    var len = 0;
    var trimFeatures = [];
    for(j=0; j<filteredFeatures.length; j++) {
      if(filteredFeatures[j] !== "0"){
        trimFeatures[len++] = filteredFeatures[j];
      }
    }

    var i;
    var count = 0;
    var trimTasks = [];
    for(i=0; i<filteredTasks.length; j++) {
      if(filteredTasks[i] !== "0"){
        trimTasks[count++] = filteredTasks[j];
      }
    }

    setLinkedTasks(trimTasks);
    setLinkedFeatures(trimFeatures);
    console.log(trimTasks);
    console.log(trimFeatures)
  },[]);


  return (
    <React.Fragment>
      <Paper>
        <Grid item xs = {12}>
          <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Collapsible Group Item #1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Collapsible Group Item #2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
          </Accordion>
      </Grid>
    </Paper>
  </React.Fragment>

  );
}

// <Accordion square expanded={expanded === feature._id} onChange={handleChange(feature._id)}>
//   <AccordionSummary aria-controls="panel-content" id={feature._id}>
//     <Typography>{feature.featureName}</Typography>
//   </AccordionSummary>
//   <AccordionDetails>
//   {linkedTasks.map(task => (
//     <Typography>{(task.featureID !== feature._id)?null: task.taskName}</Typography>
//   ))}
//   </AccordionDetails>
// </Accordion>
