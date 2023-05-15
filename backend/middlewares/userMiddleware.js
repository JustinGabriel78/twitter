const User = require('../models/userModels')

const emailAndUsernameExist = () => async(req, res, next) => {

    const {username, email} = req.body
    const usernameExists = await User.findOne({username}) 
    const emailExists = await User.findOne({email})

    if(usernameExists) {
        return res.status(400).json({data: null, message: "Username already exist", sucess: false})
    }
    else if (emailExists){
        return res.status(400).json({data: null, message: "Email already exist", sucess: false})
    }
    return next();
}




module.exports = {
    emailAndUsernameExist,
}