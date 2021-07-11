import UI_Table from "../tables/investments/UI_Table"
import AI_Table from "../tables/investments/AI_Table"


const InvestmentTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin" || user.role === "super-admin"){
    console.log("admin");
    return(
      <AI_Table {...props}/>
    );
  }
  if (user.role === "user" || user.role === "supervisor"){
    console.log("user");
    return(
      <UI_Table {...props}/>
    );
  }
}
export default InvestmentTablePicker;
