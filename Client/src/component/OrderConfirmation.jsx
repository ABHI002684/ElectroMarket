import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/AppContext'
import { set } from 'mongoose';
import ShowOrderProduct from './ShowOrderProduct';
const OrderConfirmation = () => {
  const {userOrder}=useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});

  useEffect(() => {
    if(userOrder){
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder])
  
  console.log("latest order ",latestOrder);
  return (
    <>
    <div className="container my-3">
      <h1 className="text-center">Your Order has been confirm</h1>
      <h3 className="text-center">It will delivered soon</h3>
    </div>

    <>
    <div className="container ">
      

      <table className="table table-bordered border-primary bg-dark">
  <thead className='bg-dark'>
    <tr>
      <th scope="col" className='text-center bg-dark text-light'>
        OrderItems
      </th>
      
      <th scope="col" className='text-center bg-dark text-light'>
        OrderDetails & shippingAddress
      </th>
    </tr>
  </thead>
  <tbody className='bg-dark'>
    <tr>
      
      <td className='bg-dark text-light'>

        <ShowOrderProduct items={latestOrder?.orderItems} />
    {/* <TableProduct cart={cart}/> */}
      </td>
      <td className='bg-dark text-light'>
        <ul style={{fontWeight:'bold'}}>
          <li>Order ID:{" "}{latestOrder?.orderId}</li>
          <li>Payment ID:{" "}{latestOrder?.paymentId}</li>
          <li>Payment Status:{" "}{latestOrder?.payStatus}</li>
          <li>Name:{" "}{latestOrder?.userShipping?.fullName}</li>
          <li>Phone No :{" "}{latestOrder?.userShipping?.phoneNumber
          }</li>
          <li>Country:{" "}{latestOrder?.userShipping?.country}</li>
          <li>State:{" "}{latestOrder?.userShipping?.state}</li>
          <li>Pincode:{" "}{latestOrder?.userShipping?.pincode}</li>
          <li>Address:{" "}{latestOrder?.userShipping?.address}</li>
          
        </ul>
      </td>
      
    </tr>
  </tbody>
</table>

    </div>
    <div className="container text-center my-5">
      {/* <button className="btn btn-secondary btn-lg" 
      style={{fontWeight:'bold'}}
      
      >
        Proceed To Pay
        </button> */}
    </div>
    
    </>
    </>
  )
}

export default OrderConfirmation
