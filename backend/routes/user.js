const express = require('express');
const router = express.Router()
const {signupUser, loginUser,getUser, setFollowing,getFollowing,getUserData} = require('../controllers/userController')
const {emailAndUsernameExist} = require('../middlewares/userMiddleware')
const requireAuth = require('../middlewares/requireAuth')
const signUpValidation= require('../validations/signUpValidation')
const passwordValidation = require('../validations/passwordValidation')
const SignInValidation = require('../validations/signInValidation')

router.post('/signup', signUpValidation(), emailAndUsernameExist(), passwordValidation(), signupUser);
router.post('/login', SignInValidation(),loginUser);
router.get('/getUser',requireAuth(),getUser)
router.post('/setFollowing',requireAuth(),setFollowing)
router.get('/getFollowing',requireAuth(),getFollowing)
router.get('/getUserData',requireAuth(),getUserData)

module.exports = router

