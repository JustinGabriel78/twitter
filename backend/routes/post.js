const express = require('express');
const router = express.Router()
const {post, postGet, setComment, getComment, getIndividualPost,setLike, getLike, postUser,deletePost,replyUserId,deleteReply} = require('../controllers/postController')
const requireAuth = require('../middlewares/requireAuth')

router.post('/post',requireAuth(),post)
router.get('/postGet',requireAuth(), postGet)
router.patch('/setComment',requireAuth(),setComment)
router.get('/getComment',requireAuth(),getComment)
router.get('/getIndividualPost',requireAuth(),getIndividualPost)
router.patch('/setLike',requireAuth(),setLike)
router.get('/getLike',requireAuth(),getLike)
router.get('/postUser',requireAuth(),postUser)
router.delete('/deletePost',requireAuth(),deletePost)
router.get('/replyUserId',requireAuth(),replyUserId)
router.delete('/deleteReply',requireAuth(),deleteReply)
module.exports = router