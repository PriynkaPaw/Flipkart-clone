const SubCategory = require('../models/subCategory')
const express = require('express')
const router = express.Router();
const Category = require('../models/category')
router.get('/', async (req,res)=>{

    const subCategoryList = await SubCategory.find().populate('category');

    if(!subCategoryList){
        res.status(500). json({success: false})
    }

    res.status(200).send(subCategoryList);

})

router.get('/:id', async(req,res)=>{
    const subcategory = await SubCategory.findById(req.params.id);

    if(!subcategory){
        return res.status(500).json({success:false , message:'The subcategory with given id is not found'})
    }

    res.status(200).send(subcategory)

})

router.post('/', async (req,res)=>{
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');
    let subcategory = new SubCategory({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
       category: req.body.category,
        
    })

   subcategory = await subcategory.save()

   if(!subcategory){
       return res.status(404).send('the subcategory cnnot be created')
   }

   res.send(subcategory)
})


router.put('/:id', async(req,res)=>{
    const subcategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        {
           name: req.body.name,
           icon: req.body.icon,
           color: req.body.color
        },
        {new:true}  // here i want to get new updated data show in the response
    )

    if(!subcategory){
        return res.status(500).json({success: false, message:'the subcategory can not to updated'})
    }

    res.status(200).send(subcategory)
})

router.delete('/:id', async (req,res)=>{

    SubCategory.findByIdAndDelete(req.params.id).then((subcategory)=>{
        if(subcategory){
            return res.status(200).json({success:true, message:'subcategory has been deleted'})
        }
        else{
            return res.status(404).json({success: false, message:'subcategory not found'})
        }
    }).catch((err)=>{
              return res.status(400).json({success:false, error:err})
    })

})

module.exports = router