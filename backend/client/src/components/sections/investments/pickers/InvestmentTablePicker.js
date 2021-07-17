import UI_Table from "../tables/investments/UI_Table"
import AI_Table from "../tables/investments/AI_Table"
import SAI_Table from "../tables/investments/SAI_Table"
import SI_Table from "../tables/investments/SI_Table"

const InvestmentTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "super-admin"){
      return(
        <SAI_Table {...props}/>
      )
  }

  if (user.role === "admin"){
    console.log("admin");
    return(
      <AI_Table {...props}/>
    );
  }
  if (user.role === "user" || user.role === "supervisor"){
    console.log("user");
    return(
      <SI_Table {...props}/>
    );
  }
}
export default InvestmentTablePicker;
