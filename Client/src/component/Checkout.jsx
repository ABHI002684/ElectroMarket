import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/AppContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import TableProduct from './TableProduct';
const Checkout = () => {
  const {cart,userAddress,url,user,clearCart}=useContext(AppContext);

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate=useNavigate();

  useEffect(() => {
    let qty=0;
    let price=0;
    if(cart?.items){
      for(let i=0;i<cart?.items?.length;i++){
        qty+=cart.items[i].qty;
        price+=cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  const handlePayment= async ()=>{
    try{
      const orderResponse= await axios.post(`${url}/payment/checkout`,{
        amount:price,
        qty:qty,
        cartItems:cart?.items,
        userShipping:userAddress,
        userId:user._id
      });

      // console.log("order response",orderResponse);

      const {orderId,amount:orderAmount}=orderResponse.data;

      const options = {
        "key": "rzp_test_xzfXwMETyJOkVZ", // Enter the Key ID generated from the Dashboard
        "amount": orderAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "ElectroMarket",
        "description": "Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response){
          const paymentData={
            paymentId:response.razorpay_payment_id,
            orderId:response.razorpay_order_id,
            paymentSign:response.razorpay_signature,
            amount:orderAmount,
            orderItems:cart?.items,
            userId:user._id,
            userShipping:userAddress
          }

           const api=await axios.post(`${url}/payment/verify-payment`,
            paymentData);

            console.log("razorpay res ",api.data);
            if(api.data.success){
              clearCart();
              navigate('/orderconfirmation');
            }
            
        },
        "prefill": {
            "name": "",
            "email": "",
            "contact": ""
        },
        "notes": {
            "address": "Uttam Nagar Delhi"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
   const rzp = new window.Razorpay(options);
   rzp.open();
    }
    catch(err){
      console.log(err);
    }
  }
 

  // console.log("my cart ",cart)
  return (
    <>
    <div className="container  my-3">
      <h1 className='text-center'>Order Summary</h1>

      <table className="table table-bordered border-primary bg-dark">
  <thead className='bg-dark'>
    <tr>
      <th scope="col" className='text-center bg-dark text-light'>
        Product details
      </th>
      
      <th scope="col" className='text-center bg-dark text-light'>
        Shipping Address
      </th>
    </tr>
  </thead>
  <tbody className='bg-dark'>
    <tr>
      
      <td className='bg-dark text-light'>
    <TableProduct cart={cart}/>
      </td>
      <td className='bg-dark text-light'>
        <ul style={{fontWeight:'bold'}}>
          <li>Name:{" "}{userAddress?.fullName}</li>
          <li>Phone No :{" "}{userAddress?.phoneNumber
          }</li>
          <li>Country:{" "}{userAddress?.country}</li>
          <li>State:{" "}{userAddress?.state}</li>
          <li>Pincode:{" "}{userAddress?.pincode}</li>
          <li>Address:{" "}{userAddress?.address}</li>
          
        </ul>
      </td>
      
    </tr>
  </tbody>
</table>

    </div>
    <div className="container text-center my-5">
      <button className="btn btn-secondary btn-lg" 
      style={{fontWeight:'bold'}}
      onClick={handlePayment}
      >
        Proceed To Pay
        </button>
    </div>
    
    </>
  )
}

export default Checkout;
