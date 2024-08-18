const express=require('express');
const {addAddress,getAddress}=require('../controllers/address');
const authenticated=require('../middlewares/Auth');
const router=express.Router();

// add router
router.post('/add',authenticated,addAddress);

//get address
router.get('/get',authenticated,getAddress);
module.exports=router;