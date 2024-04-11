const express = require('express')
const CreateUser = require('../models/createUser')
const route = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createUser = require('../models/createUser')


route.get('/', async (req, res) => {
    const userList = await CreateUser.find().select("-passwordHash")
        
    if(!userList){
        return res.status(500).json({success:false})
    }

    res.status(200).send(userList)

})

route.get('/:id', async(req, res)=>{
     const user = await CreateUser.findById(req.params.id).select('-passwordHash')
     if(!user){
         return res.status(404).json({success:false, message:'user not found'})
     }
   
     res.status(200).send(user)
})

route.post('/',async(req,res)=>{

    let user = new CreateUser({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password),
        phone: req.body.phone,
        role: req.body.role,
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,

    })
   user = await user.save() 

   if(!user){
       return res.status(404).json({success:false, message:'User cannot created Found'})
   }

   res.status(200).send(user)
})


route.post('/login', async(req,res)=>{
    const user = await CreateUser.findOne({email: req.body.email})
    const secret = process.env.SECRET_KEY
console.log("Userrr", user)
    if(!user){  
        return res.status(400).json({success:false, message:'User not found'})
    }

    // if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    if (user) {

        const secret = process.env.SECRET_KEY;

        const token = jwt.sign(
            {
                userId: user._id, 
                email: user.email 
            },
            secret,
            {
                expiresIn: '10m'
            }
        );
        const refreshToken = jwt.sign({
            userId: user._id, 
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
 

        return res.status(200).send({ token });
    } else {

       return res.status(400).json({ success: false, message: 'Incorrect email or password' });

 
    }
    // res.status(200).send(user)
    // return res.status(200).send({email:user.email})

    
    
})


route.delete('/:id', async (req,res)=>{

    createUser.findByIdAndDelete(req.params.id).then((user)=>{
        if(user){
            return res.status(200).json({success:true, message:'user has been deleted'})
        }
        else{
            return res.status(404).json({success: false, message:'user not found'})
        }
    }).catch((err)=>{
              return res.status(400).json({success:false, error:err})
    })

})


module.exports = route