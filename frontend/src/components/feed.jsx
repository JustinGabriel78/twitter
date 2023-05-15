import axios from "axios";
import { useState, useEffect,  useRef } from "react";
import FeedContent from "./feedContent";
import { usePostsContext } from "../hooks/usePostsContext";



const Feed = () => {
    const [postContent, setPostContent] = useState('');
    const [image, setImage] = useState('')
    const inputRef = useRef(null);

    const {posts, dispatch} = usePostsContext()



    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/api/post/postGet',
            {
                headers: { 
                    'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                }
                
            })
            if (response.data) {
                dispatch({type: 'SET_POSTS', payload:response.data.data })
            }

        }

        fetchData()
    },[dispatch])


    const postContentCondition = postContent ? false: true;
    const imageCondition = image? false: true;
    const shouldDisableButton = postContentCondition && imageCondition

    

    const handleSubmit = async (e) => {

        e.preventDefault()
        const formData = new FormData();
        formData.append("postContent", postContent)
        formData.append("image", image)
        console.log("🚀 ~ file: feed.jsx:45 ~ handleSubmit ~ formData:", formData)
        
        try {
            const response = await axios.post('http://localhost:4000/api/post/post', formData, 
            {
                headers: { 
                    'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                }
                
            })
            console.log("response.data: ",response.data)
            if(response.data.data) {
                dispatch({type: 'CREATE_POSTS', payload: response.data.data })
            }
        } catch(error){
            console.error("error",error.response.data)
        }
        setPostContent('');
        setImage('');
        console.log("inputRef.current.value: ",inputRef.current.value)
        inputRef.current.value = ''

    }


    
    return(
        <div className=" w-[594px] border border-r-2 ml-[286px]">
            <div className="">
                <h1 className="text-xl font-medium  p-4">Home</h1>
                <div className="flex row h-[53px] mt-[-8px] border-b-2">
                    <div className="w-1/2 flex justify-center items-center  hover:bg-slate-600 ">
                        <h1>For you</h1>
                    </div>
                    <div className="w-1/2 flex justify-center items-center hover:bg-slate-600 ">
                        <h1>Following</h1>
                    </div>
                </div>
                <div >
                    <form onSubmit={handleSubmit} className="h-36 border-b-2 ">
                        <input className="w-5/6 ml-9 mt-3 h-14 placeholder-gray-600 outline-none" type="text" placeholder="What's happening?" value={postContent} maxLength={65} onChange ={(e) => setPostContent(e.target.value)} />
                        <input className="ml-10 " ref={inputRef} onChange={(e) => setImage(e.target.files[0]) } type="file"/>
                        <button className="border rounded-full bg-[#49a3e3] w-32 h-9 mx-3 mt-8 text-white" disabled={shouldDisableButton}>Tweet</button>

                    </form>

                </div>

                <div>
                    {posts && posts.map((feed) => (
                      
                        <FeedContent key={feed._id} data={feed}/>
                    ))}
                </div>



                
            </div>
        </div>
    )
}

export default Feed