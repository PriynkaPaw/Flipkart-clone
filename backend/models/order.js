const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderItems:[{
     type: mongoose.Schema.Types.ObjectId,
     ref:'OrderItem',
     required: true
    }],
    shippingAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    },
    totalPrice:{
        type:Number,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    dateOrdered:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Order', orderSchema)