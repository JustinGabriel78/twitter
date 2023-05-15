import axios from "axios";
import { useEffect, useState } from "react";

const SearchResult = ({data}) => {
    const {username,_id} = data;
    const [follows, setFollows] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:4000/api/user/getFollowing?_id=${_id}`,
            {
                headers: { 
                    'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                }
                
            })
            if(response.data){
                setFollows(response.data.data) 
            }
        }
        fetchData()
    },[_id])

    const handleClick = async() => {
        try{
            const response = await axios.post(`http://localhost:4000/api/user/setFollowing?_id=${_id}`, {},
            {
                headers: { 
                    'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                }
                
            })
            if(response.data){
                setFollows(response.data.data)     
            }
        } catch(error){
            console.log("error",error.response.data)
        }

        
    }

    return (
        <div className=" mx-5  h-16  flex items-center justify-around hover:bg-slate-200">
            <h1 className="ml-3">{username}</h1>
            {follows?<button className="bg-blue-600 rounded-xl h-7 ml-20 w-20 flex items-center justify-center" onClick={handleClick}>Following</button>:<button className="bg-blue-600 rounded-xl h-7 ml-20 w-20 flex items-center justify-center" onClick={handleClick}>Follow</button>}

        </div>
    )

}
export default SearchResult