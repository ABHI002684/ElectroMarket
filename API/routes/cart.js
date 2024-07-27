const express=require('express');
const {addToCart,userCart,removeProductFromCart,clearCart}=require('../controllers/cart');
const router=express.Router();

//add to cart
router.post('/add',addToCart);

// get user cart
router.get('/user',userCart);

// remove product from cart
router.delete('/remove/:productId',removeProductFromCart);

//clear cart
router.delete('/clear',clearCart);

module.exports=router;