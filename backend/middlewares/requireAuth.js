const jwt = require('jsonwebtoken')
const User = require('../models/userModels')

const requireAuth = () => async (req, res, next) => {

        
    const authorization = req.headers.authorization

    if(!authorization) {
        return res.status(401).json({data: null, message: "Authorization token required", sucess: false})
    }

    const token = authorization.split(' ')[1]
    

    try {
        const {_id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')
        req.userId = _id;
        return next()   
    } catch (error) {
        res.status(401).json({data: null, message: "request is not authorized", sucess: false})
    }
}

module.exports = requireAuth