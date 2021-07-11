import UR_Table from "../tables/returns/UR_Table"
import AR_Table from "../tables/returns/AR_Table"


const ReturnTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin" || user.role === "super-admin"){
    console.log("admin");
    return(
      <AR_Table {...props}/>
    );
  }
  if (user.role === "user" || user.role === "supervisor"){
    console.log("user");
    return(
      <UR_Table {...props}/>
    );
  }
}
export default ReturnTablePicker;
