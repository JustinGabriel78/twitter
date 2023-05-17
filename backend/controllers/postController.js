const upload = require('../middlewares/postMiddleware');
const Post = require('../models/postModels')
const User = require('../models/userModels')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');


const post = async(req,res) => {

    upload(req,res,async (error) =>{
        let imageUrl = null;
        let name = "";
        const {postContent} = req.body; 
        // const token = req.headers.authorization;
        // const decoded = jwt.decode(token)
        // const userId =  decoded._id
        const userId = req.userId;
        const likeCount = 0 ;
        const commentCount = 0;
        const comment = [];
        const likes = [];

        if(req.file){
            imageUrl = req.file.path;
            name = req.file.originalname;
        }

        if(error) {
            res.status(400).json({data: null, message: error.message, sucess: false})
        } else {
            const postText = await Post.postCreate(postContent,userId,name,imageUrl,likeCount, commentCount, comment,likes )
            res.status(201).json({data: postText,message: "post created", sucess: true})
        }
    })
}

const postGet = async(req,res) => {
    const userId = req.userId;
    try {
        const post = await Post.find().sort({ createdAt: -1 }).populate("userId");
        const {following} = await User.findById(userId).select("following")
        const resultantPostFiltered = post&&post.map( data => {
            const postData = String(data.userId[0]._id);
            const result = following.find(data => data === postData)
            if(postData === userId || postData === result) {
                return data
            } else {
                return false
            }
        })
        const postDetail = resultantPostFiltered.filter(data => data !== false) 
        res.status(200).json({data: postDetail,message: "post data fetched", sucess: true})
    } catch (error) {
        res.status(400).json({data: null, message: error.message, sucess: false})

    }
}

const setComment = async(req,res) => {
    const userId = req.userId;
    const {newComment} = req.body
    const id = req.query._id
    
    
    try {
        
        const allData = await Post.findById(id)
        const {username} = await User.findById(userId).select('username')
        const commentId = crypto.randomUUID().slice(0,8)
        const {comments} = allData    
        comments.push({commentId,userId,username,newComment})             
        const updatedComments = await Post.findOneAndUpdate({_id:id},{$set: {comments: comments}},{new: true}) 
        const commentCount = updatedComments.comments.length;       
        const updatedCommentCount = await Post.findOneAndUpdate({_id:id},{$set: {commentCount}}, {new: true, sort: {createdAt: -1}}).select('comments')
        console.log("🚀 ~ file: postController.js:75 ~ setComment ~ updatedCommentCount:", updatedCommentCount)
        res.status(201).json({data: updatedCommentCount, message: "Comment added sucessfully", sucess:true})

    } catch(error) {
        res.status(400).json({data: null, message: error.message, sucess: false})
    }
}

const getComment = async(req,res) => {
    const id = req.query._id
    try {
        const allComments = await Post.findById(id).select('comments')
        allComments.comments.reverse() 
        res.status(200).json({data: allComments, message: "Comment fetched sucessfully", sucess:true})
        
    } catch (error) {
        res.status(400).json({data: null, message: error.message, sucess: false})
        
    }
}

const getIndividualPost = async(req,res) => {
    const id = req.query._id

    try {
        const post = await Post.findById(id).populate("userId")
        res.status(200).json({data: post, message: "Post fetched sucessfully", sucess:true})
    } catch (error) {
        res.status(400).json({data: null, message: error.message, sucess: false})
        
    } 
}

const setLike = async(req,res) => {
    const userId = req.userId;
    console.log("🚀 ~ file: postController.js:110 ~ setLike ~ userId:", userId)
    const id = req.query._id
    try {
        const {likes} = await Post.findById(id).select("likes") 
        const isLiked = likes.find(like => like == userId)
        if(isLiked) {
            const likeIndex = likes.indexOf(isLiked)
            likes.splice(likeIndex,1)
            console.log("🚀 ~ file: postController.js:113 ~ setLike ~ likes:", likes)
        } else {
            likes.push(userId)
            console.log("🚀 ~ file: postController.js:113 ~ setLike ~ likes:", likes)
        }

        const updatedLikes =  await Post.findOneAndUpdate({_id:id},{$set: {likes}},{new: true}) 
        const likeCount = updatedLikes.likes.length;       
        const updatedLikeCount = await Post.findOneAndUpdate({_id:id},{$set: {likeCount}}, {new: true}).select("likeCount")
        res.status(201).json({data: updatedLikeCount, message: "Like updated sucessfully", sucess:true})

    } catch (error) {
        res.status(400).json({data: null, message: error.message, sucess: false})
    }
}

const getLike = async (req,res) => {
    const userId = req.userId;
    const id = req.query._id;
    try {
        const likeCount = await Post.findById(id).select("likeCount") 
        res.status(200).json({data: likeCount, message: "Like fetched sucessfully", sucess:true})
    } catch(error) {
        res.status(400).json({data: null, message: error.message, sucess: false})
    }


}

const postUser = async (req,res) => {
    const userId = req.userId;
    const id = req.query.postUserid
    const result = userId === id ? true : false
    res.status(200).json({data: result, message: "check if the post its own sucessfully", sucess:true})

}

const deletePost = async (req,res) => {
    const id = req.query._id;
    try {
        const post = await Post.findOneAndDelete({_id:id})
        res.status(200).json({data:post, message: "post deleted sucessfully", sucess:true})

    }catch(error){
        res.status(400).json({data: null, message: error.message, sucess: false})
    }
}

const replyUserId = async(req,res) => {
    const userId = req.userId;
    const id = req.query.replyUserId
    const result = userId === id ? true : false
    res.status(200).json({data: result, message: "check if the reply its own sucessfully", sucess:true})
}

const deleteReply = async(req,res) => {
    const id = req.query._id;
    const commentId = req.query.commentId;
    try{
        const {comments} = await Post.findById(id).select('comments')
        const updatedComment = comments.filter(comment => comment.commentId !== commentId)  
        updatedComment.reverse()
        const commentLength = updatedComment.length
        const updatedComments = await Post.findOneAndUpdate({_id:id},{$set: {comments: updatedComment,commentCount: commentLength}},{new: true}) 

        res.status(200).json({data:updatedComments, message: "post deleted sucessfully", sucess:true})

    } catch(error){
        res.status(400).json({data: null, message: error.message, sucess: false})

    }
}

module.exports = {
    post,
    postGet,
    setComment,
    getComment,
    getIndividualPost,
    setLike,
    getLike,
    postUser,
    deletePost,
    replyUserId,
    deleteReply
}
