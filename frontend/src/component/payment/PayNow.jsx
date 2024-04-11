import React from 'react'
import OrderDetails from './OrderDetails'
function PayNow() {
const paymentHandler = async(e)=>{
    const amount = 50000
    const currency ="INR"
    const receiptId = "qwsaq1"
    const response = await fetch("http://localhost:4441/api/v1/order/pay",{
        method:"POST",
       body: JSON.stringify({
           amount,
           currency,
           receipt:receiptId
       }),
       headers:{
           "Content-Type":"application/json"
       }
    }
    )

    const order = await response.json();
    console.log(order);

    var options = {
        "key": "rzp_test_LmqAFpCfXgEafs", // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        "name": "Acme Corp", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": order._id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com", 
            "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();


}
  return (
    <div>
        <button onClick={paymentHandler} className='p-2 bg-blue-500 rounded-[10px] mt-4 w-full'>Pay Now</button>
        {/* <OrderDetails /> */}
    </div>
  )
}

export default PayNow