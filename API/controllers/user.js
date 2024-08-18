const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//user register
const register=async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.json({message:"user already exist",success:false});
        }
        const hashPass=await bcrypt.hash(password,10)
        user=await User.create({name,email,password:hashPass});
        res.json({message:"user register successfully ...!",user,success:true})
    }
    catch(err){
        res.json({message:err.message});
    }
};

//user login
const login=async (req,res)=> {
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.json({message:"user not found",success:false});
        }

        const validPassword=await bcrypt.compare(password,user.password);

        if(!validPassword){
            return res.json({message:"Invalid Credentials",success:false});
        }

        const token=jwt.sign({userId:user._id},"!@#$%^&*()",{
            expiresIn:'365d'
        })
        res.json({message:`welcome ${user.name}`,token,success:true,user});
    }catch(err){
        // console.log(err);
        res.json({message:err.message});
    }
}

// get all users
const users=async (req,res)=>{
    try{
        let users=await User.find().sort({createdAt:-1});
        res.json(users);
    }catch(err){
        res.json({message:err.message,success:false});
    }
}

//get user profile
const profile= async (req,res)=>{
    res.json({user:req.user});
}
module.exports={register,login,users,profile};