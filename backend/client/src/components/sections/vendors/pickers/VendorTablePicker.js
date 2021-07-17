import UV_Table from "../tables/vendors/UV_Table"
import AV_Table from "../tables/vendors/AV_Table"
import SV_Table from "../tables/vendors/SV_Table"
import SAV_Table from "../tables/vendors/SAV_Table"

const VendorTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "super-admin"){
    console.log("super-admin");
    return(
      <SAV_Table {...props}/>
    );
  }
  if (user.role === "supervisor"){
    console.log("supervisor");
    return(
      <SV_Table {...props}/>
    );
  }
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
