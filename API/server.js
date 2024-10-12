const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const userRouter=require('./routes/user');
const productRouter=require('./routes/product');
const cartRouter=require('./routes/cart');
const addressRouter=require('./routes/address');
const paymentRouter=require('./routes/payment');
const cors=require('cors');
const app=express();
const PORT=process.env.PORT || 1000;

app.use(bodyParser.json());

//using cors to connect backend and frontend
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
//home testing route
app.get('/',(req,res)=>res.json({message:"this is a home route"}));

//using user's router
app.use('/api/user',userRouter);

//using product's router
app.use('/api/product',productRouter);

//using cart's router
app.use('/api/cart',cartRouter);

//using address's router
app.use('/api/address',addressRouter);

//using payment router
app.use('/api/payment',paymentRouter);

mongoose.connect(
    "mongodb+srv://abhishek002684:uR94nwtbxuSoeWj1@cluster0.etykbra.mongodb.net/",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName:"ElectroMarket"
    }
).then(()=>console.log("MongoDb Connected Successfully ...!")).catch((err)=>
console.log(err));


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});

