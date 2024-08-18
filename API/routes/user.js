const express=require('express');
const router=express.Router();
const {register,login,users,profile}=require('../controllers/user');
const Authenticated=require('../middlewares/Auth');

//register user
router.post('/register',register);

//login user
router.post('/login',login);

//get all user
router.get('/all',users);

// get user profile
router.get('/profile',Authenticated,profile);
module.exports=router;