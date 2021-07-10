import UP_Table from "../tables/projects/UP_Table"
import AP_Table from "../tables/projects/AP_Table"
import SAP_Table from "../tables/projects/SAP_Table"
import SP_Table from "../tables/projects/SP_Table"

const ProjectTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "super-admin"){

    return(
      <SAP_Table {...props}/>
    );
  }
  if (user.role === "admin"){

    return(
      <AP_Table {...props}/>
    );
  }
  if (user.role === "supervisor"){

    return(
      <SP_Table {...props}/>
    );
  }
  if (user.role === "user"){

    return(
      <UP_Table {...props}/>
    );
  }
}
export default ProjectTablePicker;
