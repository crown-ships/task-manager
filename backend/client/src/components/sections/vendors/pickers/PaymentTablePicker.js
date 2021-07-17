import SPay_Table from "../tables/payments/SPay_Table"
import SAPay_Table from "../tables/payments/SAPay_Table"
import UPay_Table from "../tables/payments/UPay_Table"
import APay_Table from "../tables/payments/APay_Table"

const PaymentTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "super-admin"){
    console.log("super-admin");
    return(
      <SAPay_Table {...props}/>
    );
  }
  if (user.role === "supervisor"){
    console.log("supervisor");
    return(
      <SPay_Table {...props}/>
    );
  }
  if (user.role === "admin"){
    console.log("admin");
    return(
      <APay_Table {...props}/>
    );
  }
  if (user.role === "user"){
    console.log("user");
    return(
      <UPay_Table {...props}/>
    );
  }
}
export default PaymentTablePicker;
