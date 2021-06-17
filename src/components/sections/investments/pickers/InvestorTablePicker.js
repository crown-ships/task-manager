// import UI_Table from "../tables/investors/UI_Table"
import AInv_Table from "../tables/investors/AInv_Table"


const InvestorTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin"){
    console.log("admin");
    return(
      <AInv_Table {...props}/>
    );
  }
  // if (user.role === "user"){
  //   console.log("user");
  //   return(
  //     <UI_Table {...props}/>
  //   );
  // }
}
export default InvestorTablePicker;
