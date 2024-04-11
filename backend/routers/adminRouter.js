const Permission = require('../models/permissionModel')
const Role = require('../models/roles')
const express = require('express')
const router = express.Router();
const {onlyAdminAccess} = require('../middlewares/adminMiddleware')

router.post('/add-permission',async(req,res)=>{

    try {
        const {permission_name} = req.body;
     const isExists   =  await Permission.findOne({permission_name})
      
     if(isExists){
         return res.status(400).json({
             success:false,
             msg:'Permission Name already exists '
         })
     }

     var obj ={
         permission_name
     }

     if(req.body.default){
         obj.is_default = parseInt(req.body.default )
     }

     const permission = new Permission(obj);
     const newPermission = await permission.save();

     return res.status(200).json({
         success:true,
         msg:'Permission added successfully !',
         data :newPermission
     })


    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
})


router.get('/fetch-permissions',onlyAdminAccess, async(req,res)=>{
    try {
        const permissions   =  await Permission.find({})

        return res.status(200).json({
            success:true,
            msg:'Permission fetched successfully !',
         data :permissions

        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
})


router.delete('/delete-permission/:id', async(req,res)=>{
    try {

        const {id} = req.params;
        
        await Permission.findByIdAndDelete({_id:id})

        return res.status(200).json({
            success:true,
            msg:'Permission deleted successfully !',

        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
})


router.put('/update-permission/:id',async(req,res)=>{

    try {
        const {permission_name} = req.body;
        const {id} = req.params
     const isExists   =  await Permission.findOne({_id:id})
      
     if(!isExists){
         return res.status(400).json({
             success:false,
             msg:'Permission ID not found '
         })
     }

     const isNameAssigned  =  await Permission.findOne({
         
        _id:{$ne :id},
        permission_name
    
    })
  
    if(isNameAssigned){
        return res.status(400).json({
            success:false,
            msg:'Permission name already assigned to another permission '
        })
    }

     var updatePermission ={
         permission_name
     }

     if(req.body.default != null){
        updatePermission.is_default = parseInt(req.body.default )
     }

    const updatedPermission = await Permission.findByIdAndUpdate({_id:id},{
        $set : updatePermission
    },{new:true})

     return res.status(200).json({
         success:true,
         msg:'Permission added successfully !',
         data :updatedPermission
     })


    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
})



// Route for Rolessss


router.post('/add-role',async(req,res)=>{

    try {
        const {role_name} = req.body;
     const isExists   =  await Permission.findOne({role_name})
      
     if(isExists){
         return res.status(400).json({
             success:false,
             msg:'Role Name already exists '
         })
     }

     var obj ={
         role_name
     }

     if(req.body.default){
         obj.is_default = parseInt(req.body.default )
     }

     const role = new Role(obj);
     const newRole = await role.save();

     return res.status(200).json({
         success:true,
         msg:'Role added successfully !',
         data :newRole
     })


    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
})


// get Roles

router.get('/fetch-roles',onlyAdminAccess, async(req,res)=>{
    try {
        const roles   =  await Role.find({})

        return res.status(200).json({
            success:true,
            msg:'Permission fetched successfully !',
         data :roles

        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
})


// Delete Roles

router.delete('/delete-role/:id', async(req,res)=>{
    try {

        const {id} = req.params;
        
        await Role.findByIdAndDelete({_id:id})

        return res.status(200).json({
            success:true,
            msg:'Role deleted successfully !',

        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
})


module.exports = router