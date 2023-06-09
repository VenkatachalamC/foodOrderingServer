const mongoose=require('mongoose');

const MenuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        ContentType:String
    }
})

const MenuModel=mongoose.model("menu",MenuSchema);
module.exports=MenuModel;