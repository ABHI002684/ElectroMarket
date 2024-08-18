const express=require('express');
const {addToCart,userCart,removeProductFromCart,clearCart,decreaseProductQty}=require('../controllers/cart');
const router=express.Router();
const Authenticated=require('../middlewares/Auth');
//add to cart
router.post('/add',Authenticated,addToCart);

// get user cart
router.get('/user',Authenticated,userCart);

// remove product from cart
router.delete('/remove/:productId',Authenticated,removeProductFromCart);

//clear cart
router.delete('/clear',Authenticated,clearCart);

//decrease item qty
router.post('/--qty',Authenticated,decreaseProductQty);

module.exports=router;