const Cart=require('../models/cart');

// add a product to cart
const addToCart=async (req,res)=>{
    const {productId,title,price,qty,imgSrc}=req.body;

    const userId="66a3a8c3e320087a58b32035";
    let cart=await Cart.findOne({userId});

    if(!cart){
        cart=new Cart({userId,items: [] });
    }

    const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId)
    if(itemIndex>-1){
        cart.items[itemIndex].qty+=qty;
        cart.items[itemIndex].price+=qty*price;
    }else{
        cart.items.push({productId,title,price,qty,imgSrc});
    }
    

    await cart.save();
    res.json({message:"Items added to Cart",cart});
}

// get user cart
const userCart=async (req,res)=>{
    const userId="66a3a8c3e320087a58b32035";

    const cart=await Cart.findOne({userId});

    if(!cart){
        return res.json({message:"Cart not found"});
    }

    res.json({message:"user cart",cart});
}

// remove product from cart
const removeProductFromCart=async (req,res)=>{
    const productId=req.params.productId;
    const userId="66a3a8c3e320087a58b32035";

    const cart=await Cart.findOne({userId});

    if(!cart){
        return res.json({message:"Cart not found"});
    }
    cart.items=cart.items.filter((item)=>item.productId.toString() !== productId);

    await cart.save();
    res.json({message:"product remove from cart",cart});
}

// remove product from cart
const clearCart=async (req,res)=>{
    
    const userId="66a3a8c3e320087a58b32035";

    const cart=await Cart.findOne({userId});

    if(!cart){
        cart = new Cart({items:[]});
    }else{
        cart.items=[];
    }
   

    await cart.save();
    res.json({message:"cart cleared",cart});
}

module.exports={addToCart,userCart,removeProductFromCart,clearCart};