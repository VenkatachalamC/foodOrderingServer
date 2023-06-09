const mongoose=require('mongoose');


const OrderSchema=new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    }
})

const OrderModel=mongoose.model("order",OrderSchema)
module.exports=OrderModel;