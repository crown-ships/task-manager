import UP_Table from "../tables/projects/UP_Table"
import AP_Table from "../tables/projects/AP_Table"


const ProjectTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin"){
    console.log("admin");
    return(
      <AP_Table {...props}/>
    );
  }
  if (user.role === "user"){
    console.log("user");
    return(
      <UP_Table {...props}/>
    );
  }
}
export default ProjectTablePicker;
