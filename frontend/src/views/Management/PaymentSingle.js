import React from "react";

const PaymentSingle = ({ payment }) => {
  return (
      <tr>
        <td>{payment._id}</td>
        <td>{payment.course}</td>
        <td>{payment.student}</td>
        <td>{payment.amount}</td>
        <td>{payment.status}</td>
        <td>{payment.createdAt}</td>
      </tr>
  );
};

export default PaymentSingle;
