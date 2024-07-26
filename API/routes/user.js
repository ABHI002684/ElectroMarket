const express=require('express');
const router=express.Router();
const {register,login,users}=require('../controllers/user');

//register user
router.post('/register',register);

//login user
router.post('/login',login);

//get all user
router.get('/all',users);

module.exports=router;