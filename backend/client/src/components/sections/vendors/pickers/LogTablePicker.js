import UL_Table from "../tables/logs/UL_Table"
import AL_Table from "../tables/logs/AL_Table"
import SL_Table from "../tables/logs/SL_Table"
import SAL_Table from "../tables/logs/SAL_Table"

const LogTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "super-admin"){
    console.log("super-admin");
    return(
      <SAL_Table {...props}/>
    );
  }
  if (user.role === "supervisor"){
    console.log("supervisor");
    return(
      <SL_Table {...props}/>
    );
  }
  if (user.role === "admin"){
    console.log("admin");
    return(
      <AL_Table {...props}/>
    );
  }
  if (user.role === "user"){
    console.log("user");
    return(
      <UL_Table {...props}/>
    );
  }
}
export default LogTablePicker;
