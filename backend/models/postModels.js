const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postContent:{
        type: String
    },
    likeCount:{
        type:Number
    },
    commentCount:{
        type:Number
    },
    userId:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    name : {
        type:String,
    },
    imageUrl: {
        type:String,
    },
    comments: {
        type:Array,
    },
    likes: {
        type:Array,
    }
    


}, {timestamps: true})

postSchema.statics.postCreate = async function(postContent, userId, name,imageUrl,likeCount, commentCount, comment) {
    const post = await this.create({postContent,userId, name,imageUrl,likeCount, commentCount, comment})
    const {_id} = post
    const posts = await Post.findById(_id).populate("userId")    
    return posts 
}

const Post = mongoose.model('Post',postSchema);

module.exports = Post;