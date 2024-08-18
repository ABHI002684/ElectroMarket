const Address=require('../models/Address');

const addAddress= async (req,res) =>{
    let {fullName,address,city,state,country,pincode,phoneNumber}=req.body;
    let  userId=req.user;
    let userAddress=await Address.create({
        userId,
        fullName,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber
    });
    return res.json({message:"Address Added",userAddress});
};

const getAddress= async (req,res)=>{
    let address=await Address.find({userId:req.user}).sort({createdAt:-1});//-1 is used for descending order sorting
    return res.json({message:"address",userAddress:address[0]});
};
module.exports={addAddress,getAddress};