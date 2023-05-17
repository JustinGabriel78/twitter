import axios from "axios";
import more from "../assets/twitter_delete-icon.svg"
import { useEffect, useState } from "react";
import { useReplysContext } from "../hooks/useReplyContext";

const Comment = ({data,id}) => {
    const {commentId, username, newComment, userId} = data;
    const [replyUser, setReplyUser] = useState('')
    const {dispatch} = useReplysContext()
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`http://localhost:4000/api/post/replyUserId?replyUserId=${userId}`,
                {
                    headers: { 
                        'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                    }
                    
                })
                if(response.data.data){
                    setReplyUser(response.data.data)            }
            } catch (error){
                console.log("error", error.response.data)
            }
        }
        fetchData()
    },[refresh])


    const handleClick = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/post/deleteReply?_id=${id}&commentId=${commentId}`,
            {
                headers: { 
                    'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                }
                
            })
            if(response.data.data){
                setRefresh(!refresh)
                dispatch({type: 'DELETE_REPLYS',payload:response.data.data.comments})  
            }  
        } catch (error){
            console.log("error", error.response.data)
        }
    }
    
    return (
        <div className="group h-20 border border-neutral-800 border-1" >
            <div className="flex" >
                <p className="ml-3 mt-2">{username}</p>
                {replyUser&&<div className="ml-[450px] mt-2 hidden group-hover:block">
                    <img src={more} alt="more" className="rounded-full hover:bg-slate-300 w-4 h-5" onClick={handleClick}/>
                </div>}
            </div>
            <p className="ml-5">{newComment}</p>
        </div>
    )
}

export default Comment