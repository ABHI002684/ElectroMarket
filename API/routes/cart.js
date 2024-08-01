const express=require('express');
const {addToCart,userCart,removeProductFromCart,clearCart,decreaseProductQty}=require('../controllers/cart');
const router=express.Router();
const Authenticated=require('../middlewares/isAuthenticated');
//add to cart
router.post('/add',Authenticated,addToCart);

// get user cart
router.get('/user',userCart);

// remove product from cart
router.delete('/remove/:productId',removeProductFromCart);

//clear cart
router.delete('/clear',clearCart);

//decrease item qty
router.post('/--qty',decreaseProductQty);

module.exports=router;