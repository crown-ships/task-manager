import Button from '@material-ui/core/Button';



export default function ProjectDetails(props) {
 console.log(props.location.props.projectID);
 return (
   <>
   <Button component={Link} to={{pathname: "/projects"}}>{props.location.props.projectID}</Button>
   </>
 );

}
