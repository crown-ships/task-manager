import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"


export default function ProjectDetails(props) {
 console.log(props.location.props.projectID);
 return (
   <>
   <Button component={Link} to={{pathname: "/projects"}}>{props.location.props.projectID}</Button>
   </>
 );

}
