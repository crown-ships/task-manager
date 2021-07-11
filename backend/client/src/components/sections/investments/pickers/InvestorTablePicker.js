import UInv_Table from "../tables/investors/UInv_Table"
import AInv_Table from "../tables/investors/AInv_Table"


const InvestorTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin" || user.role === "super-admin"){
    console.log("admin");
    return(
      <AInv_Table {...props}/>
    );
  }
  if (user.role === "user" || user.role === "supervisor"){
    console.log("user");
    return(
      <UInv_Table {...props}/>
    );
  }
}
export default InvestorTablePicker;
