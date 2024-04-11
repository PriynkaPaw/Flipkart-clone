const onlyAdminAccess = async(req,res,next)=>{

    try {

        if(req.user.role != 1){  // not equal to Admin
            return res.status(400).json({
                success:false,
                msg:"you haven't permission to access this route "
            })

        }
        console.log("req user",req.user)
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:'something went wrong'
        })
    }

     return next()
}

module.exports ={
    onlyAdminAccess
}