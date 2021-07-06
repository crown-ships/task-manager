import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../../../../actions/authActions";
import { getAllCompanies, updateCompany } from "../../../../../actions/companyActions";
import { getAllProjects, deleteProject, updateProject, registerProject } from "../../../../../actions/projectActions";
import { getAllTasks, deleteTask, updateTask, registerTask ,updateAllTasks } from "../../../../../actions/taskActions";
import { getAllFeatures, deleteFeature, updateFeature, registerFeature, updateAllFeatures } from "../../../../../actions/featureActions";

const ProjectDetails = (props) => {
 console.log(props.location.props.projectID);
 return (
   <Button component={Link} to={{pathname: "/projects"}}>{props.location.props.projectID}</Button>
 );

}

ProjectsPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { updateAllFeatures,updateAllTasks, updateCompany, logoutUser, getAllProjects, getAllCompanies, deleteProject, updateProject, registerProject,getAllFeatures, deleteFeature, updateFeature, registerFeature,getAllTasks, deleteTask, updateTask, registerTask }
)(withRouter(ProjectsPage));
