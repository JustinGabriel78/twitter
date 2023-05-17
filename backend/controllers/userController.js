const User = require('../models/userModels')
const jwt = require('jsonwebtoken')

const createToken = (_id, username) => {
    return jwt.sign({_id, username}, process.env.SECRET, {expiresIn: '24h'})}


const signupUser = async(req,res) => {
    const {username, email, password} = req.body;
    const following = [];

    try{
        const newUser = await User.signup(username, email, password, following)
        
        // create a token
        const token = createToken(newUser._id )


        res.status(201).json({data: newUser, token, message: "SignUp sucessfully", sucess: true})

    } catch(error) {
        res.status(400).json({data: null, message: error.message, sucess: false})
    }
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password)
        //create a token
        const token = createToken(user._id)
        res.status(201).json({data: user, token, message: "Login sucessfully", sucess: true})

    } catch(error) {
        res.status(400).json({data: null, message: error.message, sucess: false})
    }
}

const getUser = async(req,res) => {
    const userId = req.userId
    try {
        const details = await User.find().select("username")
        const userDetails = details.filter(detail => String(detail._id) !== userId)
        res.status(201).json({data: userDetails, message: "user data fetched", sucess: true})
    } catch (error) {
        res.status(400).json({data: null, message: error.message, sucess: false})

    }
}

const setFollowing = async(req,res) => {
    const userId = req.userId;
    const followingId = req.query._id;
    try{
        const {following} = await User.findById(userId).select("following");
        const isFollowing = following.find(follows => follows === followingId);
        let follows
        if(isFollowing){
            const followingIndex = following.indexOf(isFollowing)
            following.splice(followingIndex,1)
            follows = false
        }else {
            following.push(followingId)
            follows = true
        }

        await User.findOneAndUpdate({_id:userId},{$set: {following}}, {new: true});
        res.status(201).json({data: follows, message: "following added sucessfully", sucess: true})
    } catch(error) {
        res.status(400).json({data: null, message: error.message, sucess: false})
    }
}

const getFollowing = async(req,res) => {
    const userId = req.userId;
    const followingId = req.query._id;
    try{
        const {following} = await User.findById(userId).select("following");
        const isFollowing = following.find(follows => follows === followingId);
        const follows = isFollowing ? true : false
        res.status(201).json({data: follows, message: "following data fetched", sucess: true})
    } catch(error){
        res.status(400).json({data: null, message: error.message, sucess: false})
    }
}

const getUserData = async(req,res) => {
    const userId = req.userId
    try {
        const details = await User.findById(userId)
        const {username} = await User.findById(userId)
        res.status(201).json({data: username, message: "user data fetched", sucess: true})
    } catch (error) {
        res.status(400).json({data: null, message: error.message, sucess: false})

    }
}





module.exports = {
    signupUser,
    loginUser,
    getUser,
    setFollowing,
    getFollowing,
    getUserData
}