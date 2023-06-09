const mongoose=require('mongoose');
const express=require('express')
const bodyParser=require('body-parser')
const multer=require('multer');
const req = require('express/lib/request');
const MenuModel=require('./models/menu');
const UserModel=require('./models/users')
const OrderModel=require('./models/order')

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const storage=multer.memoryStorage();
const upload=multer({storage:storage})

mongoose.connect("mongodb+srv://test:test123@cluster0.dbsxzgs.mongodb.net/OnlinefoodOrder").then(result=>{
    app.listen(8001,()=>console.log("server running on 8001"));  
})

app.get('/getcat/:category',(req,res)=>{
    const category=req.params.category;
    MenuModel.find({category:category},{category:0,image:0})
    .then(result=>{
        res.send(result);
    })
})

app.get('/orders/:username',(req,res)=>{
    const username=req.params.username;
    OrderModel.find({username:username},{username:0})
    .then(result=>{
        res.send(result)
    })
})

app.post('/signin',(req,res)=>{
    UserModel.find({name:req.body.name,password:req.body.password})
    .then(result=>{
        if(result.length>0){
            res.json({status:"ok"})
        }
        else{
            console.log(result)
            res.json({status:"invalid user"})
        } 
    })
})

app.post('/signup',(req,res)=>{
    const user=new UserModel({
        name:req.body.name,
        password:req.body.password
    })
    user.save()
    .then(result=>{  
        res.json({status:"ok"})  
    })
})

app.post('/item',upload.single('image'),(req,res)=>{
    const item=new MenuModel({
        name:req.body.name,
        category:req.body.category,
        price:Number(req.body.price),
        image:{
            data:req.file.buffer,
            ContentType:req.file.mimetype,
        }
    })
    item.save().then(
        result=>{
            res.send("item added to menu")
        }
    )
})

app.post('/order',(req,res)=>{
    var date=new Date();
    const order=new OrderModel({
        username:req.body.username,
        cost:req.body.cost,
        date:String(date.getDate())+"/"+String(date.getMonth())+"/"+String(date.getFullYear()),
        time:String(date.getHours())+":"+String(date.getMinutes())
    })
    order.save()
    .then(res.json({status:"ok"}))
})


app.get("/image/:name",(req,res)=>{
    MenuModel.find({name:req.params.name},{image:1,_id:0})
    .then(result=>{
        if(result.length>0){
        res.set("Content-Type",result[0].image.ContentType)
        res.send(result[0].image.data);
        }
    })
})