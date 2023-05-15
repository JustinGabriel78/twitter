var passwordValidator = require('password-validator');  


const passwordCriteria = () => async(req,res,next) => {
    try{
        const password = req.body.password
        const schema = new passwordValidator(); 
        schema
        .is().min(8)                                    // Minimum length 8
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits()                                 // Must have digits
    
        const isValidated = schema.validate(password)
    
        if(!isValidated) {
            return res.status(400).send({data: null, message: "Password should contain at least one lower case letter, one upper case letter and one numeric digit", sucess: false})
         }
         return next()
    } catch(error) {
        res.status(500).send({data: null, message: error.message, sucess: false})

    }

}

module.exports = passwordCriteria