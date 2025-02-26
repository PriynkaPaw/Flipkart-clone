const mongoose = require('mongoose')

const userPermissionSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'

    },
    permissions :[{
        permission_name :String,
        permission_value :[Number]
    }]
})

module.exports = mongoose.model('UserPermission', userPermissionSchema)