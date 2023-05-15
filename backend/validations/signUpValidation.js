const yup = require('yup');

const signUpValidation = () => async(req, res, next) => {
    try {
        const body = req.body;

        const signUpSchema = yup.object().shape({
            password: yup.string().required('Password is required'),
            email: yup.string().email('Please enter a valid email').required('Email is required'),
            username: yup.string().required("Username is required"),
            
            
        })

        await signUpSchema.validate(body);
        return next()
    } catch(error) {
        return res.status(400).send({data: null, message: error.message, sucess: false})
    }
}

module.exports = signUpValidation