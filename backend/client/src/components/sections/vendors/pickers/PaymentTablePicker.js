import UPay_Table from "../tables/payments/UPay_Table"
import APay_Table from "../tables/payments/APay_Table"


const PaymentTablePicker = (props) => {
  const user = props.auth.user;

  if (user.role === "admin" || user.role === "super-admin"){
    console.log("admin");
    return(
      <APay_Table {...props}/>
    );
  }
  if (user.role === "user" || user.role === "supervisor"){
    console.log("user");
    return(
      <UPay_Table {...props}/>
    );
  }
}
export default PaymentTablePicker;
