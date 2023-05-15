const yup = require('yup');

const SignInValidation = () => async(req, res, next) => {
    try{
        const body = req.body;

        const signInSchema = yup.object().shape({
            password: yup.string().required('Password is required'),
            email: yup.string().email('Please enter a valid email').required('Email is required')
            
        })

        await signInSchema.validate(body)
        return next()
    } catch (error) {
        return res.status(400).send({data: null, message: error.message, sucess: false})
    }
}

module.exports = SignInValidation