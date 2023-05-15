const express = require('express');
const router = express.Router()
const {post, postGet, setComment, getComment, getIndividualPost,setLike, getLike} = require('../controllers/postController')
const requireAuth = require('../middlewares/requireAuth')

router.post('/post',requireAuth(),post)
router.get('/postGet',requireAuth(), postGet)
router.post('/setComment',requireAuth(),setComment)
router.get('/getComment',requireAuth(),getComment)
router.get('/getIndividualPost',requireAuth(),getIndividualPost)
router.post('/setLike',setLike)
router.get('/getLike',getLike)
module.exports = router