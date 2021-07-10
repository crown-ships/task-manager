import UT_Table from "../tables/tasks/UT_Table"
import AT_Table from "../tables/tasks/AT_Table"
import ST_Table from "../tables/tasks/ST_Table"
import SAT_Table from "../tables/tasks/SAT_Table"

const TaskTablePicker = (props) => {
  const user = props.auth.user;
  if (user.role === "admin"){

    return(
      <AT_Table {...props}/>
    );
  }
  if (user.role === "user"){

    return(
      <UT_Table {...props}/>
    );
  }
  if (user.role === "super-admin"){

    return(
      <SAT_Table {...props}/>
    );
  }
  if (user.role === "supervisor"){

    return(
      <ST_Table {...props}/>
    );
  }
}
export default TaskTablePicker;
