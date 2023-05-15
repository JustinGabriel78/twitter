import Comment from "../components/comment"
import { useEffect, useState } from "react"
import axios from "axios";
import Status from "../components/status";
import { useParams } from "react-router-dom";
import LeftSidebar from "../components/leftSidebar"
import { useReplysContext } from "../hooks/useReplyContext";
import Search from "../components/search"


const AllComments = () => {
    // const [allComments, setAllComments] = useState([]);
    const [individualPost, setIndividualPost] = useState(null)
    const {_id} = useParams()
    const [newComment, setNewComment] = useState("")
    const shouldDisableButton = newComment ? false : true
    
    const {replys, dispatch} = useReplysContext();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/api/post/getComment',{
                params: {_id},
                headers: { 
                    'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                }
            })

            const post = await axios.get('http://localhost:4000/api/post/getIndividualPost',{
                params: {_id},
                headers: { 
                    'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                }
            })
            if(response.data.data) {
                dispatch({type: 'SET_REPLYS', payload: response.data.data.comments})
            }
            setIndividualPost(post.data.data)
        }

        fetchData()
    },[_id,dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()       
        
        try {
            const response = await axios.post(`http://localhost:4000/api/post/setComment?_id=${_id}`,{newComment},{
                headers: { 
                    'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                }
            })
            if(response.data.data){
                console.log("response.data.data: ",response.data.data.comments.slice(-1)[0])
                dispatch({type: 'CREATE_REPLYS', payload: response.data.data.comments.slice(-1)[0]})

            }
        } catch(error){
            console.error("error", error.response.data)
        }
        // await reply(reply)
        setNewComment('');
    }

    return(
        <div className=" flex mx-72">
            <LeftSidebar />
            <div className="w-[594px] ml-[287px] ">
                <div className="w-full">
                    {individualPost &&<Status data={individualPost} commentCount={replys.length}/>}
                </div>
                <div>
                    <div className="">
                        <form onSubmit={handleSubmit} className="h-36 border border-neutral-800 border-1 ">
                            <input className="w-5/6 mt-3 h-14 placeholder-gray-600 outline-none" type="text" placeholder="Tweet your reply!" value={newComment} maxLength={65} onChange ={(e) => setNewComment(e.target.value)} />
                            <button className="border rounded-full bg-[#49a3e3] w-24 h-9 ml-[460px] mt-6 text-white" disabled={shouldDisableButton}>Reply</button>

                        </form>

                    </div>
                    {replys && replys.map((comment) => (
                            <Comment key={comment._id} data={comment} />
                        ))}
                </div>
            </div>
            <Search />
        </div>
    )
}

export default AllComments