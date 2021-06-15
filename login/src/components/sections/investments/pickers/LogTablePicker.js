import UL_Table from "../tables/logs/UL_Table"
import AL_Table from "../tables/logs/AL_Table"


const ReturnTablePicker = (props) => {
  const user = props.auth.user;

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
export default ReturnTablePicker;
