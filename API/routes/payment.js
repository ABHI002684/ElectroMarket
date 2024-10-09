const express=require('express');
const {checkout,verify,userOrder,allOrders}=require('../controllers/payment');
const router=express.Router();
const Authenticated =require('../middlewares/Auth');
//checkout
router.post('/checkout',checkout);

//verify payment and save to database
router.post('/verify-payment',verify);

//user specific order
router.get('/userorder',Authenticated,userOrder);

//all orders
router.get('/Orders',Authenticated,allOrders);

module.exports=router