import {useLogout} from "../hooks/useLogout"
import logo from "../assets/twitter_logo-icon.svg"
import { useNavigate} from "react-router-dom";




const Logout = () => {
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/')
        logout()
    }
    
    return(
        <div className="bg-neutral-500 w-full h-screen flex justify-center items-center">
            <div className="w-[350px] h-[390px] bg-white rounded-2xl">
                <div className="flex justify-center items-center mt-16">
                    <img src={ logo } alt="twitter logo" className="w-14 h-14 mx-3 "/>
                </div>

                <div className="flex justify-center items-center flex-col">
                <p className="text-2xl font-medium  mt-5">Log out of Twitter?</p>
                <button className="w-[210px] h-10 bg-black text-white rounded-full mt-20 text-lg" onClick={handleClick}>Log out</button>
                <button className="w-[210px] h-10 border-2 rounded-full mt-8 text-lg" onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </div>
        </div>

    )
}


export default Logout