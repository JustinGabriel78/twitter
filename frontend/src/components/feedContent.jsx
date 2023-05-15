import like from "../assets/twitter_like-icon.svg"
import comment from "../assets/twitter_comment-icon.svg"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
 
const FeedContent = ({data}) => {
    
    const {postContent, createdAt, imageUrl, _id} = data
    const username = data.userId[0].username;
    const comments = data.commentCount
    const createdAtDate = new Date(createdAt);
    const date = createdAtDate.getDate();
    const monthName = createdAtDate.toLocaleString('default', { month: 'short' });
    const userId = data.userId[0]._id;
    const commentCount = comments ? comments : 0
    const [likeCount, setLikeCount] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:4000/api/post/getLike?_id=${_id}`, {userId})
            if (response.data.data){
                setLikeCount(response.data.data.likeCount)
            }

        }
        fetchData()
    },[_id,userId])

    const handleLike = async() => {
        try {
            const response = await axios.post(`http://localhost:4000/api/post/setLike?_id=${_id}`, {userId})
            if(response.data.data){
                setLikeCount(response.data.data.likeCount)
            }
        } catch (error) {
            console.log("error", error.response.data)

        }
    }

    


    return (
        <div className="border border-r-2">
            <div className=" w-5/6 ml-12 ">
            <Link to={`/comments/${_id}`} >
                <div className="ml-4 mt-2">
                    <span>{username}</span>
                    <span className="ml-3 text-gray-600" >.   {monthName} {date}</span>
                </div>
                <div className="ml-4 mt-4 text-gray-800">
                    <p>{postContent}</p>
                </div>
                <div className="pl-4 mt-4 mb-2"> 
                    {imageUrl&&<img src={`http://localhost:4000/${imageUrl}`} alt="img" className="mt-4 "/>}
                </div>
            </Link>
                <div className="flex ml-4">
                    <Link to={`/comments/${_id}`} >
                        <img src={comment} alt="comment" className="w-4 mt-1"/>
                    </Link>
                    <h6 className="pl-2">{commentCount}</h6>
                    <img src={like} alt="like" className="w-5 ml-2" onClick={handleLike}/>
                    <span className="pl-2">{likeCount}</span>
                </div>
            </div>
        </div>

    )
}

export default FeedContent