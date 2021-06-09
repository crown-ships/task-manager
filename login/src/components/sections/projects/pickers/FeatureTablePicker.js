import UF_Table from "../tables/features/UF_Table"
import AF_Table from "../tables/features/AF_Table"


const FeatureTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin"){
    console.log("admin");
    return(
      <AF_Table {...props}/>
    );
  }
  if (user.role === "user"){
    console.log("user");
    return(
      <UF_Table {...props}/>
    );
  }
}
export default FeatureTablePicker;
