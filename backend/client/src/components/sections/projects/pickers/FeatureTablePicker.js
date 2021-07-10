import UF_Table from "../tables/features/UF_Table"
import AF_Table from "../tables/features/AF_Table"
import SF_Table from "../tables/features/SF_Table"
import SAF_Table from "../tables/features/SAF_Table"

const FeatureTablePicker = (props) => {
  const user = props.auth.user;
  if (user.role === "super-admin"){

    return(
      <SAF_Table {...props}/>
    );
  }
  if (user.role === "user"){

    return(
      <UF_Table {...props}/>
    );
  }
  if (user.role === "admin"){

    return(
      <AF_Table {...props}/>
    );
  }
  if (user.role === "supervisor"){

    return(
      <SF_Table {...props}/>
    );
  }
}
export default FeatureTablePicker;
