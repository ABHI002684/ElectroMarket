const Payment=require('../models/Payment');

const Razorpay=require('razorpay');

const instance=new Razorpay({
    key_id:"rzp_test_xzfXwMETyJOkVZ",
    key_secret:"h7NGh5JcAiAVuDtJXKkLyCT9"
})

//checkout
const checkout=async(req,res)=>{
    const {amount,cartItems,userShipping,userId}=req.body;

    const option={
        amount:amount*100,// amount in smallest units currency
        currency:"INR",
        receipt:`receipt_${Date.now()}`
    }

    const order= await instance.orders.create(option);

    res.json({
        orderId:order.id,
        amount:amount,
        cartItems,
        userShipping,
        userId,
        payStatus:"created"
    })
}

// verify and save to database
const verify = async (req,res) =>{
    const {paymentId,
        orderId,
        paymentSign,
        amount,
        orderItems,
        userId,
        userShipping}=req.body;

        let orderConfirm=await Payment.create({
            paymentId,
        orderId,
        paymentSign,
        amount,
        orderItems,
        userId,
        userShipping,
        payStatus:"paid"
        });

        res.json({message:"payment successful",success:true,orderConfirm});
}

//user specific order
const userOrder = async (req,res) =>{
    let userId=req.user._id.toString();
    let orders=await Payment.find({userId:userId}).sort({orderDate:-1});
    res.json(orders);
}

//all orders
const allOrders = async (req,res) =>{
  
    let orders=await Payment.find().sort({orderDate:-1});
    res.json(orders);
}

module.exports={checkout,verify,userOrder,allOrders};