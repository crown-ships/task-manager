import UV_Table from "../tables/vendors/UV_Table"
import AV_Table from "../tables/vendors/AV_Table"


const VendorTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin"){
    console.log("admin");
    return(
      <AV_Table {...props}/>
    );
  }
  if (user.role === "user"){
    console.log("user");
    return(
      <UV_Table {...props}/>
    );
  }
}
export default VendorTablePicker;
