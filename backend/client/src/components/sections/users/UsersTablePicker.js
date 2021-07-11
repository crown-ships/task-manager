import SUsersTable from "./SUsersTable"
import UsersTable from "./UsersTable"

const UsersTablePicker = (props) => {
  const user = props.auth.user;
  if (user.role === "super-admin"){

    return(
      <UsersTable {...props}/>
    );
  }
  if (user.role === "admin"){

    return(
      <UsersTable {...props}/>
    );
  }
  if (user.role === "supervisor"){

    return(
      <SUsersTable {...props}/>
    );
  }
}
export default UsersTablePicker;
