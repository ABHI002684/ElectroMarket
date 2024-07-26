const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const userRouter=require('./routes/user');
const app=express();
const PORT=1000;

app.use(bodyParser.json());
//home testing route
app.get('/',(req,res)=>res.json({message:"this is a home route"}));

//use router
app.use('/api/user',userRouter);

mongoose.connect(
    "mongodb+srv://abhishek002684:uR94nwtbxuSoeWj1@cluster0.etykbra.mongodb.net/",{
        dbName:"ElectroMarket"
    }
).then(()=>console.log("MongoDb Connected Successfully ...!")).catch((err)=>
console.log(err));


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});

