import like from "../assets/twitter_like-icon.svg"
import comment from "../assets/twitter_comment-icon.svg"
import more from "../assets/twitter_delete-icon.svg"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { usePostsContext } from '../hooks/usePostsContext'
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
    const [postUser, setPostUser] = useState('')

    const { dispatch } = usePostsContext()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `http://localhost:4000/api/post/getLike?_id=${_id}`,
                {
                  headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
                  },
                }
              )
            if (response.data.data){
                setLikeCount(response.data.data.likeCount)
            }

        }
        fetchData()
    },[_id,userId])

    const handleLike = async() => {
        try {
            const response = await axios.patch(`http://localhost:4000/api/post/setLike?_id=${_id}`,{},
            {
                headers: {
                  Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
                },
              })
            if(response.data.data){
                setLikeCount(response.data.data.likeCount)
            }
        } catch (error) {
            console.log("error", error.response.data)

        }
    }
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`http://localhost:4000/api/post/postUser?postUserid=${userId}`,
                {
                    headers: { 
                        'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                    }
                    
                })
                if(response.data.data){
                    setPostUser(response.data.data)            }
            } catch (error){
                console.log("error", error.response.data)
            }
        }
        fetchData()
    },[userId])

    const handleClick = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/post/deletePost?_id=${_id}`,
            {
                headers: { 
                    'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                }
                
            })
            if(response.data.data){
                dispatch({type: 'DELETE_POSTS',payload:response.data.data})  
            }  
        } catch (error){
            console.log("error", error.response.data)
        }
    }


    return (
        <div className="border border-r-2">
            <div className="group w-5/6 ml-8" >
                <div className="flex">
                    <Link to={`/comments/${_id}`} >
                        <div className="ml-4 mt-2">
                            <span>{username}</span>
                            <span className="ml-3 text-gray-600" >.   {monthName} {date}</span>
                        </div>
                    </Link>
                    {postUser&&<div className="ml-[300px] mt-2 hidden group-hover:block">
                        <img src={more} alt="more" className="rounded-full hover:bg-slate-300 w-4 h-5"onClick={handleClick}/>
                    </div>}
                </div>
                <Link to={`/comments/${_id}`} >
                    <div className="ml-8 mt-4 text-gray-800">
                        <p>{postContent}</p>
                    </div>
                    <div className="pl-8 mt-4 mb-2"> 
                        {imageUrl&&<img src={`http://localhost:4000/${imageUrl}`} alt="img" className="mt-4 rounded-2xl"/>}
                    </div>
                </Link>
                <div className="flex ml-8">
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