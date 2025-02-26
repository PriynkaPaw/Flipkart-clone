const Category = require('../models/category')
const express = require('express')
const router = express.Router();

router.get('/', async (req,res)=>{

    const categoryList = await Category.find();

    if(!categoryList){
        res.status(500). json({success: false})
    }

    res.status(200).send(categoryList);

})

router.get('/:id', async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category){
        return res.status(500).json({success:false , message:'The category with given id is not found'})
    }

    res.status(200).send(category)

})

router.post('/', async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

   category = await category.save()

   if(!category){
       return res.status(404).send('the category cnnot be created')
   }

   res.send(category)
})


router.put('/:id', async(req,res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
           name: req.body.name,
           icon: req.body.icon,
           color: req.body.color
        },
        {new:true}  // here i want to get new updated data show in the response
    )

    if(!category){
        return res.status(500).json({success: false, message:'the category can not to updated'})
    }

    res.status(200).send(category)
})

router.delete('/:id', async (req,res)=>{

    Category.findByIdAndDelete(req.params.id).then((category)=>{
        if(category){
            return res.status(200).json({success:true, message:'category has been deleted'})
        }
        else{
            return res.status(404).json({success: false, message:'category not found'})
        }
    }).catch((err)=>{
              return res.status(400).json({success:false, error:err})
    })

})

module.exports = router