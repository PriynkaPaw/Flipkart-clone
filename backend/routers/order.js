const express = require('express');
const { populate } = require('../models/order');
const Order = require('../models/order')
const OrderItem = require('../models/order_item')
const Razorpay = require('razorpay')
const router = express.Router()
require('dotenv').config()
router.get('/', async (req, res) => {
    try {
        const OrderList = await Order.find()
            .populate('user', 'name phone')
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product'
                }
            }) 


        if (!OrderList || OrderList.length === 0) {
            return res.status(404).json({ success: false, message: 'Orders not found' });
        }

        res.status(200).send(OrderList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name phone')
        .populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'
            }
        })

    if (!order) {
        res.status(500).json({ success: false, message: 'Order not found' })
    }

    res.status(200).send(order)
})

router.post('/', async (req, res) => {
    try {
        const orderItems = req.body.orderItems || []; // Default to empty array if orderItems is undefined
        const orderItemIds = await Promise.all(orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product
            });

            newOrderItem = await newOrderItem.save();
            return newOrderItem._id;
        }));

        const totalPrices = await Promise.all(orderItemIds.map(async(orderItemId) => {
            const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
            const totalPrice = orderItem?.product?.price * orderItem.quantity;
            return totalPrice;
        }));

        const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

        let order = new Order({
            orderItems: orderItemIds,
            shippingAddress: req.body.shippingAddress,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            // totalPrice: totalPrice,
            user: req.body.user,
        });

        order = await order.save();

        if (!order) {
            return res.status(400).json({ success: false, message: 'Details not added' });
        }

        return res.status(200).send(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});




router.put('/:id', async(req,res)=>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
           status:req.body.status
        },
        {new:true}  
    )

    if(!order){
        return res.status(500).json({success: false, message:'the Order can not updated'})
    }

    res.status(200).send(order)
})


router.delete('/:id', async (req,res)=>{

    Order.findByIdAndDelete(req.params.id).then(async(order)=>{
        if(order){
            await order.orderItems.map(async(orderItem)=>{
                await OrderItem.findByIdAndDelete(orderItem)
            })
            return res.status(200).json({success:true, message:'order has been deleted'})
        }
        else{
            return res.status(404).json({success: false, message:'order not found'})
        }
    }).catch((err)=>{
              return res.status(400).json({success:false, error:err})
    })

})

// API for finding Total sales

router.get('/get/totalsales', async(req,res)=>{
    const totalSales = await Order.aggregate([
        {$group :{_id:null, totalsales:{$sum: '$totalPrice'}}}
    ])

    if(!totalSales){
        res.status(400).json({success:false, message:'Can not get total sales'})
    }

    res.status(200).send({totalSales : totalSales.pop().totalsales})
})

// for payment

router.post('/pay', async(req,res)=>{
    
    try {
        const razorpay = new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        })
      
        const options = req.body;
        const order = await razorpay.orders.create(options)
      
        if(!order){
          return  res.status(500).send("ERROR")
        }
        res.json(order)
        
    } catch (error) {
        res.status(500).send("Error ")
    }
  
})

module.exports = router