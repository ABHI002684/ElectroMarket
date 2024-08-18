const Cart=require('../models/cart');

// add a product to cart
const addToCart=async (req,res)=>{
    const {productId,title,price,qty,imgSrc}=req.body;

    const userId=req.user;
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
    const userId=req.user;

    const cart=await Cart.findOne({userId});

    if(!cart){
        return res.json({message:"Cart not found"});
    }

    res.json({message:"user cart",cart});
}

// remove product from cart
const removeProductFromCart=async (req,res)=>{
    const productId=req.params.productId;
    const userId=req.user;

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
    
    const userId=req.user;

    const cart=await Cart.findOne({userId});

    if(!cart){
        cart = new Cart({items:[]});
    }else{
        cart.items=[];
    }
   

    await cart.save();
    res.json({message:"cart cleared",cart});
}

// decrease qty from product
const decreaseProductQty=async (req,res)=>{

    const {productId,qty}=req.body;

    const userId=req.user;
    let cart=await Cart.findOne({userId});

    if(!cart){
        cart=new Cart({userId,items: [] });
    }
    try{
        const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId)
    if(itemIndex>-1){
        const item=cart.items[itemIndex];

        if(item.qty>qty){
            const pricePerUnit=item.price/item.qty;

            item.qty -=qty;
            item.price-=pricePerUnit*qty;
        }else{
            cart.items.splice(itemIndex,1);
        }
    }else{
        return res.json({message:"invalid product id"});
    }
    

    await cart.save();
    res.json({message:"Items qty decreased",cart});
    }
    catch(err){
        res.json({message:err.message});
    }
}
module.exports={addToCart,userCart,removeProductFromCart,clearCart,decreaseProductQty};