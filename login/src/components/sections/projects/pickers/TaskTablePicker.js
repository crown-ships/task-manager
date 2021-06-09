import UT_Table from "../tables/tasks/UT_Table"
import AT_Table from "../tables/tasks/AT_Table"


const TaskTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin"){
    console.log("admin");
    return(
      <AT_Table {...props}/>
    );
  }
  if (user.role === "user"){
    console.log("user");
    return(
      <UT_Table {...props}/>
    );
  }
}
export default TaskTablePicker;
