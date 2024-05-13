import React, { useEffect, useRef } from "react";

const Paypal = () => {
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Course",
                amount: {
                  currency_code: "USD",
                  value: 4,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          console.log("Order success");
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default Paypal;
