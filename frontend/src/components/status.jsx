import like from "../assets/twitter_like-icon.svg"
import comment from "../assets/twitter_comment-icon.svg"
import { useEffect , useState} from "react"
import axios from "axios" 
const Status = ({data}) => {
    const {postContent, createdAt, imageUrl,_id,commentCount} = data
    const username = data.userId[0].username;
    const createdAtDate = new Date(createdAt);
    const date = createdAtDate.getDate();
    const monthName = createdAtDate.toLocaleString('default', { month: 'short' });
    const [likeCount, setLikeCount] = useState(null);

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
    },[_id])

    
    const handleLike = async() => {
        try {
            const response = await axios.patch(`http://localhost:4000/api/post/setLike?_id=${_id}`, {},
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

    return (
            <div className=" w-full border border-neutral-800 border-1">
                <div className="ml-4 mt-2">
                    <span>{username}</span>
                    <span className="ml-3 text-gray-600" >.   {monthName} {date}</span>
                </div>
                <div className="ml-4 mt-4 text-gray-800">
                    <p>{postContent}</p>
                </div>
                <div className="pl-4 mt-4 mb-2"> 
                    {imageUrl&&<img src={`http://localhost:4000/${imageUrl}`} alt="img" className="mt-4 rounded-2xl"/>}
                </div>
                <div className="flex ml-4">
                    
                    <img src={comment} alt="comment" className="w-4"/>
                    <h6 className="pl-2">{commentCount}</h6>
                    <img src={like} alt="like" className="w-5 ml-2" onClick={handleLike}/>
                    <span className="pl-2">{likeCount}</span>
                </div>
            </div>

    )
}

export default Status