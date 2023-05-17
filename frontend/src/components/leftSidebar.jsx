import SidebarOption from "./sidebarOption"
import logo from "../assets/twitter_logo-icon.svg"
import blueIcon from "../assets/twitter_blue-icon.png"
import bookmarks from "../assets/twitter_bookmarks-icon.png"
import explore from "../assets/twitter_explore-icon.png"
import home from "../assets/twitter_home-icon.png"
import messages from "../assets/twitter_messages-icon.png"
import more from "../assets/twitter_more-icon.svg"
import notification from "../assets/twitter_notification-icon.svg"
import profile from "../assets/twitter_profile-icon.png"
import verified from "../assets/twitter_verified-icon.svg"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"




const LeftSidebar =() => {
    const sidebarItems = [{icon: home, text:"Home"},{icon:explore, text:"Explore"},{icon:notification,text:"Notifications"},{icon:messages,text:"Messages"},{icon:bookmarks,text:"Bookmarks"},{icon:blueIcon,text:"Twitter Blue"},{icon:verified, text:"Verified Organiza..."},{icon:profile,text: "Profile" },{icon:more,text:"More"}]
    const[userData, setUserData] = useState('');



    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/api/user/getUserData',
            {
                headers: { 
                    'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')),
                }
                
            })
            if (response.data.data) {                
                setUserData(response.data.data)
            }
        } 
        fetchData()  
    },[])

    return(
        <div className="w-72 border-r-1 h-[904px] fixed">
            <div><img src={ logo } alt="twitter logo" className="mt-2 mx-3 w-10 h-10"/></div> 
            
            <div className="">
                {sidebarItems.map( ({icon, text},index) => 
                <SidebarOption icon={icon} text={text} key={ index}/>
                )}
            </div>


            <button className="border rounded-full bg-[#49a3e3] w-56 h-14 mx-3 mt-4 text-white">Tweet</button>
            <div className="hover: text-xl mt-44 w-56 mx-3 h-10 pt-2 pl-5 rounded-full bg-slate-200"><p>{userData}</p></div>
            <Link to={'/logout'}><button className="border rounded-full bg-[#49a3e3] w-56 h-10 mx-3 mt-[10px] text-white ">Log out</button></Link>

        </div>
    )
}

export default LeftSidebar